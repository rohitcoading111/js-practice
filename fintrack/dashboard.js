let userData = JSON.parse(localStorage.getItem("currentUser"))
let welcome = document.querySelector("#welcomeText")
const logout = document.querySelector(".primary-btn")
const counters = document.querySelectorAll(".counter");
const balanceValue = document.querySelector("#balanceValue");
const incomeValue = document.querySelector("#incomeValue");
const expenseValue = document.querySelector("#expenseValue");
const transactionCount = document.querySelector("#transactionCount");
const dashboard = document.querySelector(".dashboard");
const setting = document.querySelector(".setting");
let profile = document.querySelector(".change")
let secprofile = document.querySelector(".change2")
let editbtn = document.querySelector("#edit-btn")

const dashboardLink = document.querySelector("#dashboardLink");
const settingsLink = document.querySelector("#settingsLink");

const settingsPage = document.querySelector("#settingsPage");
const dashboardPage = document.querySelector("#dashboardPage");
const settingsForm = document.querySelector("#settingsForm");



const saveBtn = document.querySelector(".save-btn");


let users = JSON.parse(localStorage.getItem("users")) || [];
let currentUser = JSON.parse(localStorage.getItem("currentUser"));


welcome.innerHTML =   ` Welcome Back 👋 mr ${ userData.username}`
  profile.innerHTML =  `${ userData.username}`
   secprofile.innerHTML =  `${ userData.username}`
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editingTransaction = null;
function updateDashboard() {

    let income = 0;
    let expense = 0;

    transactions.forEach(item => {

        if (item.type === "income") {

            income += item.amount;

        } else {

            expense += item.amount;

        }

    });

    balanceValue.innerHTML = `₹${(income - expense).toLocaleString()}`;
    incomeValue.innerHTML = `₹${income.toLocaleString()}`;
    expenseValue.innerHTML = `₹${expense.toLocaleString()}`;transactionCount.innerHTML = transactions.length;

}

updateDashboard();


const ctx = document.getElementById("incomeChart");

let incomeChart;

if (ctx) {

    incomeChart = new Chart(ctx, {

        type: "line",

        data: {

            labels: [],

            datasets: [{

                label: "Transactions",

                data: [],

                borderWidth: 4,

                borderColor: "#4F46E5",

                backgroundColor: "rgba(79,70,229,.12)",

                fill: true,

                tension: .45,

                pointRadius: 5,

                pointHoverRadius: 8

            }]

        },

        options: {

            responsive: true,

            plugins: {

                legend: {

                    display: false

                }

            },

            scales: {

                x: {

                    grid: {

                        display: false

                    }

                },

                y: {

                    beginAtZero: true,

                    grid: {

                        color: "#EEF2F7"

                    }

                }

            },

            animation: {

                duration: 1200

            }

        }

    });

}


function updateChart() {

    if (!incomeChart) return;

    const labels = transactions.map(item => item.title);

    const amounts = transactions.map(item => item.amount);

    incomeChart.data.labels = labels;

    incomeChart.data.datasets[0].data = amounts;

    incomeChart.update();

}

updateChart();

const moon = document.querySelector(".ri-moon-line");

let theme = localStorage.getItem("mode");

if (theme === "dark") {
    document.body.classList.add("dark");
    moon.classList.remove("ri-moon-line");
    moon.classList.add("ri-sun-line");
}

moon.parentElement.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    moon.classList.toggle("ri-moon-line");
    moon.classList.toggle("ri-sun-line");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }

});


const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

document.querySelectorAll(".card,.panel").forEach(item=>{

item.style.opacity="0";

item.style.transform="translateY(40px)";

item.style.transition=".8s";

observer.observe(item);

});


document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const size=Math.max(this.clientWidth,this.clientHeight);

const rect=this.getBoundingClientRect();

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";

ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.classList.add("ripple");

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},700);

});

});


document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateX=-(y-rect.height/2)/18;

const rotateY=(x-rect.width/2)/18;

card.style.transform=

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.04)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=

"perspective(1000px) rotateX(0) rotateY(0) scale(1)";

});

});



const glow=document.createElement("div");

glow.className="cursor-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});



document.querySelectorAll(".icon-btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="scale(1.15) rotate(12deg)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

document.querySelectorAll(".menu a").forEach(item=>{
item.addEventListener("click",(e)=>{
e.preventDefault();
document.querySelector(".menu .active")
.classList.remove("active");
item.classList.add("active");

});

});



const transactionType = document.querySelector("#transactionType");
const transactionTitle = document.querySelector("#transactionTitle");
const transactionAmount = document.querySelector("#transactionAmount");
const transactionCategory = document.querySelector("#transactionCategory");
const transactionDate = document.querySelector("#transactionDate");
const paymentMethod = document.querySelector("#paymentMethod");
const transactionNote = document.querySelector("#transactionNote");



const transactionModal = document.querySelector("#transactionModal");

const openModalBtn = document.querySelector("#openTransactionModal");

const closeModalBtn = document.querySelector("#closeModal");

const transactionForm = document.querySelector("#transactionForm");

openModalBtn.addEventListener("click", () => {

    transactionModal.classList.add("active");

});

closeModalBtn.addEventListener("click", () => {

    transactionModal.classList.remove("active");

});

transactionModal.addEventListener("click", (e) => {

    if (e.target === transactionModal) {

        transactionModal.classList.remove("active");

    }

});

document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        transactionModal.classList.remove("active");

    }

});

transactionForm.addEventListener("submit", (e) => {

    e.preventDefault();

    const type = transactionType.value;
    const title = transactionTitle.value.trim();
    const amount = Number(transactionAmount.value);
    const category = transactionCategory.value;
    const date = transactionDate.value;
    const payment = paymentMethod.value;
    const note = transactionNote.value.trim();

    if (
        title === "" ||
        amount <= 0 ||
        category === "" ||
        date === ""
    ) {
        alert("Please fill all required fields");
        return;
    }

    const transactionObject = {

        id: Date.now(),

        type,

        title,

        amount,

        category,

        date,

        payment,

        note

    };
    if(editingTransaction){
     editingTransaction.title = title;
     editingTransaction.amount = amount;
     editingTransaction.category = category;
     editingTransaction.type = type;
     editingTransaction.date = date;
     editingTransaction.payment = payment;
     editingTransaction.note = note;
     editingTransaction = null;
     transactionForm.reset();
     transactionModal.classList.remove("active");
   }
   else{
     transactions.push(transactionObject);
   }

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );

    updateDashboard();
    updateChart();
    renderTransactions();
    transactionForm.reset();
    transactionModal.classList.remove("active");

});

logout.addEventListener("click", ()=> {
    window.location.href = "index.html";
})

const transactionList = document.querySelector("#transactionList");

function renderTransactions() {

    transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        transactionList.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;padding:20px;">
                    No Transactions Found
                </td>
            </tr>
        `;
        return;
    }

    transactions.forEach((item, index) => {

        transactionList.innerHTML += `
            <tr class="transaction-row" style="
                opacity:0;
                transform:translateY(20px);
                transition:all .4s ease;
            ">

                <td>${item.title}</td>
                <td>${item.date}</td>
                <td>${item.category}</td>
                <td>₹${item.amount.toLocaleString()}</td>

                <td>
                    <span class="${item.type}">
                        ${item.type}
                    </span>
                </td>

                <td>
                    <button class="edit-btn" data-id="${item.id}">
                        <i class="ri-edit-line"></i>
                    </button>

                    <button class="delete-btn" data-id="${item.id}">
                        <i class="ri-delete-bin-line"></i>
                    </button>
                </td>

            </tr>
        `;


    const rows = document.querySelectorAll(".transaction-row");

    rows.forEach((row, index) => {
        setTimeout(() => {
            row.style.opacity = "1";
            row.style.transform = "translateY(0)";
        }, index * 100);
    });
});

const deleteButtons = document.querySelectorAll(".delete-btn");
     deleteButtons.forEach(button => {
    button.addEventListener("click", () => {
    const clickedId = Number(button.dataset.id);
    transactions = transactions.filter(item => {
        if(item.id !== clickedId){
            return true;
        }
        return false;
    })
    localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
); 
renderTransactions();
updateDashboard();
updateChart();
    });
    });

const editBtn = document.querySelectorAll(".edit-btn");
editBtn.forEach(button => {
    button.addEventListener("click", () => {
        console.log("clicked");
        const clickedId = Number(button.dataset.id);
        const transaction = transactions.find(item => item.id === clickedId);
        transactionModal.classList.add("active");
        transactionTitle.value = transaction.title;
        transactionType.value = transaction.type;
        transactionAmount.value = transaction.amount;
        transactionCategory.value = transaction.category;
        transactionDate.value = transaction.date;
        transactionType.value = transaction.type;
        transactionTitle.value = transaction.title;
        editingTransaction = transaction;
    })
 })
};


let settingsUser = document.querySelector("#settingsUsername")
let newpass = document.querySelector("#newPassword");
settingsLink.addEventListener("click", (e) => {
    e.preventDefault();
    dashboardPage.style.display = "none";
    settingsPage.style.display = "block";

    dashboardLink.classList.remove("active");
    settingsLink.classList.add("active");
})

settingsForm.addEventListener("submit",(e)=> {
   e.preventDefault();
   let settingUsers = settingsUser.value.trim();
   let settingpass = newpass.value.trim();

   if(settingUsers === "" || settingpass === "" ){
    alert("please fill al empty fields")
    return;
   }

   const user = users.find(user=> user.id === userData.id)

   user.username = settingUsers;
   user.password = settingpass;

   localStorage.setItem("users",JSON.stringify(users))

   userData.username = settingUsers;
   userData.password = settingpass;

   localStorage.setItem("currentUser",JSON.stringify(userData))
   welcome.innerHTML =  ` Welcome Back 👋 mr ${ userData.username}`
   profile.innerHTML =  `${ userData.username}`
   secprofile.innerHTML =  `${ userData.username}`

  console.log("clicked");
  settingsPage.style.display = "none";
  dashboardPage.style.display = "grid";
  settingsLink.classList.remove("active");
  dashboardLink.classList.add("active");
})
 
editbtn.addEventListener("click", () => {
  console.log("clickinggg");
 dashboardPage.style.display = "none";
    settingsPage.style.display = "block";

    dashboardLink.classList.remove("active");
    settingsLink.classList.add("active");

});

backDashboardBtn.addEventListener("click", () => {

    settingsPage.style.display = "none";
    dashboardPage.style.display = "grid";

    settingsLink.classList.remove("active");
    dashboardLink.classList.add("active");

});


renderTransactions();