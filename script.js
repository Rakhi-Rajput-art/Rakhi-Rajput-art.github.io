const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting) entry.target.classList.add("show"); });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

document.getElementById("year").textContent = new Date().getFullYear();

document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click",e=>{
    const target=document.querySelector(a.getAttribute("href"));
    if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth",block:"start"});}
  });
});

// Tiny pointer parallax for the hero artwork — disabled on touch devices.
if (window.matchMedia("(pointer:fine)").matches) {
  const art = document.querySelector(".comic-frame");
  window.addEventListener("pointermove", (e) => {
    const x = (e.clientX / window.innerWidth - .5) * 2;
    const y = (e.clientY / window.innerHeight - .5) * 2;
    art.style.setProperty("--mx", `${x * 5}px`);
    art.style.setProperty("--my", `${y * 5}px`);
  }, {passive:true});
}


// V3 project reveal — staggered and visibly animated.
const projectCards = document.querySelectorAll(".project");
const projectObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const index = [...projectCards].indexOf(card);
      setTimeout(() => card.classList.add("project-visible"), (index % 4) * 110);
      projectObserver.unobserve(card);
    }
  });
}, { threshold: 0.12 });

projectCards.forEach(card => projectObserver.observe(card));
