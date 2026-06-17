const category = document.querySelector("#category")
const addbtn = document.querySelector("#addbtn")
const taskinp = document.querySelector("#taskinp")
const taskcontainer = document.querySelector(".taskcontainer")
const themebtn = document.querySelector("#themebtn")
const body = document.querySelector("body")

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];



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
         console.log(tasks);
         clickedTask.remove()
    }

       if (e.target.classList.contains("complete-btn")) {
        tasks[index].completee = !tasks[index].completee
         clickedH3.classList.toggle("complete")
         clickedTask.classList.toggle("completed")
         console.log(tasks);

         
    }

    
         
    localStorage.setItem("tasks",JSON.stringify(tasks))


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
   let completee = false;
   del.classList.add("delete-btn")
   edit.classList.add( "edit-btn")
   


  taskdiv.dataset.id = taskobj.id;
  
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

})

themebtn.addEventListener("click",()=>{
    body.classList.toggle("dark")
    if(body.classList.contains("dark")){
       themebtn.innerText = "☀️ Light";
    }
    else {
        themebtn.innerText = "🌙 Dark";
    }
})

  tasks.forEach((item) => {
    createtask(item);
});

