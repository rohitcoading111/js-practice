const counters = document.querySelectorAll(".counter");

const startCounter = () => {

    counters.forEach(counter => {

        const target = +counter.dataset.target;

        let current = 0;

        const increment = target / 80;

        const update = () => {

            current += increment;

            if(current < target){

                if(target > 1000){

                    counter.innerHTML =
                    "₹" + Math.floor(current).toLocaleString();

                }else{

                    counter.innerHTML =
                    Math.floor(current);

                }

                requestAnimationFrame(update);

            }else{

                if(target > 1000){

                    counter.innerHTML =
                    "₹" + target.toLocaleString();

                }else{

                    counter.innerHTML =
                    target;

                }

            }

        }

        update();

    });

}

startCounter();


const ctx = document.getElementById("incomeChart");

if(ctx){

new Chart(ctx,{

type:"line",

data:{

labels:[
"Jan",
"Feb",
"Mar",
"Apr",
"May",
"Jun",
"Jul"
],

datasets:[{

label:"Income",

data:[
12000,
19000,
16000,
25000,
22000,
33000,
45000
],

borderWidth:4,

borderColor:"#4F46E5",

backgroundColor:"rgba(79,70,229,.12)",

fill:true,

tension:.45,

pointRadius:5,

pointHoverRadius:8

}]

},

options:{

responsive:true,

plugins:{
legend:{
display:false
}
},

scales:{

x:{
grid:{
display:false
}
},

y:{
grid:{
color:"#EEF2F7"
}
}

},

animation:{
duration:1800
}

}

});

}

let theme = localStorage.getItem("mode")
if(theme === "dark"){
  document.body.classList.add("dark")
  moon.remove()
  
}

const moon = document.querySelector(".ri-moon-line");
moon.parentElement.addEventListener("click",()=>{
document.body.classList.toggle("dark");
moon.classList.toggle("ri-sun-line");
moon.classList.toggle("ri-moon-line");
if (document.body.classList.contains("dark")){
    localStorage.setItem("mode","dark")
} else {
   localStorage.setItem("mode","light")
}
});



const observer = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.style.opacity="1";

entry.target.style.transform="translateY(0)";

}

});

});

document.querySelectorAll(".card,.panel").forEach(item=>{

item.style.opacity="0";

item.style.transform="translateY(40px)";

item.style.transition=".8s";

observer.observe(item);

});



document.querySelectorAll("button").forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const size=Math.max(this.clientWidth,this.clientHeight);

const rect=this.getBoundingClientRect();

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.left=e.clientX-rect.left-size/2+"px";

ripple.style.top=e.clientY-rect.top-size/2+"px";

ripple.classList.add("ripple");

this.appendChild(ripple);

setTimeout(()=>{

ripple.remove();

},700);

});

});


document.querySelectorAll(".card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateX=-(y-rect.height/2)/18;

const rotateY=(x-rect.width/2)/18;

card.style.transform=

`perspective(1000px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
scale(1.04)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform=

"perspective(1000px) rotateX(0) rotateY(0) scale(1)";

});

});



const glow=document.createElement("div");

glow.className="cursor-glow";

document.body.appendChild(glow);

document.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});



document.querySelectorAll(".icon-btn").forEach(btn=>{

btn.addEventListener("mouseenter",()=>{

btn.style.transform="scale(1.15) rotate(12deg)";

});

btn.addEventListener("mouseleave",()=>{

btn.style.transform="scale(1)";

});

});

document.querySelectorAll(".menu a").forEach(item=>{

item.addEventListener("click",(e)=>{

e.preventDefault();

document.querySelector(".menu .active")
.classList.remove("active");

item.classList.add("active");

});

});