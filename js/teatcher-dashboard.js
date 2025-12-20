
import { validateLoggedInUser, validateQuestion,validateExam } from './validation.js';
import { Question ,Exam } from './classes.js';

// ==================== INITIALIZATION ====================
let teacher;
let questions = [];
let exams=[];
let currentQuestionIndex = 0;

if(localStorage.getItem("exams")){
    exams=JSON.parse(localStorage.getItem("exams"));
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
// ==================== EXAM MANAGEMENT ====================
function createExam() {
    return new Exam(
        Date.now(),
        examName.value,
        examDuration.value,
        teacher?.id,
        teacher?.course,
        new Date().toISOString(),
        [],
        questions.length,
        questions.map(question => question.id)
    );
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
function displayExamErrors(errors){
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
    totalQuestionsNum.textContent = questions.length+1;
}

// ==================== EVENT HANDLERS ====================
function handleAddQuestion() {
    const question = createQuestion();
    const errors = validateQuestion(question);
    console.log(currentQuestionIndex);
    
    if (!errors.isValid) {
        displayQuestionErrors(errors);
        return;
    }
    if(currentQuestionIndex === questions.length){
        saveQuestionToStorage(question);
        // currentQuestionIndex = questions.length;
        // clearQuestionForm();
        alert('Question added successfully!');
    }
    else{
        updateQuestionInStorage(currentQuestionIndex, question);
        alert('Question updated successfully!');
    }
    clearErrors();
    // updateQuestionCounter();
    // updateNavigationButtons();
}

function handleSaveQuestion() {
    if (questions.length === 0) {
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
    if (currentQuestionIndex < questions.length ) {
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

function handleAddAnother() {
    currentQuestionIndex = questions.length;
    clearQuestionForm();
    updateQuestionCounter();
    updateNavigationButtons();
    
}

function handlePublishExam(){
    const exam={
        name:examName.value,
        duration:examDuration.value,
        questionsNum:questions.length,
    }
    let examValidation=validateExam(exam,questions);
    if(!examValidation.isValid){
        displayExamErrors(examValidation);
        return;
    }
    createExam();
    clearExamErrors();
    exams.push(exam);
    localStorage.setItem("Exams", JSON.stringify(exams));
    // localStorage.removeItem("questions");
    // questions.forEach(q=>q.score=q.score*100/questions.length);
    // localStorage.setItem("questions", JSON.stringify(questions));
    

}

function handleLogout(){
    localStorage.removeItem("currentUser");
    window.location.href = "/";
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
loadQuestionsFromStorage();

if (questions.length > 0) {
    displayQuestion(currentQuestionIndex);
} else {
    updateNavigationButtons();
    updateQuestionCounter();
}