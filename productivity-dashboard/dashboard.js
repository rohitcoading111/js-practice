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
let editTaskId = null;

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


let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
console.log(tasks);



const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskContainer = document.querySelector(".task-container");
const taskTime = document.getElementById("taskTime");


addTaskBtn.addEventListener("click",()=>{
    const task = taskInput.value.trim();
    const time = taskTime.value.trim();
    let id =  Date.now();

    if (task === "") {
    alert("Your field has been empty");
    return;
}

if(editTaskId !== null){

const updatedTask = tasks.find((task)=>{
    return task.id === editTaskId;
});

updatedTask.task = task;
updatedTask.time = time;
editTaskId = null;
addTaskBtn.textContent = "+ Add Task";
taskInput.value = "";
taskTime.value = "";
localStorage.setItem("tasks", JSON.stringify(tasks));
renderTasks();
updateDashboard();



}else{
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
   taskInput.value = "";
   taskTime.value = "";
   renderTasks()
   updateDashboard();

}

});

function addTask(){
    const task = taskInput.value.trim();
    updateDashboard()
}

function renderTasks(){
     taskContainer.innerHTML = "";
     tasks.forEach((task)=>{
     const taskActions = document.createElement("div");
     taskActions.classList.add("task-actions");

const completeBtn = document.createElement("button");
completeBtn.classList.add("complete-btn");
completeBtn.textContent = "✔";
completeBtn.dataset.id = task.id;
completeBtn.addEventListener("click", () => {
   const completeTask = tasks.find((task)=>{
     return Number(completeBtn.dataset.id) === task.id
   })
  completeTask.completeBtns = !completeTask.completeBtns;
    localStorage.setItem("tasks", JSON.stringify(tasks));
    
    renderTasks();
   updateDashboard();
});

const editBtn = document.createElement("button");
editBtn.classList.add("edit-btn");
editBtn.dataset.id = task.id;
editBtn.textContent = "✏️";

editBtn.addEventListener("click",()=>{
      const edited = tasks.find((task)=>{
          return Number(editBtn.dataset.id) === task.id
      })
taskInput.value = edited.task;
taskTime.value = edited.time;
addTaskBtn.textContent = "Update Task";
editTaskId = edited.id;
})

const deleteBtn = document.createElement("button");
deleteBtn.dataset.id = task.id;
deleteBtn.classList.add("delete-btn");
deleteBtn.textContent = "🗑";


deleteBtn.addEventListener("click",function(){
    const index = tasks.findIndex((task)=>{
   return Number(deleteBtn.dataset.id) === task.id
   });
   tasks.splice(index,1)
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
   updateDashboard();
})
 const taskCard = document.createElement("div");
if(task.completeBtns){

    taskCard.classList.add("completed");

    completeBtn.classList.add("completed");

}
taskActions.append(
    completeBtn,
    editBtn,
    deleteBtn
);

     const h3 = document.createElement("h3");
     const p = document.createElement("p");
     h3.textContent = task.task
     p.textContent = task.time
    const taskInfo = document.createElement("div");
    taskInfo.classList.add("task-info");
    taskCard.classList.add("task-card");
    taskInfo.append( h3,p,taskActions);
    taskCard.append(taskInfo)
    taskContainer.append(taskCard);
});
}

function updateDashboard(){
const totalTask = document.getElementById("totalTask");
const completedTask = document.getElementById("completedTask");
const pendingTask = document.getElementById("pendingTask");
const focusTime = document.getElementById("focusTime");

totalTask.textContent = tasks.length;
completedTask.textContent =
tasks.filter((task)=>{
    return task.completeBtns;
}).length;


pendingTask.textContent =
tasks.filter((task)=>{
    return totalTask-completedTask;
}).length;

}

const newPlannerRowBtn = document.getElementById("newPlannerRow");
const plannerContainer = document.querySelector(".planner-container");
const plannerTimeInputs = document.querySelectorAll(".planner-time");
const plannerTaskInputs = document.querySelectorAll(".planner-input");
const savePlanBtn = document.getElementById("savePlan");
const plannerCardContainer = document.querySelector(".planner-card-container");
const plannerHistory = document.querySelector(".planner-history");

const planerData = JSON.parse(localStorage.getItem("planerData")) || [];
savePlanBtn.addEventListener("click",()=>{
    const rows = document.querySelectorAll(".planner-row")
    planerData.length = 0;
    rows.forEach((row)=>{
      const timeInput = row.querySelector(".planner-time");
      const activityInput = row.querySelector(".planner-input")
      const time = timeInput.value;
      const activity = activityInput.value;
      const planerObj = {
        time,
        activity,
        id:Date.now() + Math.random()
      }
      planerData.push(planerObj)
    })
    renderPlanner();
    localStorage.setItem("planerData",JSON.stringify(planerData));
})


planerData.forEach((plan,index)=>{
    const rows = document.querySelectorAll(".planner-row")
    const row = rows[index]
      const timeInput = row.querySelector(".planner-time");
      const activityInput = row.querySelector(".planner-input")
    timeInput.value = plan.time
    activityInput.value = plan.activity
})

console.log(planerData);


function renderPlanner(){
       const rows = document.querySelectorAll(".planner-row")
      plannerCardContainer.innerHTML = "";

    planerData.forEach((plan)=>{
        const plannerActions = document.createElement("div");
        const plannerCard = document.createElement("div");
        const plannerInfo = document.createElement("div");

        const h4 = document.createElement("h4");
        const p = document.createElement("p");

        const editBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");

        plannerCard.classList.add("planner-card");
        plannerInfo.classList.add("planner-info");
        plannerActions.classList.add("planner-actions");

        h4.textContent = plan.activity;
        p.textContent = plan.time;
       
         editBtn.classList.add("edit-btn");
         editBtn.dataset.id = plan.id;
         editBtn.textContent = "✏️";

         deleteBtn.classList.add("delete-btn");
         deleteBtn.dataset.id = plan.id;
         deleteBtn.textContent = "🗑";

         plannerActions.append(editBtn,deleteBtn);
         plannerInfo.append(h4,p)
         plannerCard.append(plannerInfo,plannerActions);
         plannerCardContainer.append(plannerCard);

        deleteBtn.addEventListener("click",()=>{
            const index = planerData.findIndex((plan)=>{
          return Number(deleteBtn.dataset.id) === plan.id;
            });
           planerData.splice(index,1)
           localStorage.setItem( "planerData", JSON.stringify(planerData));
           renderPlanner()
        })


          localStorage.setItem("planerData", JSON.stringify(planerData));
          rows.forEach((row)=>{
        row.querySelector(".planner-time").value = "";
        row.querySelector(".planner-input").value = "";

    });
 

    });

}


renderTasks();
 renderPlanner();
updateDashboard();