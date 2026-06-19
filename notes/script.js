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
