import {validateSignupUsername,
  validateSignupPassword,
  validateSignupMobile,
  validateSignupGrade,
  validateSignupProfilePicture,
  validateSignupForm,} from "./validation.js";
import {Student} from "./classes.js";

const userName = document.querySelector(`input[placeholder="Pick a Username"]`);
const password = document.querySelector(`input[placeholder="Make it secure"]`);
const form = document.querySelector(`form`);
const stdImage = document.querySelector("#std-img");
const stdPhone = document.querySelector("#phone");
const grade = document.querySelector("input[name='grade']");
const signupBtn = document.querySelector("button[type='submit']");
const userNameError = document.querySelector("#userNameError");
const passwordError = document.querySelector("#passwordError");
const stdPhoneError = document.querySelector("#stdPhoneError");

let users;
if(localStorage.getItem("users")){
    users=JSON.parse(localStorage.getItem("users"));
}else{
    users=[];
}
const signup=()=>{
    let userData={
        "username": userName.value,
        "password": password.value,
        "role": "student",
        "grade": grade.value,
        "mobile": stdPhone.value,
        "profilePicture": stdImage.value,
    }

    if(validateSignupForm(userData,users)?.isValid){
        let user=new Student({...userData})
        users.push(user)
        localStorage.setItem("users",JSON.stringify(users))
        alert("User Added Successfully")
        window.location.href="../index.html"
    }
   

}

form.addEventListener("submit",function(e){
    e.preventDefault()
    signup()
});
userName.addEventListener("input",()=>{
    validateSignupUsername(userName.value,users)
    if(validateSignupUsername(userName.value,users)?.isValid){
        userNameError.innerHTML=""
    }else{
        userNameError.innerHTML=validateSignupUsername(userName.value,users)?.error
    }
});
password.addEventListener("input",()=>{
    validateSignupPassword(password.value)
    if(validateSignupPassword(password.value)?.isValid){
        passwordError.innerHTML=""
    }else{
        passwordError.innerHTML=validateSignupPassword(password.value)?.error
    }
});
stdPhone.addEventListener("input",()=>{
    validateSignupMobile(stdPhone.value)
    if(validateSignupMobile(stdPhone.value)?.isValid){
        stdPhoneError.innerHTML=""
    }else{
        stdPhoneError.innerHTML=validateSignupMobile(stdPhone.value)?.error
    }
});
