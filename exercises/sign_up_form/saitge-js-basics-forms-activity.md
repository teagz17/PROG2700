### In-Class Activity: Programming a Modern Sign-Up Form with Validation and Error Handling

**Objective:**  
Students will build a sign-up form with real-time validation and error handling using HTML, CSS, and JavaScript. They will learn how to create a user-friendly interface and ensure that user input adheres to predefined criteria.

---

### Instructions:

1. **Setup the Environment:**
   - Provide students with starter files containing basic HTML structure and linked CSS and JavaScript files.

2. **Requirements:**
   The form should include:
   - Full Name (at least 2 words).
   - Email (must follow valid email format).
   - Password (minimum 8 characters, including one uppercase letter, one number, and one special character).
   - Confirm Password (must match Password).
   - Submit button.

3. **Tasks:**
   - Add form validation to each input field.
   - Display error messages in real-time for invalid input.
   - Ensure that the form cannot be submitted unless all inputs are valid.

---

### Sample Code

#### Starter HTML
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sign-Up Form</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="form-container">
        <h1>Sign Up</h1>
        <form id="signup-form">
            <div>
                <label for="full-name">Full Name:</label>
                <input type="text" id="full-name" placeholder="John Doe">
                <small class="error-message" id="name-error"></small>
            </div>
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="example@mail.com">
                <small class="error-message" id="email-error"></small>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password">
                <small class="error-message" id="password-error"></small>
            </div>
            <div>
                <label for="confirm-password">Confirm Password:</label>
                <input type="password" id="confirm-password">
                <small class="error-message" id="confirm-password-error"></small>
            </div>
            <button type="submit">Sign Up</button>
        </form>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

---

#### Starter CSS (styles.css)
```css
body {
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: #f4f4f9;
}

.form-container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 300px;
}

h1 {
    text-align: center;
    color: #333;
}

form div {
    margin-bottom: 15px;
}

label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    width: 100%;
    padding: 8px;
    margin: 0;
    border: 1px solid #ccc;
    border-radius: 5px;
}

input:focus {
    outline: none;
    border-color: #007bff;
}

.error-message {
    color: red;
    font-size: 0.8em;
    display: none;
}

button {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
```

Here's the **JavaScript** code with **detailed comments** to help students understand each step of the validation and error handling process.  

---

### **JavaScript with Detailed Comments (script.js)**
```javascript
// Select the form by its ID and add an event listener for the submit event
document.getElementById('signup-form').addEventListener('submit', function (e) {
    // Prevent the default form submission behavior (which would reload the page)
    e.preventDefault();

    // Get references to all input fields
    const fullName = document.getElementById('full-name');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
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
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password.value)) {
        showError(
            'password-error',
            'Password must be at least 8 characters long and include an uppercase letter, a number, and a special character.'
        );
        isValid = false;
    }

    // === Confirm Password Validation ===
    // Ensure the "Confirm Password" field matches the "Password" field
    if (password.value !== confirmPassword.value) {
        showError('confirm-password-error', 'Passwords do not match.');
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
```

---

### **Detailed Breakdown of the Code:**
1. **Listening for Form Submission (`submit` event)**
   - `e.preventDefault();` prevents the default behavior of the form submission (reloading the page).
   - Retrieves all input fields using `document.getElementById()`.

2. **Validation Rules Implemented:**
   - **Full Name:** Must contain at least two words (space-separated).
   - **Email:** Uses regex to check if it follows a valid email format.
   - **Password:** 
     - Must be at least 8 characters long.
     - Must contain at least one uppercase letter.
     - Must contain at least one number.
     - Must contain at least one special character.
   - **Confirm Password:** Checks if it matches the original password.

3. **Error Handling:**
   - `showError(elementId, message)` is used to display error messages dynamically.
   - `clearErrors()` is called at the beginning of validation to remove previous errors.

4. **Successful Submission:**
   - If all validation checks pass, an alert message is shown (`alert('Form submitted successfully!');`).
   - The form fields are reset using `this.reset();`.

---

### **Tasks:**
1. **Modify Validation Rules**
   - Add validation for phone numbers or usernames.
   - Enforce stricter password policies.

2. **Improve Error Messages**
   - Change colors dynamically when an input is invalid.
   - Show inline validation as users type.

3. **Add Backend Validation**
   - Reflect on the possible implementation of server-side validation using a backend language (e.g., Python, Django).

---

**Deliverables:**  
Students must submit their working form (zip up all code files) with validation by the end of day.