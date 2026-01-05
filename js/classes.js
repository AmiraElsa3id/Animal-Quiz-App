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
    profilePicture = './assets/image/avatar.webp',
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


      completeExam(examId, name, score, timeOfFinshed) {
      const readableDate = new Date().toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });

      this.completedExams.push(
        new CompletedExam(examId, name, score, timeOfFinshed, readableDate)
      );

      this.assignedExams = this.assignedExams.filter(id => id != examId);
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

static fromJSON(obj) {
      return new Question(
        obj.id,
        obj.text,
        obj.image,
        obj.choices,
        obj.correctAnswer ,
        obj.difficulty,
        obj.score
      );
    }


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
calculateQuestionScores(totalExamScore = 100) {
  const difficultyWeight = {
    Easy: 1,
    Medium: 2,
    Hard: 3
  };

  // Fetch all questions from localStorage
  const storedQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
  
  // Get only the questions that belong to this exam
  const examQuestions = storedQuestions.filter(q => 
    this.questions.includes(q.id)
  );

  // Calculate total weight
  const totalWeight = examQuestions.reduce(
    (sum, q) => sum + difficultyWeight[q.difficulty],
    0
  );

  // Assign score to each question and update in localStorage
  examQuestions.forEach(q => {
    q.score = (difficultyWeight[q.difficulty] / totalWeight) * totalExamScore;
  });

  // Update the questions array in localStorage with new scores
  const updatedQuestions = storedQuestions.map(q => {
    const updatedQuestion = examQuestions.find(eq => eq.id === q.id);
    return updatedQuestion || q;
  });
  
  localStorage.setItem('questions', JSON.stringify(updatedQuestions));
}

}

// Answer class
class Answer {
  constructor(questionId,studentId, examId, selectedAnswer, isCorrect, timeSpent) {
    this.questionId = questionId;
    this.studentId = studentId;
    this.examId = examId;
    this.selectedAnswer = selectedAnswer;
    this.isCorrect = isCorrect;
    this.timeSpent = timeSpent;
  }

  toJSON() {
    return {
      questionId: this.questionId,
      studentId: this.studentId,
      examId: this.examId,
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


}

export {Student,Teacher,Question, Exam,Answer}
