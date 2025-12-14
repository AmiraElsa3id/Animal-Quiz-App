// const validateUsername =(value , message=null ,regex=/^[a-zA-Z][a-zA-Z0-9_]{2,15}$/) => {
//     // Regex: Start with a letter, followed by 2-15 chars (letters, numbers, or underscores)
//     // Total length will be 3 to 16 characters
//     let errors={};
    
//     if (usernameRegex.test(username)) {
//         // Valid username
//         usernameError.textContent = '';
//         return true;
//     } else {
//         // Invalid username
//         usernameError.textContent = 'Invalid: 3-16 chars, must start with a letter, only letters, numbers, or underscores allowed.';
//         return false;
//     }
// }

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

// function isExist(user,users){
// let exist=users.find((u)=>{
//   console.log("Checking user:", u.username);
  
//   return u.username===user});
// console.log("Checking if user exists:", user, "Found:", );
// console.log(exist);



// if(exist){
//     return true;
// }
// return false;
// }
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
// LOGIN VALIDATIONS
// ============================================

// function validateLoginUsername(username) {
//   if (!username || username.trim() === '') {
//     return { isValid: false, error: 'Username or Email is required' };
//   }
//   if (typeof username !== 'string') {
//     return { isValid: false, error: 'Username or Email must be a string' };
//   }
//   if (username.length < 3) {
//     return { isValid: false, error: 'Username or Email must be at least 3 characters long' };
//   }
//   return { isValid: true };
// }

// function validateLoginPassword(password) {
//   if (!password || password.trim() === '') {
//     return { isValid: false, error: 'Password is required' };
//   }
//   if (typeof password !== 'string') {
//     return { isValid: false, error: 'Password must be a string' };
//   }
//   if (password.length < 6) {
//     return { isValid: false, error: 'Password must be at least 6 characters long' };
//   }
//   return { isValid: true };
// }

// function validateLoginRole(role) {
//   const validRoles = ['student', 'teacher'];
//   if (!role) {
//     return { isValid: false, error: 'Please select Student or Teacher' };
//   }
//   if (!validRoles.includes(role.toLowerCase())) {
//     return { isValid: false, error: 'Role must be either Student or Teacher' };
//   }
//   return { isValid: true };
// }

// Complete login validation
// function validateLoginForm(formData) {
//   const errors = {};
  
//   const usernameValidation = validateLoginUsername(formData.username);
//   if (!usernameValidation.isValid) {
//     errors.username = usernameValidation.error;
//   }
  
//   const passwordValidation = validateLoginPassword(formData.password);
//   if (!passwordValidation.isValid) {
//     errors.password = passwordValidation.error;
//   }
  
//   const roleValidation = validateLoginRole(formData.role);
//   if (!roleValidation.isValid) {
//     errors.role = roleValidation.error;
//   }
  
//   if (Object.keys(errors).length > 0) {
//     return { isValid: false, errors };
//   }
  
//   return { isValid: true };
// }

// ============================================
// HELPER FUNCTIONS
// ============================================

// Real-time validation for input fields
// function validateFieldOnChange(fieldName, value, formType = 'signup') {
//   if (formType === 'signup') {
//     switch(fieldName) {
//       case 'username':
//         return validateSignupUsername(value);
//       case 'password':
//         return validateSignupPassword(value);
//       case 'mobile':
//         return validateSignupMobile(value);
//       case 'grade':
//         return validateSignupGrade(value);
//       case 'profilePicture':
//         return validateSignupProfilePicture(value);
//       default:
//         return { isValid: true };
//     }
//   } else if (formType === 'login') {
//     switch(fieldName) {
//       case 'username':
//         return validateLoginUsername(value);
//       case 'password':
//         return validateLoginPassword(value);
//       case 'role':
//         return validateLoginRole(value);
//       default:
//         return { isValid: true };
//     }
//   }
// }

// Sanitize input to prevent XSS
// function sanitizeInput(input) {
//   if (typeof input !== 'string') return input;
  
//   return input
//     .trim()
//     .replace(/[<>]/g, '') // Remove < and > to prevent script injection
//     .slice(0, 1000); // Limit length
// }

// ============================================
// EXPORT FOR USE
// ============================================




// ============================================
// USAGE EXAMPLES
// ============================================

/*
// Example 1: Validate entire signup form
const signupData = {
  username: 'john_doe',
  password: 'secure123',
  mobile: '01234567890',
  grade: 2,
  profilePicture: 'data:image/jpeg;base64,...'
};

const signupResult = validateSignupForm(signupData);
if (!signupResult.isValid) {
  console.log('Signup errors:', signupResult.errors);
  // Output: { username: 'error message', password: 'error message', ... }
}

// Example 2: Validate entire login form
const loginData = {
  username: 'john_doe',
  password: 'secure123',
  role: 'student'
};

const loginResult = validateLoginForm(loginData);
if (!loginResult.isValid) {
  console.log('Login errors:', loginResult.errors);
}

// Example 3: Real-time validation on input change
const usernameValidation = validateFieldOnChange('username', 'jo', 'signup');
if (!usernameValidation.isValid) {
  console.log(usernameValidation.error);
  // Output: 'Username must be at least 3 characters long'
}

// Example 4: Validate individual field
const passwordCheck = validateSignupPassword('123');
if (!passwordCheck.isValid) {
  console.log(passwordCheck.error);
  // Output: 'Password must be at least 6 characters long'
}
*/

export {
  validateSignupUsername,
  validateSignupPassword,
  validateSignupMobile,
  validateSignupGrade,
  validateSignupProfilePicture,
  validateSignupForm,
  validateLoggedInUser
  
};
