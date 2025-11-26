const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const commentInput = document.getElementById("comment");
const charCount = document.getElementById("charCount");
const successMessage = document.getElementById("successMessage");

// Character counter for comment
commentInput.addEventListener("input", function () {
  const count = this.value.length;
  charCount.textContent = count;

  if (count > 450) {
    charCount.style.color = "#ff6b35";
  } else {
    charCount.style.color = "#666";
  }
});

// Real-time validation
nameInput.addEventListener("blur", function () {
  validateField(this, "nameError", "Please enter your name");
});

emailInput.addEventListener("blur", function () {
  validateEmail(this);
});

commentInput.addEventListener("blur", function () {
  validateField(this, "commentError", "Please enter your message");
});

// Clear error on input
[nameInput, emailInput, commentInput].forEach((input) => {
  input.addEventListener("input", function () {
    this.classList.remove("error");
    const errorId = this.id + "Error";
    document.getElementById(errorId).classList.remove("show");
  });
});

// Form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validate all fields
  let isValid = true;

  if (!validateField(nameInput, "nameError", "Please enter your name")) {
    isValid = false;
  }

  if (!validateEmail(emailInput)) {
    isValid = false;
  }

  if (
    !validateField(commentInput, "commentError", "Please enter your message")
  ) {
    isValid = false;
  }

  if (isValid) {
    // Get form data
    const formData = {
      name: nameInput.value,
      email: emailInput.value,
      comment: commentInput.value,
    };

    // Log form data (in production, this would be sent to a server)
    console.log("Form submitted:", formData);

    // Show success message
    successMessage.classList.add("show");

    // Reset form
    form.reset();
    charCount.textContent = "0";

    // Hide success message after 5 seconds
    setTimeout(() => {
      successMessage.classList.remove("show");
    }, 5000);

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
});

// Validation helper functions
function validateField(input, errorId, errorMessage) {
  const errorElement = document.getElementById(errorId);

  if (input.value.trim() === "") {
    input.classList.add("error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("show");
    return false;
  } else {
    input.classList.remove("error");
    errorElement.classList.remove("show");
    return true;
  }
}

function validateEmail(input) {
  const errorElement = document.getElementById("emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (input.value.trim() === "") {
    input.classList.add("error");
    errorElement.textContent = "Please enter your email address";
    errorElement.classList.add("show");
    return false;
  } else if (!emailRegex.test(input.value)) {
    input.classList.add("error");
    errorElement.textContent = "Please enter a valid email address";
    errorElement.classList.add("show");
    return false;
  } else {
    input.classList.remove("error");
    errorElement.classList.remove("show");
    return true;
  }
}

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 50) {
    header.style.background =
      "linear-gradient(135deg, #1a3a0f 0%, #2d5016 100%)";
  } else {
    header.style.background =
      "linear-gradient(135deg, #2d5016 0%, #4a7c2c 100%)";
  }
});
