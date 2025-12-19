// import examData from '../data/examSample.json' assert { type: 'json' };
// console.log(examData);
// const examData = await fetch('../data/examSample.json').then(r => r.json());
import { Student, Answer } from "./classes.js";
let exams =
  [
    {
      "id": "e1",
      "name": "exam1",
      "duration": 45,
      "teacherId": "t1",
      "course": "Animal Expert",
      "createdAt": "2025-12-10T14:30:00.000Z",
      "assignedStudents": ["std1ID", "std2ID"],
      "questions": ["q1", "q2"]

    }
  ]


let questions =
  [
    {
      "id": "q1",
      "text": "question text ",
      "image": "",
      "choices": ["1choice1", "1choice2", "1choice3", "1choice4"],
      "correctAnswer": "1choice1",
      "difficulty": "easy",
      "score": 5
    },
    {
      "id": "q2",
      "text": "question text ",
      "image": "",
      "choices": ["2choice1", "2choice2", "2choice3", "2choice4"],
      "correctAnswer": "2choice1",
      "difficulty": "easy",
      "score": 5
    }

  ]

localStorage.setItem("Exams", JSON.stringify(exams));
localStorage.setItem("questions", JSON.stringify(questions));


//------------------html Element 
let durationTimer = document.querySelector(".durationTimer .timer");
let questioncounter = document.querySelector(".questioncounter");
let examName = document.querySelector(".examName");//-----
let animatedBrogressBar = document.querySelector(".animatedBrogressBar");
let questionTimer = document.querySelector(".questionTimer");

//----------question item  
let questionTitle = document.querySelector(".questionTitle");
let imageCard = document.querySelector(".imageCard");
let answerArea = document.querySelector(".answerArea")
let answerOptionTemplate = document.querySelector(".answerOption");
//----------------feedback
let feedbackMessageCorrect = document.querySelector(".feedbackMessageCorrect");
let feedbackMessageWrong = document.querySelector(".feedbackMessageWrong")
let feedbackH4 = document.querySelector(".feedbackH4");
let feedbackP = document.querySelector(".feedbackP");
const wfeedbackP = document.querySelector(".wfeedbackP")
//-----------------Btns 
let nextQuestionBtn = document.querySelector(".nextQuestionBtn");
let logoutBtn = document.querySelector(".logoutBtn");
let students = JSON.parse(localStorage.getItem("students")) || [];
let Exams = JSON.parse(localStorage.getItem("Exams")) || [];
let questionsData = JSON.parse(localStorage.getItem("questions")) || [];
let currentExamId = "e1";//JSON.parse(localStorage.getItem("selectedExamId"));
let currentExamData = Exams.find(e => e.id == currentExamId);
let student = JSON.parse(localStorage.getItem("currentUser"));
let curentStudentObj = Student.fromJSON(student);
let answers = [];
//---------------
currentExamData["questions"].sort((a, b) => a.localeCompare(b))
let currentQuestionIndex = 0;
let questionsCount = currentExamData["questions"].length;
let examDuration = currentExamData.duration;
let questionDuration = examDuration / currentExamData["questions"].length;
let score = 0;
let questionDurationId = 0;
let examDurationId = 0;
let examMinute = 0;
let examSecond = 0;
let questionMinute = 0;
let questionSecond = 0;
let timeOfFinshed = 0
let timeOfFinsheOfQuestion = 0;
const CORRECT_CLASSES = [
  "border-green-500",
  "bg-green-50",
  "dark:bg-green-900/20",
  "ring-2",
  "ring-green-400/50"
];

const WRONG_CLASSES = [
  "border-red-500",
  "bg-red-50",
  "dark:bg-red-900/20"
];


//------
examName.innerHTML = currentExamData.name;
examDurationFun(examDuration)

let question = printQuestioin();
nextQuestionBtn.addEventListener("click", function () {
  clearInterval(questionDurationId);
  let checkedRadio = answerArea.querySelector('.answerRadio:checked');
  if (!checkedRadio) return;
  answerArea.querySelectorAll(".answerRadio").forEach(r => r.disabled = true);
  if (checkedRadio.dataset.correct === "true") {
    isCorrectFun(question, checkedRadio);
  } else {
    isWrongFun(question, checkedRadio);
  }

});


function printQuestioin() {
  questioncounter.innerHTML = currentQuestionIndex + 1;
  animatedBrogressBar.style.width = `${((currentQuestionIndex + 1) / questionsCount) * 100}%`; setIntervalFun(4, currentQuestionIndex)
  if (currentQuestionIndex == currentExamData["questions"].length) {
    examFinsed()
    return 0;
  }

  let questionId = currentExamData["questions"][currentQuestionIndex];
  let questionData = questionsData.find(e => e.id == questionId)
  if (questionData) {
    questionTitle.innerHTML = questionData.text;
    if (questionData.image) {
      imageCard.classList.remove("hidden")
      imageCard.img.style.href = questionData.image;
    }
    else {
      imageCard.classList.add("hidden");
    }
    let choicesRandomize = questionData.choices.sort((a, b) => a.localeCompare(b));
    answerArea.innerHTML = "";
    choicesRandomize.forEach(choice => {
      let optionClone = answerOptionTemplate.cloneNode(true);
      optionClone.classList.remove("hidden");

      let radio = optionClone.querySelector(".answerRadio");
      let span = optionClone.querySelector(".answerSpan");
      span.textContent = choice;
      radio.dataset.correct = (choice === questionData.correctAnswer);
      answerArea.append(optionClone);
    });


    return questionData;
  }
  else {
    alert("the question does not exist ")
  }
}




function isCorrectFun(question, checkedradio) {

  const selectedLabel = checkedradio.closest(".answerOption");
  selectedLabel.classList.add(...CORRECT_CLASSES);

  score += question.score;
  feedbackMessageCorrect.classList.remove("hidden");
  feedbackH4.innerHTML = "CORRECT ANSWER !!";
  feedbackP.innerHTML = `${question.correctAnswer}`;
  answers.push(new Answer(question.id, question.correctAnswer, true, timeOfFinsheOfQuestion).toJSON())
  setTimeout(() => {
    currentQuestionIndex++;
    feedbackMessageCorrect.classList.add("hidden");
    answerArea.innerHTML = "";
    question = printQuestioin();
  }, 2000);
}


function isWrongFun(question, checkedradio) {

  const selectedLabel = checkedradio.closest(".answerOption");
  selectedLabel.classList.add(...WRONG_CLASSES);
  feedbackMessageWrong.classList.remove("hidden")
  wfeedbackP.innerHTML = ` the correct answer is ${question.correctAnswer}`
  let option = selectedLabel.querySelector(".answerSpan").textContent;
  answers.push(new Answer(question.id, option, false, timeOfFinsheOfQuestion).toJSON())
  setTimeout(() => {
    currentQuestionIndex++;
    feedbackMessageWrong.classList.add("hidden");
    answerArea.innerHTML = "";
    question = printQuestioin();
  }, 2000);
}


function examFinsed() {

  clearInterval(examDurationId)
  curentStudentObj.completeExam(currentExamId, currentExamData.name, score, timeOfFinshed)
  students = students.filter(e => e.id != student.id);
  students.push(curentStudentObj.toJSON());
  localStorage.setItem("students", JSON.stringify(students));
  localStorage.setItem("studentAnswers", JSON.stringify(answers));
}

function setIntervalFun(questionDuration, questionCount) {
  questionMinute = 0
  questionSecond = 0;
  clearInterval(questionDurationId)
  let duration = Number(questionDuration) * 60;

  const totalDuration = duration;
  if (questionCount < questionsCount) {
    console.log("ok")
    questionDurationId = setInterval(() => {
      questionMinute = parseInt(duration / 60);
      questionSecond = parseInt(duration % 60);
      questionMinute = questionMinute < 10 ? `0${questionMinute}` : questionMinute;
      questionSecond = questionSecond < 10 ? `0${questionSecond}` : questionSecond;
      questionTimer.innerHTML = `${questionMinute} : ${questionSecond}`
      let elapsed = totalDuration - duration;
      let elMin = parseInt(elapsed / 60);
      let elSec = parseInt(elapsed % 60);
      timeOfFinsheOfQuestion = `${elMin < 10 ? "0" + elMin : elMin} : ${elSec < 10 ? "0" + elSec : elSec}`;
      if (--duration < 0) {
        clearInterval(questionDurationId)
        nextQuestionBtn.click()
      }

    }, 1000);
  }
}

function examDurationFun(examDuration) {
  examMinute = 0;
  examSecond = 0;
  let duration = Number(examDuration) * 60;
  const totalDuration = duration;
  clearInterval(examDurationId)
  examDurationId = setInterval(() => {
    examMinute = parseInt(duration / 60);
    examSecond = parseInt(duration % 60);

    examMinute = examMinute < 10 ? `0${examMinute}` : examMinute;
    examSecond = examSecond < 10 ? `0${examSecond}` : examSecond;
    durationTimer.innerHTML = `${examMinute} : ${examSecond}`
    let elapsed = totalDuration - duration;
    let elMin = parseInt(elapsed / 60);
    let elSec = parseInt(elapsed % 60);
    timeOfFinshed = `${elMin < 10 ? "0" + elMin : elMin} : ${elSec < 10 ? "0" + elSec : elSec}`;
    if (--duration < 0) {
      clearInterval(examDurationId)
      examFinsed()
    }
  }, 1000);
}

