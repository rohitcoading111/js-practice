const form = document.getElementById("loginForm");
const email = document.getElementById("email");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (email.value.trim() === "") {
        alert("Please enter your email.");
        return;
    }

    alert("Sign In Successful!");
});