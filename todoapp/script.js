const input = document.querySelector("input")
const btn = document.querySelector("button")
const showtask = document.querySelector(".showtask")



btn.addEventListener("click", function(){
    let task = document.createElement("div")
    let p = document.createElement('h1')
    let del = document.createElement("button")
    let edit = document.createElement("button")
    let complete = document.createElement("button")
    p.innerText = input.value


    if (p.innerText.trim()=="") {
        return;
    }
    else{
        task.append(p)
        showtask.append(task)
    }
    input.value = ""

    task.append(del,edit,complete);

    del.innerText = "delete"
    edit.innerText = "edit"
    complete.innerText = "completed"

    del.addEventListener("click",function(){
        task.remove()
    })
    edit.addEventListener("click", () => {
    input.value = p.innerText;
    task.remove()
    });

    complete.addEventListener("click",function(){
         p.classList.toggle("completed")
    })


}) 
