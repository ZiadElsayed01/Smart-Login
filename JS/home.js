var logOutBtn = document.querySelector(".logOutBtn");
logOutBtn.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "index.html";
});

var homeHeading = document.querySelector(".home-heading");
var currentUser = JSON.parse(localStorage.getItem("currentUser"));
homeHeading.innerHTML = `" ${currentUser} "`;
