const registerForm = document.getElementById("registerForm"); 

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword"); 

let users = JSON.parse(localStorage.getItem("users") || "[]");


registerForm.addEventListener("submit",(e)=> {
    e.preventDefault();
    let id = Date.now();
    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();


    if(username === "" || email === "" || password === "" || confirmPassword === "" ){
        return;
    }

    if(password !== confirmPassword){
        alert("your password not matched")
        return;
    }
     
    const duplicateUser = users.some(user => user.username === username);
    
    if(duplicateUser){
    alert("Username already exists");
    return;
    }

    const duplicateEmail = users.some(user => user.email === email);

    if(duplicateEmail){
        alert("email already exist ")
        return
    }

    let usersData = {
        id : id,
        username,
        email,
        password,
    }
  
  users.push(usersData);
  localStorage.setItem("users",JSON.stringify(users));

  usernameInput.value = ""
  emailInput.value = ""
  passwordInput.value = ""
  confirmPasswordInput.value = ""
})
