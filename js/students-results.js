
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
// ==================== INITIALIZATION ====================



function displayStudents(students){
    const tableBody=document.querySelector("#tableBody");
    if(students.length==0){
        tableBody.innerHTML="<tr><td colspan='5' class='text-center py-4'>No students found</td></tr>";
        return;
    }
    let box='';
    students.forEach(student => {
        student=Student.fromJSON(student);
     box+=`
        <tr class="hover:bg-primary/5 dark:hover:bg-primary/5 transition-colors group">
                                            <td class="px-6 py-4">
                                                <div class="flex items-center gap-3">
                                                    <img class="size-10 rounded-full bg-cover bg-center border border-border-light dark:border-border-dark"
                                                        data-alt="Portrait of student Alice Johnson"
                                                    src="${student.profilePicture}">
                                                
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




displayStudents(students);


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
