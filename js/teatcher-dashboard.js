import { validateLoggedInUser, validateQuestion, validateExam } from './validation.js';
import { Question, Exam } from './classes.js';

// ==================== INITIALIZATION ====================
let teacher;
let currentExamQuestions = []; // Questions for the current exam being created
let allQuestions = []; // All questions from all exams
let currentQuestionIndex = 0;
let exams = [];

// Load data from storage
if (localStorage.getItem("currentExamQuestions")) {
    currentExamQuestions = JSON.parse(localStorage.getItem("currentExamQuestions"));
}

if (localStorage.getItem("questions")) {
    allQuestions = JSON.parse(localStorage.getItem("questions"));
}
if (localStorage.getItem("exams")) {
    exams = JSON.parse(localStorage.getItem("exams"));
}

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
const addAnother = document.getElementById('addAnother');
const publishExamBtn = document.getElementById('publishExamBtn');
const logoutBtn = document.getElementById('logoutBtn');

// DOM Elements - Display
const questionTextError = document.getElementById('questionTextError');
const correctAnswerError = document.getElementById('correctAnswerError');
const difficultyError = document.getElementById('difficultyError');
const scoreError = document.getElementById('scoreError');
const choicesError = document.getElementById('choicesError');
const questionNumber = document.getElementById('questionNumber');
const totalQuestionsNum = document.getElementById('totalQuestionsNum');
const examNameError = document.getElementById('examNameError');
const examDurationError = document.getElementById('examDurationError');
const questionsNumError = document.getElementById('questionsNumError');

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
    let answers=[answer1.value, answer2.value, answer3.value, answer4.value]
    let correct=answers[correctAnswer.find(e=>e.checked).value-1]
    return new Question(
        Date.now(),
        questionText.value,
        imageUpload.value,
        [answer1.value, answer2.value, answer3.value, answer4.value],
        correct,
        difficulty.value,
        0
    );
}

// Save to CURRENT exam questions only
function saveQuestionToCurrentExam(question) {
    currentExamQuestions.push(question);
    localStorage.setItem("currentExamQuestions", JSON.stringify(currentExamQuestions));
}

// Update question in CURRENT exam
function updateQuestionInCurrentExam(index, question) {
    currentExamQuestions[index] = question;
    localStorage.setItem("currentExamQuestions", JSON.stringify(currentExamQuestions));
}

// Save to ALL questions (called when exam is published)
function saveQuestionsToAllQuestions() {
    allQuestions = allQuestions.concat(currentExamQuestions);
    localStorage.setItem("questions", JSON.stringify(allQuestions));
}

// Load questions for current exam
function loadCurrentExamQuestions() {
    currentExamQuestions = JSON.parse(localStorage.getItem("currentExamQuestions")) || [];
}

// Load all questions from all exams
function loadAllQuestions() {
    allQuestions = JSON.parse(localStorage.getItem("questions")) || [];
}

// Clear current exam questions after publishing
function clearCurrentExamQuestions() {
    currentExamQuestions = [];
    localStorage.removeItem("currentExamQuestions");
}

// ==================== EXAM MANAGEMENT ====================
function createExam() {
    let currentExam =  new Exam(
        Date.now(),
        examName.value,
        examDuration.value,
        teacher?.id,
        teacher?.course,
        new Date().toISOString(),
        currentExamQuestions, // Use current exam questions
        currentExamQuestions.length,
        currentExamQuestions.map(question => question.id)
    );
    currentExam.calculateQuestionScores();
    return currentExam;


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
    difficultyError.textContent = '';
    choicesError.textContent = '';
}

function clearExamErrors() {
    examNameError.textContent = '';
    examDurationError.textContent = '';
    questionsNumError.textContent = '';
}

function displayQuestionErrors(errors) {
    clearErrors();
    if (errors.errors.question) {
        questionTextError.textContent = errors.errors.question;
    }
    if (errors.errors.correctAnswer) {
        correctAnswerError.textContent = errors.errors.correctAnswer;
    }
    if (errors.errors.difficulty) {
        difficultyError.textContent = errors.errors.difficulty;
    }
    if (errors.errors.score) {
        scoreError.textContent = errors.errors.score;
    }
    if (errors.errors.choices) {
        choicesError.textContent = errors.errors.choices;
    }
}

function displayExamErrors(errors) {
    clearExamErrors();
    if (errors.errors.name) {
        examNameError.textContent = errors.errors.name;
    }
    if (errors.errors.questions) {
        questionsNumError.textContent = errors.errors.questions;
    }
    if (errors.errors.duration) {
        examDurationError.textContent = errors.errors.duration;
    }
}

function populateFormWithQuestion(question) {
    questionText.value = question.text || '';
    imageUpload.value = question.image || '';
    answer1.value = question.choices[0] || '';
    answer2.value = question.choices[1] || '';
    answer3.value = question.choices[2] || '';
    answer4.value = question.choices[3] || '';
    difficulty.selectedIndex = Array.from(difficulty.options).findIndex(option => option.value == question.difficulty) || '';
    
    const correctOption = correctAnswer.find(option => option.value == question.correctAnswer);
    if (correctOption) {
        correctOption.checked = true;
    }
}

// ==================== DISPLAY & NAVIGATION ====================
function displayQuestion(index) {
    if (index < 0 || index >= currentExamQuestions.length) return;
    
    currentQuestionIndex = index;
    questionNumber.textContent = index + 1;
    totalQuestionsNum.textContent = currentExamQuestions.length;
    
    populateFormWithQuestion(currentExamQuestions[index]);
    updateNavigationButtons();
}

function updateNavigationButtons() {
    if (toLeft) {
        toLeft.disabled = currentQuestionIndex === 0 || currentExamQuestions.length === 0;
    }
    if (toRight) {
        toRight.disabled = currentQuestionIndex >= currentExamQuestions.length - 1 || currentExamQuestions.length === 0;
    }
}

function updateQuestionCounter() {
    questionNumber.textContent = currentExamQuestions.length + 1;
    totalQuestionsNum.textContent = currentExamQuestions.length + 1;
}

// ==================== EVENT HANDLERS ====================
function handleAddQuestion() {
    const question = createQuestion();
    const errors = validateQuestion(question);
    
    if (!errors.isValid) {
        displayQuestionErrors(errors);
        return;
    }
    
    if (currentQuestionIndex === currentExamQuestions.length) {
        saveQuestionToCurrentExam(question);
        alert('Question added successfully!');
    } else {
        updateQuestionInCurrentExam(currentQuestionIndex, question);
        alert('Question updated successfully!');
    }
    
    clearErrors();
}

function handleSaveQuestion() {
    if (currentExamQuestions.length === 0) {
        alert('No question to update. Please add a question first.');
        return;
    }
    
    const question = createQuestion();
    const errors = validateQuestion(question);
    
    if (!errors.isValid) {
        displayQuestionErrors(errors);
        return;
    }
    
    clearErrors();
    updateQuestionInCurrentExam(currentQuestionIndex, question);
    alert('Question updated successfully!');
}

function handleNavigateLeft() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion(currentQuestionIndex);
    }
}

function handleNavigateRight() {
    if (currentQuestionIndex < currentExamQuestions.length) {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex);
    }
}

// function handleSubmitExam() {
//     if (currentExamQuestions.length === 0) {
//         alert('Please add at least one question before submitting the exam.');
//         return;
//     }
    
//     if (!examName?.value || !examDuration?.value) {
//         alert('Please fill in exam name and duration.');
//         return;
//     }
    
//     const exam = {
//         id: Date.now(),
//         name: examName.value,
//         duration: examDuration.value,
//         teacherId: teacher?.id,
//         teacherName: teacher?.username,
//         course: teacher?.course,
//         questions: currentExamQuestions, // Use current exam questions
//         createdAt: new Date().toISOString()
//     };
    
//     const exams = JSON.parse(localStorage.getItem("exams")) || [];
//     exams.push(exam);
//     localStorage.setItem("exams", JSON.stringify(exams));
    
//     // Move current exam questions to all questions
//     saveQuestionsToAllQuestions();
    
//     // Clear current exam data
//     clearCurrentExamQuestions();
    
//     alert('Exam created successfully!');
//     window.location.href = "/teacher-dashboard.html";
// }

function handleAddAnother() {
    currentQuestionIndex = currentExamQuestions.length;
    clearQuestionForm();
    updateQuestionCounter();
    updateNavigationButtons();
}

function handlePublishExam() {
    // if (currentExamQuestions.length === 0) {
    //     alert('Please add at least one question before submitting the exam.');
    //     return;
    // }
    
    // if (!examName.value || !examDuration.value) {
        
    //     alert('Please fill in exam name and duration.');
    //     return;
    // }
    const currentExam = {
        name: examName.value,
        duration: examDuration.value,
        questionsNum: questionsNum.value,
    };
    console.log(currentExamQuestions.length ,"currentExamQuestions.length");
    console.log(currentExam.questionsNum ,"exam.questionsNum");
    
    let examValidation = validateExam(currentExam, currentExamQuestions.length);
    if (!examValidation.isValid) {
        displayExamErrors(examValidation);
        return;
    }
    
    saveQuestionsToAllQuestions();
    const newExam = createExam();
    clearExamErrors();
    
    exams.push(newExam);
    localStorage.setItem("exams", JSON.stringify(exams));
    
    // Move current exam questions to all questions
    
    // Clear current exam data
    clearCurrentExamQuestions();
    
    alert('Exam published successfully!');
    window.location.href = "./teacher-dashboard.html";
}



// ==================== EVENT LISTENERS ====================
addQuestion?.addEventListener('click', handleAddQuestion);
saveQuestion?.addEventListener('click', handleSaveQuestion);
toLeft?.addEventListener('click', handleNavigateLeft);
toRight?.addEventListener('click', handleNavigateRight);
submitButton?.addEventListener('click', handleSubmitExam);
addAnother?.addEventListener('click', handleAddAnother);
publishExamBtn?.addEventListener('click', handlePublishExam);
logoutBtn?.addEventListener('click', handleLogout);

// ==================== INITIALIZATION ====================
teacher = initializeUser();
updateTeacherUI(teacher);
loadCurrentExamQuestions();
loadAllQuestions();

if (currentExamQuestions.length > 0) {
    displayQuestion(currentQuestionIndex);
} else {
    updateNavigationButtons();
    updateQuestionCounter();
}