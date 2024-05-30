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
});
signUpButton.addEventListener("click", function (event) {
  event.preventDefault();
  signUpValidation();
});
logInButton.addEventListener("click", function (event) {
  event.preventDefault();
  logInValidation();
});

var userArr;
if (localStorage.getItem("Users") == null) {
  userArr = [];
} else {
  userArr = JSON.parse(localStorage.getItem("Users"));
}

function logInValidation() {
  if (logInEmailInput.value == "" || logInPassInput.value == "") {
    logInError.innerHTML = "All Inputs Required";
    logInEmailInput.classList.add("is-invalid");
    logInPassInput.classList.add("is-invalid");
  } else {
    for (var i = 0; i < userArr.length; i++) {
      if (
        userArr[i].email.toLowerCase() == logInEmailInput.value.toLowerCase() &&
        userArr[i].pass == logInPassInput.value
      ) {
        window.location.href = "home.html";
        logInEmailInput.classList.add("is-valid");
        logInPassInput.classList.add("is-valid");
      }
    }
    logInError.innerHTML = "Invalid Email or Password";
  }
}

function signUpValidation() {
  if (
    signUpNameInput.value == "" ||
    signUpEmailInput.value == "" ||
    signUpPassInput.value == ""
  ) {
    signUpError.innerHTML = "All Inputs Required";
    return;
  } else {
    for (var i = 0; i < userArr.length; i++) {
      if (
        userArr[i].email.toLowerCase() == signUpEmailInput.value.toLowerCase()
      ) {
        signUpError.innerHTML = "Email Already Exist";
        return;
      }
    }
  }
  addUser();
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
}

function clear() {
  signUpNameInput.value = "";
  signUpEmailInput.value = "";
  signUpPassInput.value = "";
}
