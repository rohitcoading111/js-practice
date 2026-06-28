const loginForm = document.querySelector("#loginForm");

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

let users = JSON.parse(localStorage.getItem("users") || "[]");
console.log(users);


loginForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    let username = usernameInput.value.trim();
    let password = passwordInput.value.trim();
    if(username === "" || password === ""){
        alert("property has been empty")
        return
    }
    let findUser = users.find(user => user.username === username)
    if(findUser === undefined){
        alert("user not exist")
        return;
    }

    if(!findUser.password){
        alert("password not match")
        return;
    }
    
    if(findUser.password === password){
         alert("password matched")
         return;
    }


   localStorage.setItem("currentUser",JSON.stringify(findUser))

 window.location.href = "dashboard.html
    
})