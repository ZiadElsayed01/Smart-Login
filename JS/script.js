// Index Page
// Forms :
var logIn = document.querySelector(".login");
var signUp = document.querySelector(".signup");
var logInLink = document.querySelector(".login-link");
var signUpLink = document.querySelector(".signup-link");

// Inputs :
var signUpNameInput = document.querySelector("#signup-name-input");
var signUpEmailInput = document.querySelector("#signup-email-input");
var signUpPassInput = document.querySelector("#signup-pass-input");

var logInEmailInput = document.querySelector("#login-email-input");
var logInPassInput = document.querySelector("#login-pass-input");

var logInError = document.querySelector(".login-error");
var signUpError = document.querySelector(".signup-error");

// Buttons :
var logInButton = document.querySelector(".logInButton");
var signUpButton = document.querySelector(".signUpButton");

function showLogin() {
  logIn.classList.remove("d-none");
  logIn.classList.add("d-block");
  signUp.classList.remove("d-block");
  signUp.classList.add("d-none");
}
logInLink.addEventListener("click", function (event) {
  event.preventDefault();
  showLogin();
  signUpError.innerHTML = "";
  signUpNameInput.classList.remove("is-invalid", "is-valid");
  signUpEmailInput.classList.remove("is-invalid", "is-valid");
  signUpPassInput.classList.remove("is-invalid", "is-valid");
});

function showSignup() {
  logIn.classList.remove("d-block");
  logIn.classList.add("d-none");
  signUp.classList.remove("d-none");
  signUp.classList.add("d-block");
}
signUpLink.addEventListener("click", function (event) {
  event.preventDefault();
  showSignup();
  logInError.innerHTML = "";
  logInEmailInput.classList.remove("is-invalid", "is-valid");
  logInPassInput.classList.remove("is-invalid", "is-valid");
});

signUpButton.addEventListener("click", function () {
  signUpValidation();
});
logInButton.addEventListener("click", function () {
  logInValidation();
});

var userArr;
if (localStorage.getItem("Users") == null) {
  userArr = [];
} else {
  userArr = JSON.parse(localStorage.getItem("Users"));
}

function logInValidation() {
  logInEmailInput.classList.remove("is-invalid", "is-valid");
  logInPassInput.classList.remove("is-invalid", "is-valid");
  logInError.innerHTML = "";

  if (logInEmailInput.value == "" || logInPassInput.value == "") {
    logInError.innerHTML = "All Inputs Required";
    logInEmailInput.classList.add("is-invalid");
    logInPassInput.classList.add("is-invalid");
  }

  var validUser = false;
  for (var i = 0; i < userArr.length; i++) {
    if (
      userArr[i].email.toLowerCase() == logInEmailInput.value.toLowerCase() &&
      userArr[i].pass == logInPassInput.value
    ) {
      localStorage.setItem("currentUser", JSON.stringify(userArr[i].name));
      logInEmailInput.classList.add("is-valid");
      logInPassInput.classList.add("is-valid");
      window.location.href = "home.html";
      validUser = true;
      break;
    }
  }

  if (!validUser) {
    logInError.innerHTML = "Invalid Email or Password";
    logInEmailInput.classList.add("is-invalid");
    logInPassInput.classList.add("is-invalid");
  }
}

function signUpValidation() {
  signUpNameInput.classList.remove("is-invalid", "is-valid");
  signUpEmailInput.classList.remove("is-invalid", "is-valid");
  signUpPassInput.classList.remove("is-invalid", "is-valid");
  signUpError.innerHTML = "";

  var error = false;
  if (
    signUpNameInput.value == "" ||
    signUpEmailInput.value == "" ||
    signUpPassInput.value == ""
  ) {
    signUpError.innerHTML = "All Inputs Required";
    signUpNameInput.classList.add("is-invalid");
    signUpEmailInput.classList.add("is-invalid");
    signUpPassInput.classList.add("is-invalid");
    error = true;
  }

  for (var i = 0; i < userArr.length; i++) {
    if (
      userArr[i].email.toLowerCase() == signUpEmailInput.value.toLowerCase()
    ) {
      signUpError.innerHTML = "Email Already Exist";
      signUpEmailInput.classList.add("is-invalid");
      error = true;
      break;
    }
  }

  if (!error) {
    addUser();
  }
}

function addUser() {
  var users = {
    name: signUpNameInput.value,
    email: signUpEmailInput.value,
    pass: signUpPassInput.value,
  };
  userArr.push(users);
  localStorage.setItem("Users", JSON.stringify(userArr));
  signUpError.classList.remove("text-danger");
  signUpError.classList.add("text-success");
  signUpError.innerHTML = "Success";
  clear();
  setTimeout(function () {
    location.reload();
  }, 1000);
}

function clear() {
  signUpNameInput.value = "";
  signUpEmailInput.value = "";
  signUpPassInput.value = "";
}
