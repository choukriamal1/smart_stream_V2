const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("cancelModal");
const modal = document.getElementById("modal");

openBtn.addEventListener("click", ()=>{
    modal.classList.add("open");
});

closeBtn.addEventListener("click", ()=>{
    modal.classList.remove("open");
})