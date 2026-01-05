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

//----------- next exam card
const nextExamCard = document.querySelector(".nextExamCard");
const nextExamImage = document.querySelector(".nextExamImage");
const nextExamName = document.querySelector(".nextExamName");
const nextExamNumberQuestion = document.querySelector(".nextExamNumberQuestion");
const nextExamBtn=document.querySelector(".nextExamBtn");


let student = JSON.parse(localStorage.getItem("currentUser"))||null;

let studentAnswers =JSON.parse(localStorage.getItem("studentAnswers"))||[];
let selectedExamId =localStorage.getItem("selectedExamId");
console.log(student);

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
  
    localStorage.setItem("selectedExamId",nextExamId)
    window.location.href="./quiz.html";
})






function setProgress(percent) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  const offset = circumference - (percent / 100) * circumference;

  progressCircle.style.strokeDasharray = `${circumference}`;
  progressCircle.style.strokeDashoffset = offset;
}

  