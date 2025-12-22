import {validateSignupUsername,
  validateSignupPassword,
  validateSignupMobile,
 
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
const liveImage=document.querySelector("#liveImage");
let  passHide = document.querySelector("#hidePass");

passHide.addEventListener("click", function() {
    console.log("Password hide button clicked in signup");
    if (password.type === "password") {
        password.type = "text";
        passHide.textContent = "visibility_off";
    } else {
        password.type = "password";
        passHide.textContent = "visibility";
    }
});

let users;
if(localStorage.getItem("students")){
    users=JSON.parse(localStorage.getItem("students"));
}else{
    users=[];
}
const signup=()=>{
    let userData={
 username: userName.value,
    password: password.value,
    grade: grade.value,
    mobile: stdPhone.value,
    profilePicture: stdImage.files[0]?.name,
        

        // "username": userName.value,
        // "password": password.value,
        // "role": "student",
        // "grade": grade.value,
        // "mobile": stdPhone.value,
        // "profilePicture": stdImage.value,
    }

    if(validateSignupForm(userData,users)?.isValid){
        let user=new Student(
            userData.username,
            userData.password,
            userData.grade,
            userData.mobile,
            userData.profilePicture
        );
        users.push(user)
        localStorage.setItem("students",JSON.stringify(users))
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

stdImage.addEventListener('change',function (){
    console.log(stdImage.files[0]);
    
    let reader=new FileReader()
    let file=stdImage.files[0]
    console.log(file);
    

    liveImage.src="../assets/image/"+file.name
    console.log(liveImage.src);
}
)