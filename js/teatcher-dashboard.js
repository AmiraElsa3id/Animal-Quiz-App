import { validateLoggedInUser } from './validation.js';
let teacher ;
const validation = validateLoggedInUser();
if (!validation.isValid) {
    console.log(validation.error);
    // User is not logged in, redirect to login page
    window.location.href = "/";
} else {
    console.log("User is logged in:", validation.user);
    
    // Store teacher data for later use
     teacher = validation.user;
    console.log("Teacher data:", teacher);
    
    // Proceed with dashboard logic
}

// Update UI with teacher information
if (teacher) {
    document.getElementById('teacherName').textContent = teacher.username || 'Unknown Teacher';
    document.getElementById('teacherCourse').textContent = teacher.course || 'No Course Assigned';
    const teacherImage = document.getElementById('teacherImage');
    if (teacherImage) {
        teacherImage.src = teacher.profilePicture || '../assets/image/avatar.webp';
    }
}


