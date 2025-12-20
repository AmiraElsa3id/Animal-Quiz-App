
import { Student } from "./classes.js";
import { validateLoggedInUser } from "./validation.js";
// ==================== AUTHENTICATION ====================
function initializeUser() {
    const validation = validateLoggedInUser();
    
    if (!validation.isValid) {
        console.log(validation.error);
        window.location.href = "/";
        return null;
    }
    
    console.log("User is logged in:", validation.user);
    return validation.user;
}

function updateTeacherUI(teacher) {
    if (!teacher) return;
    
    const teacherImage = document.getElementById('teacherImage');
    if (teacherImage) {
        teacherImage.src = teacher.profilePicture || '../assets/image/avatar.webp';
    }
}

let students=[];
if(localStorage.getItem("students")){
    students=JSON.parse(localStorage.getItem("students"));
}

let logOutBtn=document.getElementById("logOutBtn");
// ==================== INITIALIZATION ====================
const teacher = initializeUser();
updateTeacherUI(teacher);


function displayStudents(students){
    const tableBody=document.querySelector("#tableBody");
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
                                        <td class="px-6 py-4 text-text-main-light dark:text-text-main-dark">Mammals Quiz
                                            1</td>

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

function logOut(){
    localStorage.removeItem("currentUser");
    window.location.href="/";
}

logOutBtn.addEventListener("click",logOut);
displayStudents(students);


function viewAnswers(id){
   let std= students.find(student=>student.id==id);
   let std_answers=JSON.parse(localStorage.getItem("answers")).find(answer=>answer.studentId==id);
   let exam=JSON.parse(localStorage.getItem("exams")).find(exam=>exam.id==std_answers.examId);
   let questions=JSON.parse(localStorage.getItem("questions")).filter(question=>exam.questions.includes(question.id));

}