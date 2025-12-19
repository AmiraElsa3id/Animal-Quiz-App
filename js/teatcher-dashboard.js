import { validateLoggedInUser,validateQuestion } from './validation.js';
import { Question } from './classes.js';
let teacher ;
const validation = validateLoggedInUser();
if (!validation.isValid) {
    console.log(validation.error);
    // User is not logged in, redirect to login page
    window.location.href = "/";
} else {
    console.log("User is logged in:", validation.user);
    
    // Store teacher data for later use
     teacher = validation.user;
    console.log("Teacher data:", teacher);
    
    // Proceed with dashboard logic
}

// Update UI with teacher information
if (teacher) {
    document.getElementById('teacherName').textContent = teacher.username || 'Unknown Teacher';
    document.getElementById('teacherCourse').textContent = teacher.course || 'No Course Assigned';
    const teacherImage = document.getElementById('teacherImage');
    if (teacherImage) {
        teacherImage.src = teacher.profilePicture || '../assets/image/avatar.webp';
    }
}


let examName = document.getElementById('examName');
let examDuration = document.getElementById('examDuration');
let questionsNum = document.getElementById('questionsNum');
let questionText = document.getElementById('questionText');
let difficulty = document.getElementById('difficulty');
let imageUpload = document.getElementById('imageUpload');
let answer1 = document.getElementById('answer1');
let answer2 = document.getElementById('answer2');
let answer3 = document.getElementById('answer3');
let answer4 = document.getElementById('answer4');
let correctAnswer = Array.from(document.getElementsByName('correct_answer'));
let submitButton = document.getElementById('submitExam');
let addQuestion = document.getElementById('addQuestion');
let toLeft = document.getElementById('toLeft');
let toRight = document.getElementById('toRight');
let submitQuestion = document.getElementById('saveQuestion');
let questionTextError = document.getElementById('questionTextError');
let correctAnswerError = document.getElementById('correctAnswerError');

let questions=[]

function createExam(){
    
}

function getQuestion(){
    
}
 


function createQuestion(){
    console.log(correctAnswer);
    
    let question= new Question(
        Date.now(),
        questionText.value,
        imageUpload.value,
        [answer1.value,answer2.value,answer3.value,answer4.value],
        correctAnswer?.find((option)=>option.checked)?.value,
        difficulty.value,
        5
    )
    
   return question;
}


function displayStudents(){
    
}

function saveQuestion(question){
     let questions = JSON.parse(localStorage.getItem("questions")) || [];
    questions.push(question);
    localStorage.setItem("questions",JSON.stringify(questions));
    console.log(question);
}
function getStudentDetails(){
    
}

function displayResults(){
    
}

function getResults(){
    
}

function getExamDetails(){
    
}

function validateExam(){
    
}



addQuestion?.addEventListener('click',()=>{
 let question = createQuestion();
 let errors =validateQuestion(question);
 if(errors.isValid){
    questionTextError.textContent = "";
    correctAnswerError.textContent = "";
    saveQuestion(question);
 }
 else{
    if(errors.errors.question){
        questionTextError.textContent = errors.errors.question;
    }
    if(errors.errors.correctAnswer){
        correctAnswerError.textContent = errors.errors.correctAnswer;
    }
 }
})
