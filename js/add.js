const openBtn = document.getElementById("openModal");

const closeBtn = document.getElementById("cancelModal");
const modal = document.getElementById("modal");

openBtn.addEventListener("click", ()=>{
    modal.classList.remove("hidden");
    modal.classList.add("flex");
});

closeBtn.addEventListener("click", ()=>{
    modal.classList.remove("flex");
    modal.classList.add("hidden");
})