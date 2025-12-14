import { validateLoggedInUser } from './validation.js';

const validation = validateLoggedInUser();
if (!validation.isValid) {
    console.log(validation.error);
    // User is not logged in, redirect to login page
    window.location.href = "/";
} else {
    console.log("User is logged in:", validation.user);
    // Proceed with dashboard logic
}
