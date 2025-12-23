let questions = [];
let exams=[];
// MODAL 
const editQuestionModal = document.getElementById("editQuestionModal");
const editQuestionOverlay = document.getElementById("editQuestionOverlay");
const closeEditModalBtn = document.getElementById("closeEditModalBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const saveEditBtn = document.getElementById("saveEditBtn");

const editQuestionId = document.getElementById("editQuestionId");
const editQuestionText = document.getElementById("editQuestionText");
const editDifficulty = document.getElementById("editDifficulty");
const editImage = document.getElementById("editImage");

const editAnswer1 = document.getElementById("editAnswer1");
const editAnswer2 = document.getElementById("editAnswer2");
const editAnswer3 = document.getElementById("editAnswer3");
const editAnswer4 = document.getElementById("editAnswer4");

const editModalError = document.getElementById("editModalError");

function loadQuestions() {
 if (localStorage.getItem("questions")) {
    questions = JSON.parse(localStorage.getItem("questions"));
 }   
}
function loadExams(){
 if (localStorage.getItem("exams")) {
    exams = JSON.parse(localStorage.getItem("exams"));
 }   
}
loadExams();
loadQuestions();

let questionTableBody = document.getElementById("question-table-body");
let totalQuestions=document.getElementById("totalQuestions");
let searchInput=document.getElementById("searchInput");
let difficultyFilter=document.getElementById("difficultyFilter");
function displayQuestions(arr){
    let box=``;
    totalQuestions.textContent=questions.length;
    if(arr.length==0){
        box=`<tr><td colspan="4" class="p-4 text-center">No questions found</td></tr>`;
    }
    arr.forEach((question,index)=>{
      box+=`
       <tr
                                        class="group hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors">
                                       
                                        <td class="p-4">
                                            <p class="font-medium text-text-main dark:text-gray-200 line-clamp-1">${question.text}</p>
                                        </td>
                                       
                                        <td class="p-4">
                                            <span
                                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${question.difficulty.toLowerCase() == "easy" ? "text-green-800 dark:bg-green-900/30 dark:text-green-300 " : question.difficulty.toLowerCase() == "medium" ? "text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 " : "text-red-800 dark:bg-red-900/30 dark:text-red-300 "}">
                                                ${question.difficulty}
                                            </span>
                                        </td>
                                        
                                        <td class="p-4 text-right">
                                            <div class="flex items-center justify-end gap-2">
                                                <button onclick="editQuestion('${question.id}')"
                                                    class="p-2 rounded-lg text-text-muted hover:bg-primary/20 hover:text-green-700 transition-colors"
                                                    title="Edit">
                                                    <span class="material-symbols-outlined text-[20px]">edit</span>
                                                </button>
                                                <button onclick="deleteQuestion('${question.id}')"
                                                    class="p-2 rounded-lg text-text-muted hover:bg-red-100 hover:text-red-600 transition-colors"
                                                    title="Delete">
                                                    <span class="material-symbols-outlined text-[20px]">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
      `  
    })
    questionTableBody.innerHTML=box;
}

displayQuestions(questions);


function editQuestion(id) {
  const q = questions.find(question => String(question.id) === String(id));
  if (!q) return;

  editQuestionId.value = q.id;
  editQuestionText.value = q.text || "";
  editDifficulty.value = q.difficulty || "Easy";
  editImage.value = q.image || "";

  editAnswer1.value = q.choices?.[0] || "";
  editAnswer2.value = q.choices?.[1] || "";
  editAnswer3.value = q.choices?.[2] || "";
  editAnswer4.value = q.choices?.[3] || "";

  // select correct answer by matching text, fallback to none
  const correctIndex = q.choices .findIndex(c => c === q.correctAnswer);
  document.querySelectorAll("input[name='edit_correct_answer']").forEach( (r ,i) => i==correctIndex ? r.checked = true : r.checked = false);
  if (correctIndex >= 0) {
    const radio = document.querySelector(`input[name='edit_correct_answer'][value='${correctIndex}']`);
    if (radio) radio.checked = true;
  }

  openEditModal();
}

function deleteQuestion(id){
    questions=questions.filter((question,index)=>{
        return question.id!=id
    })
if(exams.length>0){
    exams=exams.map((exam,index)=>{
        exam.questions=exam.questions.filter((question,index)=>{
          return question!=id
      })
    
    return exam
    })
  localStorage.setItem("exams",JSON.stringify(exams));
  }
    localStorage.setItem("questions",JSON.stringify(questions));
    
    displayQuestions(questions);
}
function filterQuestion(){
    let filteredQuestions=questions.filter((question,index)=>{
        return question.difficulty.toLowerCase().includes(difficultyFilter.value.toLowerCase())
    })
    displayQuestions(filteredQuestions);
}
difficultyFilter.addEventListener("change",()=>{
    filterQuestion()
})
function searchQuestion(searchTerm){
    let filteredQuestions=questions.filter((question,index)=>{
        return question.text.toLowerCase().includes(searchTerm.toLowerCase())
    })
    displayQuestions(filteredQuestions);
}

searchInput.addEventListener("input",()=>{
    searchQuestion(searchInput.value);
})

function openEditModal() {
  editQuestionModal.classList.remove("hidden");
}

function closeEditModal() {
  editQuestionModal.classList.add("hidden");
  editModalError.textContent = "";
}

function getSelectedCorrectIndex() {
  const selected = document.querySelector("input[name='edit_correct_answer']:checked");
  return selected ? Number(selected.value) : null;
}

closeEditModalBtn?.addEventListener("click", closeEditModal);
cancelEditBtn?.addEventListener("click", closeEditModal);
editQuestionOverlay?.addEventListener("click", closeEditModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !editQuestionModal.classList.contains("hidden")) {
    closeEditModal();
  }
});

saveEditBtn?.addEventListener("click", () => {
  editModalError.textContent = "";

  const id = editQuestionId.value;
  const idx = questions.findIndex(q => String(q.id) === String(id));
  if (idx === -1) return;

  const text = editQuestionText.value.trim();
  const difficulty = editDifficulty.value;
  const image = editImage.value.trim();

  const choices = [
    editAnswer1.value.trim(),
    editAnswer2.value.trim(),
    editAnswer3.value.trim(),
    editAnswer4.value.trim(),
  ];

  const correctIndex = getSelectedCorrectIndex();

  if (!text) {
    editModalError.textContent = "Question text is required.";
    return;
  }
  if (choices.some(c => !c)) {
    editModalError.textContent = "All 4 choices are required.";
    return;
  }
  if (correctIndex === null) {
    editModalError.textContent = "Please select the correct answer.";
    return;
  }

  const updated = {
    ...questions[idx],
    text,
    difficulty,
    image,
    choices,
    correctAnswer: choices[correctIndex],
  };

  questions[idx] = updated;
  localStorage.setItem("questions", JSON.stringify(questions));

  // Re-render respecting current search/filter state
  const searchTerm = searchInput.value.trim();
  const diffValue = difficultyFilter.value;

  let view = questions;
  if (diffValue && diffValue !== "All Difficulties") {
    view = view.filter(q => String(q.difficulty).toLowerCase() === String(diffValue).toLowerCase());
  }
  if (searchTerm) {
    view = view.filter(q => String(q.text).toLowerCase().includes(searchTerm.toLowerCase()));
  }

  displayQuestions(view);
  closeEditModal();
});