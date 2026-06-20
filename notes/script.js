const category = document.querySelector("#category")
const addbtn = document.querySelector("#addbtn")
const taskinp = document.querySelector("#taskinp")
const taskcontainer = document.querySelector(".taskcontainer")
const themebtn = document.querySelector("#themebtn")
const body = document.querySelector("body")
const searchInp = document.querySelector("#searchinp")
const categorysearch = document.querySelector("#categorysearch")
const total = document.querySelector("#total");
const completed = document.querySelector("#completed");
const pending = document.querySelector("#pending");


let savedtheme = localStorage.getItem("theme")
if(savedtheme === "dark"){
   body.classList.add("dark")
   themebtn.innerText = "☀️ Light";
}

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


searchInp.addEventListener("input",function(){
   let text = searchInp.value.toLowerCase();
   let filtered = tasks.filter((item) => {
    return item.title.toLowerCase().includes(text)
    });
    taskcontainer.innerHTML = "";

   filtered.forEach((e)=>{
     createtask(e)
   })
   
  });

categorysearch.addEventListener("change",function(){
  let searchcategory = categorysearch.value.toLowerCase();
  
  if(searchcategory === ""){
    taskcontainer.innerHTML = "";
      tasks.forEach((items)=>{
        createtask(items);
      })
    return;
  }
      
  let filtered = tasks.filter((e) =>{
    return e.category.toLowerCase().includes(searchcategory)
  })
  taskcontainer.innerHTML = "";
  filtered.forEach((e)=>{
     createtask(e);
  })

});

function updatetaskcounter(){
  let totalcount = tasks.length;
  let completedcounts = tasks.filter((e)=>{
     return e.completed === true;
  })
  let completedcount = completedcounts.length;
  let pendingcount = totalcount - completedcount;

  total.innerText = `total :${totalcount}`;
  completed.innerText = `completed : ${completedcount}`;
  pending.innerText = `pending : ${pendingcount}`;
}



taskcontainer.addEventListener("click",(e)=>{

    const clickedTask = e.target.parentElement.parentElement;
    const clickedH3 = clickedTask.querySelector("h3");
    const clickedP = clickedTask.querySelector("p");

    const id = Number(clickedTask.dataset.id);
     const index = tasks.findIndex((item) => {
    return item.id === id ;
   });

    if (e.target.classList.contains("delete-btn")) {
        tasks.splice(index,1)
        e.target.parentElement.parentElement.remove();
    }

       if (e.target.classList.contains("edit-btn")) {
         taskinp.value = clickedH3.innerText
         category.value = clickedP.innerText
         tasks.splice(index,1)
         clickedTask.remove()
    }

       if (e.target.classList.contains("complete-btn")) {
        tasks[index].completed = !tasks[index].completed;
         clickedH3.classList.toggle("complete")
         clickedTask.classList.toggle("completed")
         console.log(tasks);

         
    }  
    localStorage.setItem("tasks",JSON.stringify(tasks))
  
    updatetaskcounter()

  })

     
function createtask(taskobj){
  let taskdiv =  document.createElement("div");
   let h3 = document.createElement("h3")
   let p =  document.createElement("p")

   h3.innerText = taskobj.title
   p.innerText = taskobj.category
   taskdiv.classList.add("task")
   taskdiv.append(h3,p)
   taskcontainer.append(taskdiv)
   taskinp.value = ""
   category.value = ""

    

   let actiondiv = document.createElement("div")
   let complete = document.createElement("button")
   let edit = document.createElement("button")
   let del = document.createElement("button")



   complete.innerText = "completed"
   edit.innerText = "edit"
   del.innerText = "delete"
   actiondiv.classList.add("actions")

   actiondiv.append(complete,edit,del)
   taskdiv.append(actiondiv)

   complete.classList.add( "complete-btn")
   del.classList.add("delete-btn")
   edit.classList.add( "edit-btn")
   


  taskdiv.dataset.id = taskobj.id;

  if (taskobj.completed) {
    h3.classList.add("complete");
    taskdiv.classList.add("completed");
}

  }

addbtn.addEventListener("click",function(){
  if(taskinp.value.trim()==="" || category.value.trim()===""){
    return;
   }

   let taskobj = {
    id:Date.now(),
    title : taskinp.value,
    category : category.value,
    completed : false,
   }
  tasks.push(taskobj);
   localStorage.setItem("tasks",JSON.stringify(tasks))
  createtask(taskobj)
  updatetaskcounter()

})

themebtn.addEventListener("click",()=>{
    body.classList.toggle("dark")
    if(body.classList.contains("dark")){
      localStorage.setItem("theme", "dark");
       themebtn.innerText = "☀️ Light";
    }
    else {
        themebtn.innerText = "🌙 Dark";
         localStorage.setItem("theme", "light");
    }
 
   
})

  tasks.forEach((item) => {
    createtask(item);
});
updatetaskcounter();


const outer = document.querySelector("#outer");
const middle = document.querySelector("#middle");
const innerBtn = document.querySelector("#innerBtn");
const log = document.querySelector("#log");

function addLog(text) {
  log.innerHTML += `<br>${text}`;
}

outer.addEventListener(
  "click",
  () => addLog("🟢 Capturing: OUTER"),
  true
);

middle.addEventListener(
  "click",
  () => addLog("🟢 Capturing: MIDDLE"),
  true
);

innerBtn.addEventListener(
  "click",
  () => addLog("🟢 Capturing: BUTTON"),
  true
);

outer.addEventListener("click", () => {
  addLog("🔵 Bubbling: OUTER");
});

middle.addEventListener("click", () => {
  addLog("🔵 Bubbling: MIDDLE");
});

innerBtn.addEventListener("click", () => {
  log.innerHTML = "";
  addLog("🔵 Bubbling: BUTTON");
});


const showBubble = document.querySelector("#showBubble");
const showCapture = document.querySelector("#showCapture");
const clearLog = document.querySelector("#clearLog");

showBubble.addEventListener("click", () => {
  log.innerHTML = `
    🔵 Bubbling Order <br><br>
    BUTTON → MIDDLE → OUTER
  `;
});

showCapture.addEventListener("click", () => {
  log.innerHTML = `
    🟢 Capturing Order <br><br>
    OUTER → MIDDLE → BUTTON
  `;
});

clearLog.addEventListener("click", () => {
  log.innerHTML = "Waiting for interaction...";
});

const pipelineOutput = document.querySelector("#pipelineOutput");

document.querySelectorAll(".pipeline-buttons button").forEach((btn) => {

  btn.addEventListener("click", () => {

    const topic = btn.dataset.topic;

    if (topic === "parsing") {
      pipelineOutput.innerHTML =
        "<h3>Parsing</h3><p>The browser reads HTML code and starts understanding its structure.</p>";
    }

    else if (topic === "tokenization") {
      pipelineOutput.innerHTML =
        "<h3>Tokenization</h3><p>The browser breaks the HTML into small tokens like tags and text.</p>";
    }

    else if (topic === "dom") {
      pipelineOutput.innerHTML =
        "<h3>DOM Tree</h3><p>HTML is converted into a tree structure called the Document Object Model (DOM).</p>";
    }

    else if (topic === "cssom") {
      pipelineOutput.innerHTML =
        "<h3>CSSOM Tree</h3><p>The browser reads CSS and creates a CSS Object Model for styling.</p>";
    }

    else if (topic === "render") {
      pipelineOutput.innerHTML =
        "<h3>Render Tree</h3><p>The browser combines DOM and CSSOM to build the Render Tree.</p>";
    }

    else if (topic === "layout") {
      pipelineOutput.innerHTML =
        "<h3>Layout</h3><p>The browser calculates the size and position of every visible element.</p>";
    }

    else if (topic === "paint") {
      pipelineOutput.innerHTML =
        "<h3>Paint</h3><p>Finally, pixels are drawn on the screen and the webpage becomes visible.</p>";
    }

  });

});