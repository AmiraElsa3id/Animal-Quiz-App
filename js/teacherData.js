import { validateLoggedInUser} from './validation.js';

// ==================== AUTHENTICATION ====================
let teacher;
function initializeUser() {
    const validation = validateLoggedInUser();
    
    if (!validation.isValid) {
        console.log(validation.error);
        window.location.href = "/";
        return null;
    }
    
    console.log("User is logged in:", validation.user);
    teacher=validation.user;
    return validation.user;
}

function updateTeacherUI() {
    if (!teacher) return;
    
    document.getElementById('teacherName').textContent = teacher.username || 'Unknown Teacher';
    document.getElementById('teacherCourse').textContent = teacher.course || 'No Course Assigned';
    
    const teacherImage = document.getElementById('teacherImage');
    if (teacherImage) {
        teacherImage.src = teacher.profilePicture || '../assets/image/avatar.webp';
    }
}

initializeUser();
updateTeacherUI();