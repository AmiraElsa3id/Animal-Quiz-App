import { Student,Exam } from "./classes.js";


//------------ Html Elment ---------------------------
let TakeQuizBtn = document.querySelector(".TakeQuiz")
//-------------profile card  elements ----------------
let WelcomeBarDate = document.querySelector(".CurrentDate");
let profileCardImage = document.querySelector("#profileCardImage img");
let StudentName = document.querySelectorAll(".StudentName");
let profileCardId = document.querySelector("#profileCardId");
let profileCardExamCount=document.querySelector("#profileCardExamCount");
let profileCardScore=document.querySelector("#profileCardScore");
let profileCardExamsScore = document.querySelector("#profileCardExamsScore");

//----------------Exam card  element -----------------
let ExamCardsSection =document.querySelector("#ExamsCards");
let ExamCards =ExamCardsSection.querySelectorAll(".ExamCard");
let noExamYet =ExamCardsSection.querySelector(".noExamYet");
//------------Compelete Exams -----------

let CompeleteExamTable = document.querySelector(".CompeleteExamTable");
let TrCompeleteExam = document.querySelectorAll(".TrCompeleteExam");
//------------------student data -------------------------

let students = JSON.parse(localStorage.getItem("students"))||[];
let  student = JSON.parse(localStorage.getItem("currentUser"));
let Exams = JSON.parse(localStorage.getItem("exams"))||[];
let curentStudentObj = Student.fromJSON(student);
let score = curentStudentObj.getAverageScore().toFixed(2);


//-----------------current date -------------------

const options = { day: "numeric", month: "long", year: "numeric" };
let CurrentDate = new Date().toLocaleDateString("en-US", options); 
ExamCards.forEach(card=>card.classList.add("hidden"));
WelcomeBarDate.innerHTML=CurrentDate
StudentName.forEach(item=>item.innerText+=student.username)
profileCardId.innerText+=student.id;
profileCardImage.style.src=student.profilePicture;
profileCardExamCount.innerText=student.completedExams.length;
profileCardScore.innerText=score;
profileCardExamsScore.innerHTML=student.completedExams.length*100;
//--------- Exam Cards
for (let i =0 ;i<student.assignedExams.length;i++)
{
    let CloneCardExam = ExamCards[0].cloneNode(true);
    ExamCardsSection.appendChild(CloneCardExam);
}
console.log(student.assignedExams.length==0)
console.log(student.assignedExams)

if(student.assignedExams.length==0)
{
  ExamCards.forEach(card=>{card.classList.add("hidden")});
  noExamYet.classList.remove("hidden");
}
else
{ 
    noExamYet.classList.add("hidden")
    ExamCards.forEach((card,index)=>{
        let examId=student["assignedExams"][index]
        console.log(examId)
        console.log(Exams)
        const exam = Exams.find(e =>{
          console.log(e.id);
          
          return e.id == examId;
        }
          
          
        );
        console.log(exam)
        if (!exam) {
                    alert("that is exam id is not valid ")
        } else {
                    console.log(exam)
                    card.classList.remove("hidden")
                    card.dataset.examId =exam.id;
                    card.querySelector("#ExamCardName").innerText=exam.name;
                    // card.querySelector("#ExamCardDate").innerText=student["assignedExams"].date;// ask if we need it or not 
                    // card.querySelector(".ExamCardImage").style.src=exam.image
        }
        
    })
}

// ---------------- Compelete Exams Table--------------

if(student.completedExams.length==0){
    CompeleteExamTable.classList.add("hidden");
}
else{
for (let i=0 ; i<student.completedExams ; i ++)
{
    let ColneTrCompeleteExam = TrCompeleteExam[0].cloneNode(true);
    CompeleteExamTable.appendChild(ColneTrCompeleteExam);
}


TrCompeleteExam.forEach((exam,index)=>{
    exam.classList.remove("hidden")
    exam.querySelector(".CompleteExamName").innerText=student.completedExams[index].name||"";
    exam.querySelector(".CompleteExamDate").innerText=student.completedExams[index].date||"";
    exam.querySelector(".CompleteEamScore").innerText=student.completedExams[index].score||"";

})
}

ExamCards.forEach(card => {
  const btn = card.querySelector('.StartQuiz');
  btn.addEventListener('click', () => {
    const examId = card.dataset.examId;
    localStorage.setItem("selectedExamId",examId)
    window.location.href = "./quiz.html";
  });
});

TakeQuizBtn.addEventListener("click",function(){
  console.log("ok");
  const examId=student.assignedExams.pop();
  localStorage.setItem("selectedExamId",examId);
  window.location.href="./quiz.html";
})



