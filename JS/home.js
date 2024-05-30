var logOutBtn = document.querySelector(".logOutBtn");
logOutBtn.addEventListener("click", function (event) {
  event.preventDefault();
  window.location.href = "index.html";
});

var homeHeading = document.querySelector(".home-heading");
var userName = JSON.parse(localStorage.getItem("Users"));
console.log(userName);
for (var i = 0; i < userName.length; i++) {
  homeHeading.innerHTML = `Hello ${userName[i].name}`;
}
