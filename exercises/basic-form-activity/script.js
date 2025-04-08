// Select the form by its ID and add an event listener for the submit event
document.getElementById('signup-form').addEventListener('submit', function (e) {
    // Prevent the default form submission behavior (which would reload the page)
    e.preventDefault();

    // Get references to all input fields
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const phoneNumber = document.getElementById('phone-number')
    const confirmPassword = document.getElementById('confirm-password');

    // Clear any previous error messages before running validation again
    clearErrors();

    // Variable to track if all fields are valid
    let isValid = true;

    // === Full Name Validation ===
    // The full name should contain at least two words (first and last name)
    if (fullName.value.trim().split(' ').length < 2) {
        showError('name-error', 'Please enter your full name (first and last).');
        isValid = false; // Mark the form as invalid
    }

    // === Email Validation ===
    // Regular expression (regex) to check for a valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) { // If the email doesn't match the pattern
        showError('email-error', 'Please enter a valid email address.');
        isValid = false;
    }

    // === Password Validation ===
    // Regular expression for password:
    // - At least 8 characters long
    // - Contains at least one uppercase letter
    // - Contains at least one number
    // - Contains at least one special character (@$!%*?&)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (!passwordRegex.test(password.value)) {
        showError(
            'password-error',
            'Password must be at least 12 characters long and include an uppercase letter, a number, and a special character.'
        );
        isValid = false;
    }

    // === Confirm Password Validation ===
    // Ensure the "Confirm Password" field matches the "Password" field
    if (password.value !== confirmPassword.value) {
        showError('confirm-password-error', 'Passwords do not match.');
        isValid = false;
    }

    // === Phone Number Validation ===
    const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;
    if (!phoneRegex.test(phoneNumber.value)) {
        showError(
            'phone-number-error',
            'Please enter a valid phone number.'
        );
        document.getElementById(phoneNumber).style.backgroundColor = 'red';
        isValid = false;
    }

    // === Form Submission ===
    // If all fields pass validation, show a success message
    if (isValid) {
        alert('Form submitted successfully!');
        
        // Optionally, reset the form fields after submission
        this.reset();
    }
});

/**
 * Function to display an error message for a specific input field
 * @param {string} elementId - The ID of the error message container
 * @param {string} message - The error message to display
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId); // Get the error message element
    errorElement.textContent = message; // Set the error message
    errorElement.style.display = 'block'; // Make the error message visible
}

/**
 * Function to clear all error messages before revalidating the form
 */
function clearErrors() {
    document.querySelectorAll('.error-message').forEach(errorElement => {
        errorElement.style.display = 'none'; // Hide error messages
        errorElement.textContent = ''; // Clear text content
    });
}