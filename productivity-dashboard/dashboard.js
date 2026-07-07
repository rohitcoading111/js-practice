function animation(){
const cards = document.querySelectorAll(".animate");

window.addEventListener("load", () => {
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add("show");
        }, index * 250);
    });
});

const buttons = document.querySelectorAll("button");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {

        const ripple = document.createElement("span");
        ripple.classList.add("ripple");

        btn.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);

    });
});

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 10px 30px rgba(0,0,0,.3)";
        header.style.backdropFilter = "blur(20px)";
    } else {
        header.style.boxShadow = "none";
    }

});

document.addEventListener("mousemove", (e) => {

    const hero = document.querySelector(".hero");

    let x = (window.innerWidth / 2 - e.pageX) / 35;
    let y = (window.innerHeight / 2 - e.pageY) / 35;

    hero.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;

});
}

animation();

const time = document.getElementById("time");
const date = document.getElementById("date");
const greeting = document.getElementById("greeting");

function updateDateTime(){

    const now = new Date();

   
    time.textContent = now.toLocaleTimeString([],{
        hour:"2-digit",
        minute:"2-digit"
    });

   
    date.textContent = now.toLocaleDateString("en-IN",{
        weekday:"long",
        day:"numeric",
        month:"long",
        year:"numeric"
    });

    let hour = now.getHours();

    if(hour < 12){
        greeting.textContent = "Good Morning, Rohit 👋";
    }
    else if(hour < 18){
        greeting.textContent = "Good Afternoon, Rohit ☀️";
    }
    else{
        greeting.textContent = "Good Evening, Rohit 🌙";
    }

}
updateDateTime();
setInterval(updateDateTime,1000);


let tasks = []
console.log(tasks);


const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.querySelector(".task-container");
const taskTime = document.getElementById("taskTime");


addTaskBtn.addEventListener("click",()=>{
    const task = taskInput.value.trim();
    const time = taskTime.value.trim();
    let id =  Date.now();

   if (task === "" ){
    alert("your field has been empty")
    return;
   }    
   const taskObj = {
    task,
    time,
    id,
    completeBtns:false,
   }
   tasks.push(taskObj);
   localStorage.setItem("tasks",JSON.stringify(tasks));
   
   renderTasks()
});

function addTask(){
    const task = taskInput.value.trim();
}

function renderTasks(){
     taskContainer.innerHTML = "";
     tasks.forEach((task)=>{
     const h3 = document.createElement("h3");
     const p = document.createElement("p");
     h3.textContent = task.task
     p.textContent = task.time
    const taskCard = document.createElement("div");
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    taskCard.classList.add("task-card");
    taskInfo.append( h3,p);
    taskCard.append(taskInfo)
    taskContainer.append(taskCard);
});
}