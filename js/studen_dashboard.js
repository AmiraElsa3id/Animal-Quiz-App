import { Student } from "./classes.js";

//------------ Html Elment ---------------------------
let TakeQuizBtn = document.querySelector(".StartQuiz")
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

//------------Compelete Exams -----------

let CompeleteExamTable = document.querySelector(".CompeleteExamTable");
let TrCompeleteExam = document.querySelectorAll(".TrCompeleteExam");
//------------------student data -------------------------

let students = JSON.parse(localStorage.getItem("students"))||[];

let  student = JSON.parse(localStorage.getItem("currentUser"));
let cuurentStuden = new Student(...student)
// let curentStudent = Student.fromJSON(student);
console.log(curentStudent)

//-----------------current date -------------------

const options = { day: "numeric", month: "long", year: "numeric" };
let CurrentDate = new Date().toLocaleDateString("en-US", options); 
WelcomeBarDate.innerHTML=CurrentDate
let score = ///

StudentName.forEach(item=>item.innerText+=student.username)// change static data with data of student from json

profileCardId.innerText+=student.id;
profileCardImage.style.src=student.profilePicture;
profileCardExamCount.innerText=student.completedExams.length;
// profileCardScore.innerText=score.studentScore;
// profileCardExamsScore.innerHTML=score.examsScore
//--------- Exam Cards


for (let i =0 ;i<student.assignedExams.length;i++)
{
    let CloneCardExam = ExamCards[0].cloneNode(true);
    ExamCardsSection.appendChild(CloneCardExam);
}

// ExamCards.forEach((card,index)=>{
//     card.dataset.examId = Exam[index].id;
//     card.querySelector(".ExamCardName").innerText=Exam[index].name;
//     card.querySelector(".ExamCardDate").innerText=Exam[index].date;
//     card.querySelector(".ExamCardName").style.src=Exam[index].img
// })


// ---------------- Compelete Exams Table--------------
// for (let i=0 ; i<CompeleteExams ; i ++)
// {
//     let ColneTrCompeleteExam = TrCompeleteExam[0].cloneNode(true);
//     CompeleteExamTable.appendChild(ColneTrCompeleteExam);
// }

// TrCompeleteExam.forEach((exam,index)=>{
//     exam.querySelector(".CompleteExamName").innerText=CompeleteExams[index].name;
//     exam.querySelector(".CompleteExamDate").innerText=CompeleteExams[index].date;
//     exam.querySelector(".CompleteEamScore").innerText=CompeleteExams[index].score;

// })

ExamCards.forEach(card => {
  const btn = card.querySelector('.StartQuiz');
  btn.addEventListener('click', () => {
    const examId = card.dataset.examId;
    window.selectedExamId = card.dataset.examId;
    Router.navigate(`/exam`);
  });
});

