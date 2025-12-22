import { Student, Answer } from "./classes.js";
//------------header element 
const studentName =document.querySelector(".studentName");
const studentImage =document.querySelector(".studentImage");

//------------- card element 
const nameIncard =document.querySelector(".nameIncard");
const examName = document.querySelector(".examName");
const progressCircle =document.querySelector(".progressCircle");
const progressPercntEle=document.querySelector(".progressPercnt");
const timeTaken = document.querySelector(".timeTaken");
const correctAnswersEle =document.querySelector(".correctAnswers");
const reviewAnswers =document.querySelector(".reviewAnswers");

//------------- review answers modal
const reviewAnswersModal = document.getElementById("reviewAnswersModal");
const reviewAnswersOverlay = document.getElementById("reviewAnswersOverlay");
const closeReviewAnswersBtn = document.getElementById("closeReviewAnswersBtn");
const closeReviewAnswersFooterBtn = document.getElementById("closeReviewAnswersFooterBtn");
const reviewAnswersTitle = document.getElementById("reviewAnswersTitle");
const reviewAnswersSubTitle = document.getElementById("reviewAnswersSubTitle");
const completedExamsList = document.getElementById("completedExamsList");
const examAnswersContainer = document.getElementById("examAnswersContainer");

//----------- next exam card
const nextExamCard = document.querySelector(".nextExamCard");
const nextExamImage = document.querySelector(".nextExamImage");
const nextExamName = document.querySelector(".nextExamName");
const nextExamNumberQuestion = document.querySelector(".nextExamNumberQuestion");
const nextExamBtn=document.querySelector(".nextExamBtn");


let student = JSON.parse(localStorage.getItem("currentUser"))||null;
let studentAnswers =JSON.parse(localStorage.getItem("studentAnswers"))||[];
let selectedExamId =localStorage.getItem("selectedExamId");
let examData =student.completedExams.find(e=>e.examId==selectedExamId);
console.log(examData);


const correctAnswers = studentAnswers.filter(e=> e.isCorrect==true).length;
const allAnswers = studentAnswers.length;
const progressPercent  = (correctAnswers/allAnswers)*100;
const nextExamId = student.assignedExams[0]||0;

//-------------------print the data

studentName.textContent=student.username;
nameIncard.textContent = student.username;
studentImage.style.src=student.profilePicture;
examName.textContent=examData.name;
timeTaken.textContent=examData.timeOfFinshed;
correctAnswersEle.textContent=`${correctAnswers} / ${allAnswers}`
setProgress(progressPercent);
progressPercntEle.textContent=`${progressPercent}%`
if (nextExamId!=0) 
{
    
    nextExamCard.classList.remove("hidden");
}   

//----------------------
nextExamBtn.addEventListener("click",function(){
    // localStorage.setItem("selectedExamId",nextExamId)
    window.location.href="./quiz.html";
})

function getExamsStore() {
  return JSON.parse(localStorage.getItem("Exams"))
    || JSON.parse(localStorage.getItem("exams"))
    || [];
}

function getQuestionsStore() {
  return JSON.parse(localStorage.getItem("questions")) || [];
}

function getAnswersHistoryStore() {
  // Teacher/analytics friendly history: [{studentId, examId, answers, submittedAt}]
  return JSON.parse(localStorage.getItem("answers")) || [];
}

function openReviewAnswersModal() {
  reviewAnswersModal?.classList.remove("hidden");
}

function closeReviewAnswersModal() {
  reviewAnswersModal?.classList.add("hidden");
}

function getExamQuestionIds(exam) {
  if (!exam || !Array.isArray(exam.questions)) return [];
  if (exam.questions.length === 0) return [];

  if (typeof exam.questions[0] === "object" && exam.questions[0] !== null) {
    return exam.questions.map(q => q.id);
  }

  return exam.questions;
}

function findAttemptAnswers(studentId, examId) {
  const history = getAnswersHistoryStore();
  const attempts = history
    .filter(r => String(r.studentId) === String(studentId) && String(r.examId) === String(examId))
    .sort((a, b) => String(b.submittedAt || "").localeCompare(String(a.submittedAt || "")));

  if (attempts.length > 0) return attempts[0].answers || [];

  // Fallback: current result page answers (usually for selectedExamId only)
  if (String(examId) === String(selectedExamId)) {
    return Array.isArray(studentAnswers) ? studentAnswers : [];
  }

  return [];
}

function renderExamAnswers(examId) {
  const examsStore = getExamsStore();
  const questionsStore = getQuestionsStore();
  const exam = examsStore.find(e => String(e.id) === String(examId));

  const questionIds = getExamQuestionIds(exam);
  const examQuestions = questionsStore.filter(q => questionIds.includes(q.id));
  const answersForExam = findAttemptAnswers(student?.id, examId);

  const examNameText = exam?.name || student?.completedExams?.find(e => String(e.examId) === String(examId))?.name || "Exam";
  reviewAnswersTitle.textContent = `Review Answers: ${examNameText}`;

  if (!exam || examQuestions.length === 0) {
    examAnswersContainer.innerHTML = `
      <div class="p-4 rounded-xl border border-gray-100 dark:border-gray-800">
        <div class="text-sm text-gray-500 dark:text-gray-400">
          No questions found for this exam.
        </div>
      </div>
    `;
    return;
  }

  if (!answersForExam || answersForExam.length === 0) {
    examAnswersContainer.innerHTML = `
      <div class="p-4 rounded-xl border border-gray-100 dark:border-gray-800">
        <div class="font-bold text-[#0d1b12] dark:text-white mb-1">${examNameText}</div>
        <div class="text-sm text-gray-500 dark:text-gray-400">
          No saved answers found for this exam.
        </div>
      </div>
    `;
    return;
  }

  examAnswersContainer.innerHTML = examQuestions.map((q, idx) => {
    const ans = answersForExam.find(a => String(a.questionId) === String(q.id));
    const selected = ans?.selectedAnswer ?? "-";
    const correct = q.correctAnswer ?? "-";
    const isCorrect = ans?.isCorrect === true;

    return `
      <div class="p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-white dark:bg-dark-surface">
        <div class="font-bold text-[#0d1b12] dark:text-white mb-2">${idx + 1}) ${q.text}</div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
          <div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Student Answer</div>
            <div class="font-bold ${isCorrect ? "text-green-600" : "text-red-500"}">${selected}</div>
          </div>

          <div class="p-3 rounded-lg bg-gray-50 dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800">
            <div class="text-xs text-gray-500 dark:text-gray-400 mb-1">Correct Answer</div>
            <div class="font-bold text-[#0d1b12] dark:text-white">${correct}</div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function renderCompletedExamsList() {
  const completed = Array.isArray(student?.completedExams) ? student.completedExams : [];
  if (completed.length === 0) {
    completedExamsList.innerHTML = `<div class="text-sm text-gray-500 dark:text-gray-400">No completed exams.</div>`;
    return;
  }

  const completedSorted = [...completed].reverse();
  completedExamsList.innerHTML = completedSorted.map(ex => {
    const dateStr = ex.date ? String(ex.date).slice(0, 10) : "";
    const isActive = String(ex.examId) === String(selectedExamId);
    return `
      <button
        class="text-left p-3 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-primary hover:bg-primary/5 transition-colors ${isActive ? "border-primary" : ""}"
        data-exam-id="${ex.examId}">
        <div class="font-bold text-[#0d1b12] dark:text-white">${ex.name || "Exam"}</div>
        <div class="text-xs text-gray-500 dark:text-gray-400">${dateStr} • Score: ${ex.score ?? "-"}</div>
      </button>
    `;
  }).join("");
}

function setupReviewAnswersModal() {
  if (!reviewAnswersModal) return;

  closeReviewAnswersBtn?.addEventListener("click", closeReviewAnswersModal);
  closeReviewAnswersFooterBtn?.addEventListener("click", closeReviewAnswersModal);
  reviewAnswersOverlay?.addEventListener("click", closeReviewAnswersModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !reviewAnswersModal.classList.contains("hidden")) {
      closeReviewAnswersModal();
    }
  });

  completedExamsList.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-exam-id]");
    if (!btn) return;
    const examId = btn.dataset.examId;
    renderExamAnswers(examId);
  });
}

setupReviewAnswersModal();

reviewAnswers?.addEventListener("click", (e) => {
  e.preventDefault();
  renderCompletedExamsList();
  reviewAnswersSubTitle.textContent = `Student: ${student?.username || ""} • ID: ${student?.id || ""}`;
  openReviewAnswersModal();

  // default show selected exam answers
  if (selectedExamId) {
    renderExamAnswers(selectedExamId);
  }
});






function setProgress(percent) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percent / 100) * circumference;

  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = offset;
}
