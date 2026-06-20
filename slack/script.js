const featuresBtn = document.getElementById("featuresBtn");
const solutionsBtn = document.getElementById("solutionsBtn");
const resourcesBtn = document.getElementById("resourcesBtn");

const featuresMenu = document.getElementById("featuresMenu");
const solutionsMenu = document.getElementById("solutionsMenu");
const resourcesMenu = document.getElementById("resourcesMenu");

function closeAllMenus() {
  featuresMenu.classList.remove("show");
  solutionsMenu.classList.remove("show");
  resourcesMenu.classList.remove("show");
}

featuresBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeAllMenus();
  featuresMenu.classList.toggle("show");
});

solutionsBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeAllMenus();
  solutionsMenu.classList.toggle("show");
});

resourcesBtn.addEventListener("click", (e) => {
  e.preventDefault();
  closeAllMenus();
  resourcesMenu.classList.toggle("show");
});

const questions = document.querySelectorAll(".faq-question");

questions.forEach((question) => {
  question.addEventListener("click", () => {
    const item = question.parentElement;
    item.classList.toggle("active");
  });
});