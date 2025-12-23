
// ============================================
// SIGNUP VALIDATIONS
// ============================================

function validateSignupUsername(username,users) {
  if (!username || username.trim() === '') {
    return { isValid: false, error: 'Username is required' };
  }
  if (typeof username !== 'string') {
    return { isValid: false, error: 'Username must be a string' };
  }
  if (username.length < 3) {
    return { isValid: false, error: 'Username must be at least 3 characters long' };
  }
  if (username.length > 50) {
    return { isValid: false, error: 'Username must not exceed 50 characters' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { isValid: false, error: 'Username can only contain letters, numbers, and underscores' };
  }
  if(isExist(username,users)){
    return { isValid: false, error: 'Username already exists' };
  }
  return { isValid: true };
}

function isExist(user, users) {
  console.log(user);
  console.log(users);
  
  let exist = users.find((u) => {
    console.log("Checking user:", u.username);
    return u.username === user;
  });
  
  console.log("Checking if user exists:", user, "Found:", exist);
  
  return !!exist; // or: return exist !== undefined
}


function validateSignupPassword(password) {
  if (!password || password.trim() === '') {
    return { isValid: false, error: 'Password is required' };
  }
  if (typeof password !== 'string') {
    return { isValid: false, error: 'Password must be a string' };
  }
  if (password.length < 6) {
    return { isValid: false, error: 'Password must be at least 6 characters long' };
  }
  if (password.length > 100) {
    return { isValid: false, error: 'Password must not exceed 100 characters' };
  }
  // Check for at least one letter and one number for better security
  if (!/(?=.*[a-zA-Z])(?=.*[0-9])/.test(password)) {
    return { isValid: false, error: 'Password must contain at least one letter and one number' };
  }
  return { isValid: true };
}

function validateSignupMobile(mobile) {
  if (!mobile || mobile.trim() === '') {
    return { isValid: false, error: 'Mobile number is required' };
  }
  if (typeof mobile !== 'string') {
    return { isValid: false, error: 'Mobile number must be a string' };
  }
  // Remove any spaces or special characters
  const cleanMobile = mobile.replace(/[\s\-\(\)]/g, '');
  
  if (!/^\d{11}$/.test(cleanMobile)) {
    return { isValid: false, error: 'Mobile number must be exactly 11 digits' };
  }
  return { isValid: true, value: cleanMobile };
}

function validateSignupGrade(grade) {
  if (grade === null || grade === undefined || grade === '') {
    return { isValid: false, error: 'Grade is required' };
  }
  
  const gradeNum = typeof grade === 'string' ? parseInt(grade, 10) : grade;
  
  if (isNaN(gradeNum) || !Number.isInteger(gradeNum)) {
    return { isValid: false, error: 'Grade must be a valid number' };
  }
  if (gradeNum < 1 || gradeNum > 12) {
    return { isValid: false, error: 'Grade must be between 1 and 12' };
  }
  return { isValid: true, value: gradeNum };
}

function validateSignupProfilePicture(profilePicture) {
  // Profile picture is optional during signup
  if (!profilePicture || profilePicture === '') {
    return { isValid: true, value: '' };
  }
  
  if (typeof profilePicture !== 'string') {
    return { isValid: false, error: 'Profile picture must be a string' };
  }
  
  // Check if it's a valid base64 image
  if (!profilePicture.startsWith('data:image/')) {
    return { isValid: false, error: 'Profile picture must be a valid image file' };
  }
  
  // Check file size (limit to 2MB in base64)
  const sizeInBytes = (profilePicture.length * 3) / 4;
  const sizeInMB = sizeInBytes / (1024 * 1024);
  
  if (sizeInMB > 2) {
    return { isValid: false, error: 'Profile picture must be less than 2MB' };
  }
  
  return { isValid: true };
}

// Complete signup validation
function validateSignupForm(formData,users) {
  const errors = {};
  
  const usernameValidation = validateSignupUsername(formData.username,users);
  if (!usernameValidation.isValid) {
    errors.username = usernameValidation.error;
  }
  
  const passwordValidation = validateSignupPassword(formData.password);
  if (!passwordValidation.isValid) {
    errors.password = passwordValidation.error;
  }
  
  const mobileValidation = validateSignupMobile(formData.mobile);
  if (!mobileValidation.isValid) {
    errors.mobile = mobileValidation.error;
  }
  
  const gradeValidation = validateSignupGrade(formData.grade);
  if (!gradeValidation.isValid) {
    errors.grade = gradeValidation.error;
  }
  
  if (formData.profilePicture) {
    const profilePictureValidation = validateSignupProfilePicture(formData.profilePicture);
    if (!profilePictureValidation.isValid) {
      errors.profilePicture = profilePictureValidation.error;
    }
  }
  
  if (Object.keys(errors).length > 0) {
    return { isValid: false, errors };
  }
  
  return { isValid: true };
}

// ============================================
// Validate loggedin user (check if already logged in)
// ============================================

function validateLoggedInUser() {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        return { isValid: true, user: JSON.parse(currentUser) };
    }
    return { isValid: false, error: "No user is currently logged in" };
}

// ============================================
// Question VALIDATIONS
// ============================================

function validateQuestion(question){
    const errors = {};
    let isValid = true;
    if (question.text.length == 0 || question.text.trim() === '') {
        errors.question = 'Question is required';
        isValid = false;

    }
    if(!question.correctAnswer){
        errors.correctAnswer = 'Correct answer is required';
        isValid = false;
    }
    if(!question.difficulty){
        errors.difficulty = 'Difficulty is required';
        isValid = false;
    }
    if(!question.choices[0].length || !question.choices[1].length || !question.choices[2].length || !question.choices[3].length){
        errors.choices = 'Choices are required';
        isValid = false;
    }
    return { isValid,errors };
}

// ============================================
// exam VALIDATIONS
// ============================================

function validateExam(exam, questions) {
    const errors = {};
    let isValid = true;

    // Validate name
    if (!exam.name || exam.name.trim() === '') {
        errors.name = 'Name is required';
        isValid = false;
    }

    // Validate duration exists
    if (!exam.duration) {
        errors.duration = 'Duration is required';
        isValid = false;
    } else {
        // Validate duration range (only if duration exists)
        if (exam.duration < 15) {
            errors.duration = 'Duration must be at least 15 minutes';
            isValid = false;
        } else if (exam.duration > 60) {
            errors.duration = 'Duration must be at most 60 minutes';
            isValid = false;
        }
    }
    

    // Validate question count
    if (exam.questionsNum < 2) {
        errors.questions = 'Exam must have at least 2 questions';
        isValid = false;
    } else if (questions != exam.questionsNum) {
        errors.questions = 'Number of questions must match the number of questions in the exam';
        isValid = false;
    }

    return { isValid, errors };
}


export {
  validateSignupUsername,
  validateSignupPassword,
  validateSignupMobile,
  validateSignupGrade,
  validateSignupProfilePicture,
  validateSignupForm,
  validateLoggedInUser,
  validateQuestion,
  validateExam,
  
};
