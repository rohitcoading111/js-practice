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