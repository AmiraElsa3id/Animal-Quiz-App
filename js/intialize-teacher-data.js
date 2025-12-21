// Initialize teachers on first load
function initializeTeachersData() {
  if (!localStorage.getItem('teachers')) {
    const teachersData = [
      {
        "id": "t1",
        "username": "sarah_johnson",
        "password": "teacher123",
        "role": "teacher",
        "course": "Animal Expert",
        "profilePicture": "https://randomuser.me/api/portraits/women/44.jpg",
        "darkMode": false
      },
      {
        "id": "t2",
        "username": "michael_brown",
        "password": "teacher456",
        "role": "teacher",
        "course": "Planets Expert",
        "profilePicture": "https://randomuser.me/api/portraits/men/32.jpg",
        "darkMode": true
      },
      {
        "id": "t3",
        "username": "emily_davis",
        "password": "teacher789",
        "role": "teacher",
        "course": "Plants Expert",
        "profilePicture": "https://randomuser.me/api/portraits/women/68.jpg",
        "darkMode": false
      },
      {
        "id": "t4",
        "username": "david_wilson",
        "password": "teacher321",
        "role": "teacher",
        "course": "Dog Breeds Expert",
        "profilePicture": "https://randomuser.me/api/portraits/men/52.jpg",
        "darkMode": true
      }
    ];
    
    localStorage.setItem('teachers', JSON.stringify(teachersData));
    console.log('Teachers data initialized!');
  }
}

function initializeStudentsData() {
  if (!localStorage.getItem("students")) {
    const studentsData = [
      {
        id: "std1ID",
        username: "alice",
        password: "alice123",
        role: "student",
        grade: "2",
        mobile: "01011112222",
        profilePicture: "https://randomuser.me/api/portraits/women/12.jpg",
        completedExams: [
          {
            examId: "e1",
            name: "exam1",
            score: 8,
            timeOfFinshed: "12 : 30",
            date: "2025-12-01T10:00:00.000Z",
          }
        ],
        assignedExams: [],
      },
      {
        id: "std2ID",
        username: "mohamed",
        password: "mohamed123",
        role: "student",
        grade: "3",
        mobile: "01033334444",
        profilePicture: "https://randomuser.me/api/portraits/men/15.jpg",
        completedExams: [
          {
            examId: "e1",
            name: "exam1",
            score: 5,
            timeOfFinshed: "20 : 10",
            date: "2025-12-03T12:30:00.000Z",
          },
          {
            examId: "e2",
            name: "exam2",
            score: 9,
            timeOfFinshed: "09 : 45",
            date: "2025-12-05T09:15:00.000Z",
          },
        ],
        assignedExams: ["e1"],
      },
      {
        id: "std3ID",
        username: "sara",
        password: "sara123",
        role: "student",
        grade: "1",
        mobile: "01155556666",
        profilePicture: "https://randomuser.me/api/portraits/women/22.jpg",
        completedExams: [],
        assignedExams: ["e1"],
      },
    ];

    localStorage.setItem("students", JSON.stringify(studentsData));
    console.log("Students data initialized!");
  }
}

function initializeExamsData(){
    if (!localStorage.getItem('exams')) {
    const examsData =  [
        {"id": "e1",
        "name":"exam1",
        "duration":45,
        "teacherId":"t1",
        "course":"Animal Expert",
        "createdAt": "2025-12-10T14:30:00.000Z",
        "assignedStudents":["std1ID","std2ID"],
        "questions":["Q1Id","Q2Id"]

        },

        {"id": "e1",
        "name":"exam1",
        "duration":45,
        "teacherId":"t1",
        "course":"Animal Expert",
        "createdAt": "2025-12-10T14:30:00.000Z",
        "assignedStudents":["std1ID","std2ID"],
        "questions":["Q1Id","Q2Id"]

        }
    ]
    
    localStorage.setItem('exams', JSON.stringify(examsData));
    console.log('exams data initialized!');
  }
}

function initializeQuestionsData(){
    if (!localStorage.getItem('questions')) {
    const questionsData = [
        {
            "id":"q1",
            "text":"question text ",
            "image":"",
            "choices":["choice1","choice2","choice3","choice4"],
            "correctAnswer":"choice1",
            "difficulty":"easy",
            "score":5
        }

    ]
    
    localStorage.setItem('questions', JSON.stringify(questionsData));
    console.log('questions data initialized!');
  }
}
// Run on page load
initializeTeachersData();
initializeStudentsData();