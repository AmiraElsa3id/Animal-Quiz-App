// import { Student } from "./classes.js";
// const student_2 = new Student(
//   's1701234567890',
//   'abdelftah_shakl',
//   '12345678',
//   2,
//   '01234567890',
//   './assets/images/avatar.webp',
//   'ocean',
//   [],
//   []
// );
// const studentData = student.toJSON();

// const { use } = require("react");

// console.log(studentData);
console.log("-------------------------------------")
// const teacher = new Teacher(
//   't1',
//   'teacher_animals',
//   'hashed_password',
//   'Animals',
//   false
// );
// const teacherData = teacher.toJSON();
// console.log("-------------------------------------")

// // console.log(teacherData);

//   const students = [];
//   const teachers = [];


// database.students.push(student.toJSON());
// database.students.push(student_2.toJSON());
// database.teachers.push(teacher.toJSON());

// localStorage.setItem("database", JSON.stringify(database));
// const db = JSON.parse(localStorage.getItem("database"));
// console.log("-------------------------------------")

// console.log(db.students);
// console.log(db.teachers);
// function createUser(formData) {
//   const id = Date.now().toString();
//   const { username, password, role } = formData;

//   if (role === "student") {
//     return new Student(
//       id,
//       username,
//       password,
//       formData.grade,
//       formData.mobile
//     ).toJSON();
//   }

//   if (role === "teacher") {
//     return new Teacher(
//       id,
//       username,
//       password,
//       formData.course
//     ).toJSON();
//   }
// }
// const userData = createUser({
//   username: "ali",
//   password: "1234",
//   role: "student",
//   grade: 3,
//   mobile: "01000000000"
// });

// database.students.push(userData);


//-------------------------------

let students;
let teachers;
if(localStorage.getItem("students")){
    students=JSON.parse(localStorage.getItem("students"));
}else{
    students=[];
}

if(localStorage.getItem("teachers")){
    teachers=JSON.parse(localStorage.getItem("teachers"));
}else{
    teachers=[];
}
console.log(students,teachers);


let roles = document.getElementsByName("role");
let loginSubmitBtn = document.querySelector("#loginSubmit");
let userNameInput = document.querySelector("#username");
let userPasswordInput = document.querySelector("#password");
let usernameError= document.getElementById("usernameError");
let  userPasswordError = document.getElementById("passwordError");
let  passHide = document.querySelector("#hidePass");

let selectedRole = null;

function checkSelectedRole() {
    roles.forEach(role => {
        if (role.checked) {
            selectedRole = role.value;
        }
    });
}
// checkSelectedRole();


loginSubmitBtn.addEventListener("click",function()
{

    checkSelectedRole();
    let user =findUser(userNameInput.value)
    usernameError.classList.add("hidden"); 
    userPasswordError.classList.add("hidden");
    if(user==undefined)
    {
        usernameError.classList.remove("hidden"); 
    }
    else{
    checkPassward(user,userPasswordInput.value)
    }
})

function findUser(_userName)
{
    if (selectedRole === "student") {
        console.log("Searching for student:", selectedRole, _userName);
        return students.find(_user => (_user.username == _userName.trim()));
    } else if (selectedRole === "teacher") {
        console.log("Searching for teacher:", selectedRole, _userName);
        return teachers.find(_user => (_user.username == _userName.trim()));
    }
    return undefined;
}
function checkPassward(_user,inputPassword)
{
    if(_user.password==inputPassword.trim())
    {
         localStorage.setItem("currentUser", JSON.stringify(_user));
        if(selectedRole=="student")
        {
            window.location.href = "./pages/profile.html";
        }
        else if (selectedRole=="teacher")
        {
            window.location.href = "./pages/teatcher-dashboard.html";
        }
    }
    else
    {
        userPasswordError.classList.remove("hidden");
    }
}

passHide.addEventListener("click", function() {
    console.log("Password hide button clicked");
    if (userPasswordInput.type === "password") {
        userPasswordInput.type = "text";
        passHide.textContent = "visibility_off";
    } else {
        userPasswordInput.type = "password";
        passHide.textContent = "visibility";
    }
});

// const currentUser = JSON.parse(localStorage.getItem("currentUser"));
// function logout() {
//     localStorage.removeItem("currentUser");
//     window.location.href = "../index.html";
// }

