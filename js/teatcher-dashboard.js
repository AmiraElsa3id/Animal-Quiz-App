// import { validateLoggedInUser,validateQuestion } from './validation.js';
// import { Question } from './classes.js';
// let teacher ;
// const validation = validateLoggedInUser();
// if (!validation.isValid) {
//     console.log(validation.error);
//     // User is not logged in, redirect to login page
//     window.location.href = "/";
// } else {
//     console.log("User is logged in:", validation.user);
    
//     // Store teacher data for later use
//      teacher = validation.user;
//     console.log("Teacher data:", teacher);
    
//     // Proceed with dashboard logic
// }

// // Update UI with teacher information
// if (teacher) {
//     document.getElementById('teacherName').textContent = teacher.username || 'Unknown Teacher';
//     document.getElementById('teacherCourse').textContent = teacher.course || 'No Course Assigned';
//     const teacherImage = document.getElementById('teacherImage');
//     if (teacherImage) {
//         teacherImage.src = teacher.profilePicture || '../assets/image/avatar.webp';
//     }
// }


// let examName = document.getElementById('examName');
// let examDuration = document.getElementById('examDuration');
// let questionsNum = document.getElementById('questionsNum');
// let questionText = document.getElementById('questionText');
// let difficulty = document.getElementById('difficulty');
// let imageUpload = document.getElementById('imageUpload');
// let answer1 = document.getElementById('answer1');
// let answer2 = document.getElementById('answer2');
// let answer3 = document.getElementById('answer3');
// let answer4 = document.getElementById('answer4');
// let correctAnswer = Array.from(document.getElementsByName('correct_answer'));
// let submitButton = document.getElementById('submitExam');
// let addQuestion = document.getElementById('addQuestion');
// let toLeft = document.getElementById('toLeft');
// let toRight = document.getElementById('toRight');
// let submitQuestion = document.getElementById('saveQuestion');
// let questionTextError = document.getElementById('questionTextError');
// let correctAnswerError = document.getElementById('correctAnswerError');

// let questionNumber = document.getElementById('questionNumber');
// let totalQuestionsNum = document.getElementById('totalQuestionsNum');



// let questions=[];
// let currentQuestionIndex=0;

// function createExam(){
    
// }

// function getQuestion(){
    
// }
 

// // create quistion obj
// function createQuestion(){
//     console.log(correctAnswer);
    
//     let question= new Question(
//         Date.now(),
//         questionText.value,
//         imageUpload.value,
//         [answer1.value,answer2.value,answer3.value,answer4.value],
//         correctAnswer?.find((option)=>option.checked)?.value,
//         difficulty.value,
//         5
//     )
    
//    return question;
// }


// function displayQuestion(index){
//     questionNumber.textContent = index + 1;
//     totalQuestionsNum.textContent = questions.length;
    
//    if(index<0){
//     currentQuestionIndex=0;
//     toLeft.disabled=true;
//    }
//    else if(index>questions.length){
//     currentQuestionIndex=questions.length-1;
//     toRight.disabled=true;
//    }
//    else{
//     questionText.value=questions[index].questionText;
//         imageUpload.value=questions[index].image;
//         answer1.value=questions[index].choices[0];
//         answer2.value=questions[index].choices[1];
//         answer3.value=questions[index].choices[2];
//         answer4.value=questions[index].choices[3];
//         correctAnswer.find((option)=>option.value==questions[index].correctAnswer).checked=true;
//         difficulty.value=questions[index].difficulty;
//    }
// }

// function saveQuestion(question){
//      let questions = JSON.parse(localStorage.getItem("questions")) || [];
//     questions.push(question);
//     localStorage.setItem("questions",JSON.stringify(questions));
//     console.log(question);
// }
// function getStudentDetails(){
    
// }

// function displayResults(){
    
// }

// function getResults(){
    
// }

// function getExamDetails(){
    
// }

// function validateExam(){
    
// }



// addQuestion?.addEventListener('click',()=>{
//  let question = createQuestion();
//  let errors =validateQuestion(question);
//  if(errors.isValid){
//     questionTextError.textContent = "";
//     correctAnswerError.textContent = "";
//     saveQuestion(question);
//     currentQuestionIndex++;
//     displayQuestion(currentQuestionIndex);
//  }
//  else{
//     if(errors.errors.question){
//         questionTextError.textContent = errors.errors.question;
//     }
//     if(errors.errors.correctAnswer){
//         correctAnswerError.textContent = errors.errors.correctAnswer;
//     }
//  }
// })

// toLeft?.addEventListener('click',()=>{
//     currentQuestionIndex--;
//     displayQuestion(currentQuestionIndex);
// })
// toRight?.addEventListener('click',()=>{
//     currentQuestionIndex++;
//     displayQuestion(currentQuestionIndex);
// })  














import { validateLoggedInUser, validateQuestion } from './validation.js';
import { Question } from './classes.js';

// ==================== INITIALIZATION ====================
let teacher;
let questions = [];
let currentQuestionIndex = 0;

// DOM Elements - Form Fields
const examName = document.getElementById('examName');
const examDuration = document.getElementById('examDuration');
const questionsNum = document.getElementById('questionsNum');
const questionText = document.getElementById('questionText');
const difficulty = document.getElementById('difficulty');
const imageUpload = document.getElementById('imageUpload');
const answer1 = document.getElementById('answer1');
const answer2 = document.getElementById('answer2');
const answer3 = document.getElementById('answer3');
const answer4 = document.getElementById('answer4');
const correctAnswer = Array.from(document.getElementsByName('correct_answer'));

// DOM Elements - Buttons
const submitButton = document.getElementById('submitExam');
const addQuestion = document.getElementById('addQuestion');
const saveQuestion = document.getElementById('saveQuestion');
const toLeft = document.getElementById('toLeft');
const toRight = document.getElementById('toRight');

// DOM Elements - Display
const questionTextError = document.getElementById('questionTextError');
const correctAnswerError = document.getElementById('correctAnswerError');
const questionNumber = document.getElementById('questionNumber');
const totalQuestionsNum = document.getElementById('totalQuestionsNum');

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
    
    document.getElementById('teacherName').textContent = teacher.username || 'Unknown Teacher';
    document.getElementById('teacherCourse').textContent = teacher.course || 'No Course Assigned';
    
    const teacherImage = document.getElementById('teacherImage');
    if (teacherImage) {
        teacherImage.src = teacher.profilePicture || '../assets/image/avatar.webp';
    }
}

// ==================== QUESTION MANAGEMENT ====================
function createQuestion() {
    return new Question(
        Date.now(),
        questionText.value,
        imageUpload.value,
        [answer1.value, answer2.value, answer3.value, answer4.value],
        correctAnswer?.find(option => option.checked)?.value,
        difficulty.value,
        5
    );
}

function saveQuestionToStorage(question) {
    questions.push(question);
    localStorage.setItem("questions", JSON.stringify(questions));
}

function updateQuestionInStorage(index, question) {
    questions[index] = question;
    localStorage.setItem("questions", JSON.stringify(questions));
}

function loadQuestionsFromStorage() {
    questions = JSON.parse(localStorage.getItem("questions")) || [];
}

// ==================== FORM MANAGEMENT ====================
function clearQuestionForm() {
    questionText.value = '';
    imageUpload.value = '';
    answer1.value = '';
    answer2.value = '';
    answer3.value = '';
    answer4.value = '';
    correctAnswer.forEach(option => option.checked = false);
    difficulty.value = '';
    clearErrors();
}

function clearErrors() {
    questionTextError.textContent = '';
    correctAnswerError.textContent = '';
}

function displayErrors(errors) {
    clearErrors();
    if (errors.errors.question) {
        questionTextError.textContent = errors.errors.question;
    }
    if (errors.errors.correctAnswer) {
        correctAnswerError.textContent = errors.errors.correctAnswer;
    }
}

function populateFormWithQuestion(question) {
    questionText.value = question.questionText || '';
    imageUpload.value = question.image || '';
    answer1.value = question.choices[0] || '';
    answer2.value = question.choices[1] || '';
    answer3.value = question.choices[2] || '';
    answer4.value = question.choices[3] || '';
    difficulty.value = question.difficulty || '';
    
    const correctOption = correctAnswer.find(option => option.value == question.correctAnswer);
    if (correctOption) {
        correctOption.checked = true;
    }
}

// ==================== DISPLAY & NAVIGATION ====================
function displayQuestion(index) {
    if (index < 0 || index >= questions.length) return;
    
    currentQuestionIndex = index;
    questionNumber.textContent = index + 1;
    totalQuestionsNum.textContent = questions.length;
    
    populateFormWithQuestion(questions[index]);
    updateNavigationButtons();
}

function updateNavigationButtons() {
    if (toLeft) {
        toLeft.disabled = currentQuestionIndex === 0 || questions.length === 0;
    }
    if (toRight) {
        toRight.disabled = currentQuestionIndex >= questions.length - 1 || questions.length === 0;
    }
}

function updateQuestionCounter() {
    questionNumber.textContent = questions.length + 1;
    totalQuestionsNum.textContent = questions.length;
}

// ==================== EVENT HANDLERS ====================
function handleAddQuestion() {
    const question = createQuestion();
    const errors = validateQuestion(question);
    
    if (!errors.isValid) {
        displayErrors(errors);
        return;
    }
    
    clearErrors();
    saveQuestionToStorage(question);
    currentQuestionIndex = questions.length - 1;
    clearQuestionForm();
    updateQuestionCounter();
    updateNavigationButtons();
    alert('Question added successfully!');
}

function handleSaveQuestion() {
    if (questions.length === 0) {
        alert('No question to update. Please add a question first.');
        return;
    }
    
    const question = createQuestion();
    const errors = validateQuestion(question);
    
    if (!errors.isValid) {
        displayErrors(errors);
        return;
    }
    
    clearErrors();
    updateQuestionInStorage(currentQuestionIndex, question);
    alert('Question updated successfully!');
}

function handleNavigateLeft() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
}

function handleNavigateRight() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
}

function handleSubmitExam() {
    if (questions.length === 0) {
        alert('Please add at least one question before submitting the exam.');
        return;
    }
    
    if (!examName?.value || !examDuration?.value) {
        alert('Please fill in exam name and duration.');
        return;
    }
    
    const exam = {
        id: Date.now(),
        name: examName.value,
        duration: examDuration.value,
        teacherId: teacher?.id,
        teacherName: teacher?.username,
        course: teacher?.course,
        questions: questions,
        createdAt: new Date().toISOString()
    };
    
    const exams = JSON.parse(localStorage.getItem("exams")) || [];
    exams.push(exam);
    localStorage.setItem("exams", JSON.stringify(exams));
    localStorage.removeItem("questions");
    
    alert('Exam created successfully!');
    // window.location.href = "/teacher-dashboard.html";
}

// ==================== EVENT LISTENERS ====================
addQuestion?.addEventListener('click', handleAddQuestion);
saveQuestion?.addEventListener('click', handleSaveQuestion);
toLeft?.addEventListener('click', handleNavigateLeft);
toRight?.addEventListener('click', handleNavigateRight);
submitButton?.addEventListener('click', handleSubmitExam);

// ==================== INITIALIZATION ====================
teacher = initializeUser();
updateTeacherUI(teacher);
loadQuestionsFromStorage();

if (questions.length > 0) {
    displayQuestion(currentQuestionIndex);
} else {
    updateNavigationButtons();
    updateQuestionCounter();
}