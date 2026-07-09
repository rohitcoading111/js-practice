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
   const rows = document.querySelectorAll(".planner-row")
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

let editPlanId = null;
savePlanBtn.addEventListener("click",()=>{
  if(editPlanId !== null){
    const rows = document.querySelectorAll(".planner-row");
    const updatedPlan = planerData.find((plan) => {
      return plan.id === editPlanId;
    })
        const row = rows[updatedPlan.rowIndex];
        const timeInput = row.querySelector(".planner-time");
        updatedPlan.time = timeInput.value
        const activityInput = row.querySelector(".planner-input");
         updatedPlan.activity = activityInput.value;
        localStorage.setItem("planerData", JSON.stringify(planerData));

  rows.forEach((row, index) => {
    row.querySelector(".planner-time").value = "";
    row.querySelector(".planner-input").value = "";
});

renderPlanner();

editPlanId = null;
savePlanBtn.textContent = "Save Plan";

return;

  
}
else{
    const rows = document.querySelectorAll(".planner-row")
    planerData.length = 0;
    rows.forEach((row,index)=>{
      const timeInput = row.querySelector(".planner-time");
      const activityInput = row.querySelector(".planner-input")
      const time = timeInput.value;
      const activity = activityInput.value;
      const planerObj = {
        time,
        activity,
        id:Date.now() + Math.random(),
        rowIndex:index
      }
      planerData.push(planerObj)
    })
    renderPlanner();
    localStorage.setItem("planerData",JSON.stringify(planerData));
      rows.forEach((row,)=>{
        row.querySelector(".planner-time").value = "";
        row.querySelector(".planner-input").value = "";
    });
}
})

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

         editBtn.addEventListener("click",()=>{
            const rows = document.querySelectorAll(".planner-row");
             const editedPlan = planerData.find((plan)=>{
              return Number(editBtn.dataset.id) === plan.id;
          }); 
const row = rows[editedPlan.rowIndex];
const timeInput = row.querySelector(".planner-time");
const activityInput = row.querySelector(".planner-input");
timeInput.value = editedPlan.time;
activityInput.value = editedPlan.activity;
editPlanId = editedPlan.id;
savePlanBtn.textContent = "Update Plan";

         })
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
          if (index !== -1) {
    planerData.splice(index, 1);
    localStorage.setItem("planerData", JSON.stringify(planerData));
    renderPlanner();
}
        })
    });
}


const temperature = document.getElementById("temperature");
const city = document.getElementById("city");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const refreshWeatherBtn = document.getElementById("refreshWeather");
const cityInput = document.getElementById("cityInput");


const searchWeatherBtn = document.getElementById("searchWeather");
searchWeatherBtn.addEventListener("click",()=>{
   const cityName = cityInput.value.trim();
   searchCity(cityName);
   cityInput.value = ""
});


async function searchCity(cityName){

    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1`;

    const response = await fetch(geoUrl);
    const data = await response.json();

     const place = data.results[0];

    fetchWeather(
        place.latitude,
        place.longitude,
        place.name
    );

    localStorage.setItem("lastCity", cityName);

}

async function fetchWeather(latitude, longitude, cityName){
const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;

    const response = await fetch(url);
    const data = await response.json();


    temperature.textContent = `${data.current.temperature_2m}°C`;
    humidity.textContent = `${data.current.relative_humidity_2m}%`;
    wind.textContent = `${data.current.wind_speed_10m} km/h`;
    city.textContent = cityName;
    const code = data.current.weather_code;

    if (code === 0) {
        condition.textContent = "Clear Sky";
    }
    else if (code <= 3) {
        condition.textContent = "Partly Cloudy";
    }
    else if (code <= 48) {
        condition.textContent = "Fog";
    }
    else if (code <= 67) {
        condition.textContent = "Rain";
    }
    else if (code <= 77) {
        condition.textContent = "Snow";
    }
    else if (code <= 99) {
        condition.textContent = "Thunderstorm";
    }

}

refreshWeatherBtn.addEventListener("click", () => {

    const lastCity = localStorage.getItem("lastCity");

    if(lastCity){
        searchCity(lastCity);
    }

});

const lastCity = localStorage.getItem("lastCity");

if(lastCity){
    searchCity(lastCity);
}
else{
    searchCity("Khatima");
}

const timerDisplay = document.getElementById("timerDisplay");
const startTimerBtn = document.getElementById("startTimer");
const pauseTimerBtn = document.getElementById("pauseTimer");
const resetTimerBtn = document.getElementById("resetTimer");


let totalSeconds = 25*60;
let timerId = null;

function updateTimer(){
const minutes = Math.floor(totalSeconds / 60);
const seconds = totalSeconds % 60;

timerDisplay.textContent = `${minutes.toLocaleString().padStart(2,"0")}:${seconds.toString().padStart(2,"0")}`;
}

startTimerBtn.addEventListener("click",()=>{
  if(timerId){
    return;
  }
  else{
      timerId =  setInterval(() => {
      totalSeconds--;
      updateTimer()
   }, 1000);
  }
 
})

pauseTimerBtn.addEventListener("click",()=>{
   if(timerId){
     pauseTimerBtn.textContent = "▶ Resume"
     clearInterval(timerId)
     timerId = null
     return;
   }
   else{
     pauseTimerBtn.textContent = "⏸ Pause"
      timerId =  setInterval(() => {
      totalSeconds--;
      updateTimer()
      timerDisplay.textContent = `${minutes}:${seconds}`;
   }, 1000);
   }

})

resetTimerBtn.addEventListener("click",()=>{
    clearInterval(timerId);
    timerId = null;
    totalSeconds = 25 * 60;
    updateTimer()
})

const quoteText = document.getElementById("quoteText");
const quoteAuthor = document.getElementById("quoteAuthor");
const newQuoteBtn = document.getElementById("newQuote");

async function fetchQuote(){
      const response = await fetch("https://dummyjson.com/quotes/random");
       const data = await response.json();
       console.log(data);
      quoteText.textContent = data.quote;
      quoteAuthor.textContent = data.author;
}

newQuoteBtn.addEventListener("click",()=>{
    fetchQuote()
})

const addGoalBtn = document.getElementById("addGoalBtn");
const goalInput = document.getElementById("goalInput");
const goalList = document.querySelector(".goal-list");
const progressFill = document.querySelector(".progress-fill");
const progressText = document.querySelector(".goal-progress p");

let goals = JSON.parse(localStorage.getItem("goals")) || [];
addGoalBtn.addEventListener("click", () => {

    const goal = goalInput.value.trim();

    if(goal === ""){
        alert("Please Enter Goal");
        return;
    }
    
     const goalObj = {
        id:Date.now()+ Math.random(),
        text : goal,
        completed:false,
     }
   goals.push(goalObj)
   localStorage.setItem("goals", JSON.stringify(goals));
   renderGoals();
   goalInput.value = "";
});
function renderGoals(){

    goalList.innerHTML = "";

    goals.forEach((goal)=>{

        const goalItem = document.createElement("div");
        const goalText = document.createElement("span");
        const goalActions = document.createElement("div");
        const completeBtn = document.createElement("button");
        const deleteBtn = document.createElement("button");
        goalItem.classList.add("goal-item");
        goalActions.classList.add("goal-actions");
        completeBtn.classList.add("complete-btn");
        deleteBtn.classList.add("delete-goal-btn");
        completeBtn.dataset.id = goal.id;
        deleteBtn.dataset.id = goal.id;
        goalText.textContent = goal.text;

        deleteBtn.addEventListener("click",()=>{
           let index =  goals.findIndex((goal)=>{
             return Number(deleteBtn.dataset.id) === goal.id;
           })
           if(index>=0){
             goals.splice(index,1);
           }
           localStorage.setItem("goals", JSON.stringify(goals));
            renderGoals();

        })
        
        

        if(goal.completed){

            goalText.classList.add("completed");

        }

        completeBtn.textContent = "✔";

        deleteBtn.textContent = "🗑";

        goalActions.append(
            completeBtn,
            deleteBtn
        );

        goalItem.append(
            goalText,
            goalActions
        );

        goalList.append(goalItem);

    });

}
 renderGoals();
fetchQuote()
renderTasks();
renderPlanner();
updateDashboard();