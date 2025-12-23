
import { Student } from "./classes.js";

let exams=[];
if(localStorage.getItem("exams")){
    exams=JSON.parse(localStorage.getItem("exams"));
}


let students=[];
if(localStorage.getItem("students")){
    students=JSON.parse(localStorage.getItem("students"));
}


let searchInput=document.getElementById("searchInput");
let examFilterInput=document.getElementById("examFilterInput");
let examFilter=document.getElementById("examFilter");
let assignExamBtn=document.getElementById("assignExamBtn");
// ==================== INITIALIZATION ====================
if (examFilter) {
    examFilter.innerHTML = exams.map(exam => `<option value="${exam.id}">${exam.name}</option>`).join("");
}

function displayStudents(students){
    const tableBody=document.querySelector("#tableBody");
    if(students.length==0){
        tableBody.innerHTML="<tr><td colspan='6' class='text-center py-4'>No students found</td></tr>";
        return;
    }
    let box='';
    students.forEach(student => {
        student=Student.fromJSON(student);
     box+=`
        <tr class="hover:bg-primary/5 dark:hover:bg-primary/5 transition-colors group accent-surface-light dark:accent-surface-dark">
        <td class="px-6 py-4">
        <input type="checkbox" id="studentCheckbox-${student.id}" value="${student.id}" class="checkbox checkbox-primary">
    </td>
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-3">
                                                    <img class="size-10 rounded-full bg-cover bg-center border border-border-light dark:border-border-dark"
                                                        data-alt="Portrait of student Alice Johnson"
                                                    src="${"../"+student.profilePicture || '../assets/image/avatar.webp'}">
                                                
                                                    <div>
                                                        <span
                                                            class="font-bold text-text-main-light dark:text-text-main-dark">${student.username}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 text-text-sec-light dark:text-text-sec-dark font-medium">
                                                ${student.id}</td>
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-2">
                                                    <div
                                                        class="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
                                                        <div class="${student.getAverageScore() < 50 ? 'bg-red-500' : 'bg-primary'} h-1.5 rounded-full" style="width: ${student.getAverageScore()}%"></div>
                                                    </div>
                                                    <span class="font-bold">${student.getAverageScore()}%</span>
                                                </div>
                                            </td>
                                            <td class="px-6 py-4 text-text-main-light dark:text-text-main-dark">${student.completedExams[student.completedExams.length-1]?.name||"no exam"}</td>
                                            <td class="px-6 py-4 text-text-sec-light dark:text-text-sec-dark font-medium">
                                                ${student.completedExams[student.completedExams.length-1]?.date.slice(0, 10)||"no date"}</td>
                                            <td class="px-6 py-4 text-right">
                                                <div class="flex items-center justify-end gap-2">

                                                    <button onclick="viewAnswers(${student.id})"
                                                        class="bg-primary hover:bg-[#1fe060] text-[#0d1b12] text-xs font-bold px-4 py-2 rounded-full transition-colors shadow-sm">
                                                        view Answers
                                                    </button>

                                                </div>
                                            </td>
                                        </tr>
     `   
    })
    tableBody.innerHTML=box;
}

function assignExam(){
    let selectedExam=examFilter.value;
    let selectedStudents=[];
    document.querySelectorAll("input[type=checkbox]:checked").forEach(checkbox=>{
        selectedStudents.push(checkbox.value);
    })
    console.log(selectedExam,selectedStudents);
    students = students.map(student=>{
      student=Student.fromJSON(student);
        if(selectedStudents.some(id=>id==student.id)){
            if(student.completedExams.some(e=>{
              console.log(e.examId,selectedExam);
              return e.examId==selectedExam
            })){
                alert("exam already assigned to this student");
                return student;
            }
            student.assignExam(selectedExam);
        }
        return student;
    })
    updateStudentData();
    
    
}

function updateStudentData(){
  localStorage.setItem("students",JSON.stringify(students));
}

assignExamBtn?.addEventListener("click",assignExam);
displayStudents(students);

// ---------------------- Answers modal wiring
const studentAnswersModal = document.getElementById("studentAnswersModal");
const studentAnswersOverlay = document.getElementById("studentAnswersOverlay");
const closeStudentAnswersBtn = document.getElementById("closeStudentAnswersBtn");
const closeStudentAnswersFooterBtn = document.getElementById("closeStudentAnswersFooterBtn");
const studentAnswersTitle = document.getElementById("studentAnswersTitle");
const studentAnswersSubTitle = document.getElementById("studentAnswersSubTitle");
const studentExamsList = document.getElementById("studentExamsList");
const examAnswersContainer = document.getElementById("examAnswersContainer");

function openStudentAnswersModal() {
  studentAnswersModal?.classList.remove("hidden");
}

function closeStudentAnswersModal() {
  studentAnswersModal?.classList.add("hidden");
  if (studentExamsList) studentExamsList.innerHTML = "";
  if (examAnswersContainer) examAnswersContainer.innerHTML = "";
}

closeStudentAnswersBtn?.addEventListener("click", closeStudentAnswersModal);
closeStudentAnswersFooterBtn?.addEventListener("click", closeStudentAnswersModal);
studentAnswersOverlay?.addEventListener("click", closeStudentAnswersModal);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && studentAnswersModal && !studentAnswersModal.classList.contains("hidden")) {
    closeStudentAnswersModal();
  }
});

function getExamsStore() {
  return JSON.parse(localStorage.getItem("Exams"))
    || JSON.parse(localStorage.getItem("exams"))
    || [];
}

function getQuestionsStore() {
  return JSON.parse(localStorage.getItem("questions")) || [];
}

function getAnswersHistory() {
  // [{studentId, examId, answers, submittedAt}]
  return JSON.parse(localStorage.getItem("answers")) || [];
}

function renderExamAnswers(studentId, examId, examsStore, questionsStore, answersHistory) {
  if (!examAnswersContainer) return;

  const exam = examsStore.find(e => String(e.id) === String(examId));
  const attempt = [...answersHistory]
    .filter(r => String(r.studentId) === String(studentId) && String(r.examId) === String(examId))
    .sort((a, b) => String(b.submittedAt || "").localeCompare(String(a.submittedAt || "")))[0];

  let questionIds = [];
  if (exam?.questions && Array.isArray(exam.questions)) {
    if (typeof exam.questions[0] === "object") {
      questionIds = exam.questions.map(q => q.id);
    } else {
      questionIds = exam.questions;
    }
  }

  const examQuestions = questionsStore.filter(q => questionIds.includes(q.id));
  const answers = attempt?.answers || [];

  if (!exam || examQuestions.length === 0) {
    examAnswersContainer.innerHTML = `
      <div class="p-4 rounded-xl border border-border-light dark:border-border-dark">
        <div class="text-sm text-text-sec-light dark:text-text-sec-dark">No questions found for this exam.</div>
      </div>
    `;
    return;
  }

  if (!attempt) {
    examAnswersContainer.innerHTML = `
      <div class="p-4 rounded-xl border border-border-light dark:border-border-dark">
        <div class="font-bold mb-1">${exam?.name || "Exam"}</div>
        <div class="text-sm text-text-sec-light dark:text-text-sec-dark">No saved answers for this exam.</div>
      </div>
    `;
    return;
  }

  examAnswersContainer.innerHTML = examQuestions.map((q, idx) => {
    const ans = answers.find(a => String(a.questionId) === String(q.id));
    const selected = ans?.selectedAnswer ?? "-";
    const correct = q.correctAnswer ?? "-";
    const isCorrect = ans?.isCorrect === true;

    return `
      <div class="p-4 mb-3 rounded-xl border border-border-light dark:border-border-dark">
        <div class="font-bold mb-2">${idx + 1}) ${q.text}</div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="p-3 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
            <div class="text-xs text-text-sec-light dark:text-text-sec-dark mb-1">Student Answer</div>
            <div class="font-bold ${isCorrect ? "text-green-600" : "text-red-500"}">${selected}</div>
          </div>

          <div class="p-3 rounded-lg bg-background-light dark:bg-background-dark border border-border-light dark:border-border-dark">
            <div class="text-xs text-text-sec-light dark:text-text-sec-dark mb-1">Correct Answer</div>
            <div class="font-bold">${correct}</div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}


function viewAnswers(id) {
  const student = students.find(s => String(s.id) === String(id));
  if (!student) return;

  const examsStore = getExamsStore();
  const questionsStore = getQuestionsStore();
  const answersHistory = getAnswersHistory();

  studentAnswersTitle.textContent = `Completed Exams: ${student.username}`;
  studentAnswersSubTitle.textContent = `Student ID: ${student.id}`;

  const completed = student.completedExams || [];
  if (completed.length === 0) {
    studentExamsList.innerHTML = `<div class="text-sm text-text-sec-light dark:text-text-sec-dark">No completed exams.</div>`;
    examAnswersContainer.innerHTML = "";
    openStudentAnswersModal();
    return;
  }

  // Render exams list (latest first)
  const completedSorted = [...completed].reverse();

  studentExamsList.innerHTML = completedSorted.map((ex, i) => {
    const dateStr = ex.date ? String(ex.date).slice(0, 10) : "";
    return `
      <button
        class="text-left p-3 rounded-xl border border-border-light dark:border-border-dark hover:bg-background-light dark:hover:bg-background-dark transition-colors"
        data-exam-id="${ex.examId}">
        <div class="font-bold text-text-main-light dark:text-white">${ex.name || "Exam"}</div>
        <div class="text-xs text-text-sec-light dark:text-text-sec-dark">${dateStr} • Score: ${ex.score ?? "-"}</div>
      </button>
    `;
  }).join("");

  // Click handler (event delegation)
  studentExamsList.onclick = (e) => {
    const btn = e.target.closest("button[data-exam-id]");
    if (!btn) return;
    renderExamAnswers(student.id, btn.dataset.examId, examsStore, questionsStore, answersHistory);
  };

  openStudentAnswersModal();

  // Auto-open first one
  const firstExamId = completedSorted[0].examId;
  renderExamAnswers(student.id, firstExamId, examsStore, questionsStore, answersHistory);
}
window.viewAnswers = viewAnswers;

function searchStudents(){
    let searchInput=document.getElementById("searchInput").value;
    let filteredStudents=students.filter(student=>student.id==searchInput||student.username.toLowerCase().includes(searchInput.toLowerCase()));
    displayStudents(filteredStudents);
}

searchInput.addEventListener("input",searchStudents);

