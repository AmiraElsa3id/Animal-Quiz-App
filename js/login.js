
console.log("-------------------------------------")

import { studentsApi, teachersApi } from './api.js';

let students = [];
let teachers = [];
let usersLoaded = false;

// Load data from API
async function loadUsers() {
    try {
        students = await studentsApi.getAll();
        teachers = await teachersApi.getAll();
        console.log('Loaded users from API:', { students, teachers });
    } catch (error) {
        console.error('Failed to load users from API:', error);
        // Fallback to empty arrays if API fails
        students = [];
        teachers = [];
    }
    usersLoaded = true;
}

// Load users when the script starts
loadUsers();


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

loginSubmitBtn.addEventListener("click", async function()
{
    // Wait for users to be loaded (up to 5 seconds)
    const startTime = Date.now();
    while (!usersLoaded && (Date.now() - startTime) < 5000) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }

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
            window.location.href = "./pages/teacher-dashboard.html";
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

