const input = document.querySelector("input")
const btn = document.querySelector("button")
const task = document.querySelector(".showtask")



btn.addEventListener("click", function(){
    let h1 = document.createElement("h1")
    h1.innerText = input.value
    if (h1.innerText.trim()=="") {
        return;
    }
    else{
        task.append(h1)
    }
    input.value = ""
})

