let exams = [];
let questions=[];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
const editModalError = document.getElementById("editModalError");

function loadExams() {
  if (localStorage.getItem("exams")) {
    exams = JSON.parse(localStorage.getItem("exams")).filter(e=>e.teacherId==currentUser.id);
  }   
}
function loadQuestions(){
  if(localStorage.getItem("questions")){
    questions=JSON.parse(localStorage.getItem("questions"));
  }
}
loadExams();
loadQuestions();

let examTableBody = document.getElementById("exam-table-body") || document.getElementById("question-table-body");
let totalExams = document.getElementById("totalExams") || document.getElementById("totalQuestions");
let searchInput = document.getElementById("searchInput");
let courseFilter = document.getElementById("courseFilter") || document.getElementById("difficultyFilter");

function displayExams(arr) {
  let box = ``;
  if (totalExams) totalExams.textContent = exams.length;

  if (!examTableBody) return;
  
  if (arr.length == 0) {
    box = `<tr><td colspan="5" class="p-4 text-center">No exams found</td></tr>`;
  }
  
  arr.forEach((exam) => {
    box += `
      <tr class="group hover:bg-background-light dark:hover:bg-gray-800/50 transition-colors">
        <td class="p-4">
          <p class="font-medium text-text-main dark:text-gray-200 line-clamp-1">${exam.name}</p>
        </td>
        <td class="p-4">
          <span class="text-text-muted dark:text-gray-400">${exam.course}</span>
        </td>
        <td class="p-4">
          <span class="text-text-muted dark:text-gray-400">${exam.duration} min</span>
        </td>
        <td class="p-4">
          <span class="text-text-muted dark:text-gray-400">${exam.questionsNum} questions</span>
        </td>
        <td class="p-4 text-right">
          <div class="flex items-center justify-end gap-2">
            <button onclick="editExam('${exam.id}')"
              class="p-2 rounded-lg text-text-muted hover:bg-primary/20 hover:text-green-700 transition-colors"
              title="Edit">
              <span class="material-symbols-outlined text-[20px]">edit</span>
            </button>
            <button onclick="deleteExam('${exam.id}')"
              class="p-2 rounded-lg text-text-muted hover:bg-red-100 hover:text-red-600 transition-colors"
              title="Delete">
              <span class="material-symbols-outlined text-[20px]">delete</span>
            </button>
          </div>
        </td>
      </tr>
    `;  
  });
  
  examTableBody.innerHTML = box;
}

displayExams(exams);

function editExam(id) {
  const exam = exams.find(e => String(e.id) === String(id));
  if (!exam) return;

  document.getElementById("editExamId").value = exam.id;
  document.getElementById("editExamName").value = exam.name || "";
  document.getElementById("editDuration").value = exam.duration || "";
  document.getElementById("editCourse").value = exam.course || "";
  document.getElementById("editQuestionsNum").value = exam.questionsNum || "";

  openEditModal();
}

function deleteExam(id) {
  // Find the exam to be deleted
  const examToDelete = exams.find(exam => exam.id === id);
  
  if (examToDelete) {
    // Remove questions that belong to this exam
    questions = questions.filter(question => 
      !examToDelete.questions.includes(question.id)
    );
  }
  
  // Remove the exam
  exams = exams.filter(exam => exam.id !== id);

  localStorage.setItem("exams", JSON.stringify(exams));
  localStorage.setItem("questions", JSON.stringify(questions));
  displayExams(exams);
}

function filterExam() {
  let filteredExams = exams.filter((exam) => {
    if (!courseFilter || !courseFilter.value || courseFilter.value === "All Courses" || courseFilter.value === "All Difficulties") {
      return true;
    }
    return String(exam.course || "").toLowerCase().includes(String(courseFilter.value).toLowerCase());
  });
  displayExams(filteredExams);
}

courseFilter?.addEventListener("change", () => {
  filterExam();
});

function searchExam(searchTerm) {
  let filteredExams = exams.filter((exam) => {
    return exam.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  displayExams(filteredExams);
}

searchInput?.addEventListener("input", () => {
  searchExam(searchInput.value);
});

function openEditModal() {
  document.getElementById("editExamModal").classList.remove("hidden");
}

function closeEditModal() {
  document.getElementById("editExamModal").classList.add("hidden");
  editModalError.textContent = "";
}

document.getElementById("closeEditModalBtn")?.addEventListener("click", closeEditModal);
document.getElementById("cancelEditBtn")?.addEventListener("click", closeEditModal);
document.getElementById("editExamOverlay")?.addEventListener("click", closeEditModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && !document.getElementById("editExamModal").classList.contains("hidden")) {
    closeEditModal();
  }
});

document.getElementById("saveEditBtn")?.addEventListener("click", () => {
  editModalError.textContent = "";

  const id = document.getElementById("editExamId").value;
  const idx = exams.findIndex(e => String(e.id) === String(id));
  if (idx === -1) return;

  const name = document.getElementById("editExamName").value.trim();
  const duration = document.getElementById("editDuration").value.trim();
  const course = document.getElementById("editCourse").value.trim();
  const questionsNum = document.getElementById("editQuestionsNum").value.trim();

  if (!name) {
    editModalError.textContent = "Exam name is required.";
    return;
  }
  if (!duration || isNaN(duration)) {
    editModalError.textContent = "Valid duration is required.";
    return;
  }
  if (!course) {
    editModalError.textContent = "Course is required.";
    return;
  }
  if (!questionsNum || isNaN(questionsNum)) {
    editModalError.textContent = "Valid number of questions is required.";
    return;
  }

  const updated = {
    ...exams[idx],
    name,
    duration: Number(duration),
    course,
    questionsNum: Number(questionsNum),
  };

  exams[idx] = updated;
  localStorage.setItem("exams", JSON.stringify(exams));

  // Re-render respecting current search/filter state
  const searchTerm = searchInput.value.trim();
  const courseValue = courseFilter?.value;

  let view = exams;
  if (courseValue && courseValue !== "All Courses") {
    view = view.filter(e => String(e.course).toLowerCase() === String(courseValue).toLowerCase());
  }
  if (searchTerm) {
    view = view.filter(e => String(e.name).toLowerCase().includes(searchTerm.toLowerCase()));
  }

  displayExams(view);
  closeEditModal();
});