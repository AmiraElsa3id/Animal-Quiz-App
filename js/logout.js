let logOutBtn=document.getElementById("logOutBtn");
function logOut(){
    localStorage.removeItem("currentUser");
    window.location.href="/";
}
logOutBtn.addEventListener("click",logOut);