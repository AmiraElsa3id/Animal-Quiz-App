// Base User class
class User {
  constructor(id, username, password, role ,profilePicture) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.role = role;
    this.profilePicture = profilePicture;
  }
}

// Student class
class Student extends User {
  constructor(
   
    username,
    password,
    grade,
    mobile,
    profilePicture = './assets/images/avatar.webp',
    completedExams = [],
    assignedExams = [],  
    id = Date.now()
  ) {

    super(id, username, password, 'student', profilePicture);
    this.grade = grade;
    this.mobile = mobile;
    this.completedExams = completedExams;
    this.assignedExams = assignedExams;
  }

  completeExam(examId, name ,score,timeOfFinshed ,date = new Date()) {
    this.completedExams.push(new CompletedExam(examId, name,score,timeOfFinshed, date));
    this.assignedExams = this.assignedExams.filter(id => id !== examId);
  }

  assignExam(examId) {
    if (!this.assignedExams.includes(examId)) {
      this.assignedExams.push(examId);
    }
  }

    getAverageScore() {
      if (this.completedExams.length === 0) return 0;
      const total = this.completedExams.reduce((sum, exam) => sum + Number(exam.score), 0);
      return total / this.completedExams.length;
    }
  
    static fromJSON(obj) {
      return new Student(
        obj.username,
        obj.password,
        obj.grade,
        obj.mobile,
        obj.profilePicture,
        obj.completedExams || [],
        obj.assignedExams||[],
        obj.id
      );
    }
  toJSON() {
    return {
      id: this.id,
      username: this.username,
      password: this.password,
      role: this.role,
      grade: this.grade,
      mobile: this.mobile,
      profilePicture: this.profilePicture,
      theme: this.theme,
      completedExams: this.completedExams,
      assignedExams: this.assignedExams
    };
  }
}

// Teacher class
class Teacher extends User {
  constructor(id, username, password, course, darkMode = false, profilePicture = './assets/images/avatar.webp') {
    super(id, username, password, 'teacher', profilePicture);
    this.course = course;
    this.darkMode = darkMode;
  }

  // toggleDarkMode() {
  //   this.darkMode = !this.darkMode;
  // }

  // toJSON() {
  //   return {
  //     id: this.id,
  //     username: this.username,
  //     password: this.password,
  //     role: this.role,
  //     course: this.course,
  //     darkMode: this.darkMode
  //   };
  // }
}

// CompletedExam class
class CompletedExam {
  constructor(examId,name, score,timeOfFinshed, date) {
    this.examId = examId;
    this.name = name
    this.score = score;
    this.timeOfFinshed=timeOfFinshed;
    this.date = date;
  }

  // toJSON() {
  //   return {
  //     examId: this.examId,
  //     score: this.score,
  //     date: this.date.toISOString()
  //   };
  // }
}

// Question class
class Question {
  constructor(id, text, image, choices, correctAnswer, difficulty, score) {
    this.id = id;
    this.text = text;
    this.image = image;
    this.choices = choices;
    this.correctAnswer = correctAnswer;
    this.difficulty = difficulty;
    this.score = score;
  }
  calcScore() {
    switch(this.difficulty){
      case "Eazy":
          this.score=1;
        break;
      case "Medium":
          this.score=2;
      break;
      case "Hard":
          this.score=3;
        break;
    }
  }

  isCorrect(selectedAnswer) {
    return selectedAnswer === this.correctAnswer;
  }

  // toJSON() {
  //   return {
  //     id: this.id,
  //     text: this.text,
  //     image: this.image,
  //     choices: this.choices,
  //     correctAnswer: this.correctAnswer,
  //     difficulty: this.difficulty,
  //     score: this.score
  //   };
  // }
}

// Exam class
class Exam {
  constructor(
    id,
    name,
    duration,
    teacherId,
    course,
    createdAt,
    assignedStudents = [],
    questionsNum,
    questions = []
  ) {
    this.id = id;
    this.name = name;
    this.duration = duration;
    this.teacherId = teacherId;
    this.course = course;
    this.createdAt = createdAt;
    this.assignedStudents = assignedStudents;
    this.questionsNum=questionsNum;
    this.questions = questions;
  }

  addQuestion(question) {
    this.questions.push(question);
  }

  removeQuestion(questionId) {
    this.questions = this.questions.filter(q => q.id !== questionId);
  }

  assignToStudent(studentId) {
    if (!this.assignedStudents.includes(studentId)) {
      this.assignedStudents.push(studentId);
    }
  }

  unassignStudent(studentId) {
    this.assignedStudents = this.assignedStudents.filter(id => id !== studentId);
  }

  getTotalScore() {
    return this.questions.reduce((sum, q) => sum + q.score, 0);
  }

  getQuestionCount() {
    return this.questions.length;
  }

  // toJSON() {
  //   return {
  //     id: this.id,
  //     name: this.name,
  //     duration: this.duration,
  //     teacherId: this.teacherId,
  //     course: this.course,
  //     createdAt: this.createdAt.toISOString(),
  //     assignedStudents: this.assignedStudents,
  //     questions: this.questions.map(q => q.toJSON())
  //   };
  // }
}

// Answer class
class Answer {
  constructor(questionId,studentId, selectedAnswer, isCorrect, timeSpent) {
    this.questionId = questionId;
    this.selectedAnswer = selectedAnswer;
    this.isCorrect = isCorrect;
    this.timeSpent = timeSpent;
  }

  toJSON() {
    return {
      questionId: this.questionId,
      selectedAnswer: this.selectedAnswer,
      isCorrect: this.isCorrect,
      timeSpent: this.timeSpent
    };
  }
}

// Result class
class Result {
  constructor(id, studentId, examId, score, date, answers = []) {
    this.id = id;
    this.studentId = studentId;
    this.examId = examId;
    this.score = score;
    this.date = date;
    this.answers = answers;
  }

  addAnswer(answer) {
    this.answers.push(answer);
  }

  getCorrectAnswersCount() {
    return this.answers.filter(a => a.isCorrect).length;
  }

  getTotalTimeSpent() {
    return this.answers.reduce((sum, a) => sum + a.timeSpent, 0);
  }

  getAverageTimePerQuestion() {
    if (this.answers.length === 0) return 0;
    return this.getTotalTimeSpent() / this.answers.length;
  }

  getPercentage(totalPossibleScore) {
    if (totalPossibleScore === 0) return 0;
    return (this.score / totalPossibleScore) * 100;
  }

  // toJSON() {
  //   return {
  //     id: this.id,
  //     studentId: this.studentId,
  //     examId: this.examId,
  //     score: this.score,
  //     date: this.date.toISOString(),
  //     answers: this.answers.map(a => a.toJSON())
  //   };
  // }
}

export {Student,Teacher,Question, Exam,Answer}

// Example usage:
// const student = new Student(
//   's1701234567890',
//   'john_doe',
//   'hashed_password',
//   2,
//   '01234567890',
//   'data:image/jpeg;base64,/9j/4AAQ...',
//   'ocean'
// );

// const teacher = new Teacher(
//   't1',
//   'teacher_animals',
//   'hashed_password',
//   'Animals',
//   false
// );

// const question = new Question(
//   'q1701234567890',
//   "Which breed is known as the 'King of Terriers'?",
//   'data:image/jpeg;base64,/9j/4AAQ...',
//   ['Airedale Terrier', 'Yorkshire Terrier', 'Scottish Terrier', 'Fox Terrier'],
//   0,
//   'medium',
//   5
// );

// const exam = new Exam(
//   'e1701234567890',
//   'Dog Breeds Expert Quiz',
//   30,
//   't1',
//   'Animals',
//   new Date('2025-12-01T10:00:00.000Z')
// );

// exam.addQuestion(question);
// exam.assignToStudent(student.id);

// console.log('Student:', student.toJSON());
// console.log('Teacher:', teacher.toJSON());
// console.log('Exam Total Score:', exam.getTotalScore());
// console.log('Exam:', exam.toJSON());