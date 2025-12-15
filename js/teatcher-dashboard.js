import { validateLoggedInUser } from './validation.js';
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
let answer1 = document.getElementById('answer1');
let answer2 = document.getElementById('answer2');
let answer3 = document.getElementById('answer3');
let answer4 = document.getElementById('answer4');
let correctAnswer = document.getElementById('correct_answer');
let submitButton = document.getElementById('submitExam');
let toLeft = document.getElementById('toLeft');
let toRight = document.getElementById('toRight');

submitButton.addEventListener('click', () => {
    
})

function createExam(){
    
}

function getQuestion(){
    
}

function createQuestion(){
    
}

function displayStudents(){
    
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



