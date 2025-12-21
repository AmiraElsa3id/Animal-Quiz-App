
console.log("-------------------------------------")

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

