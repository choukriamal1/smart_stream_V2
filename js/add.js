import {getData , addChannels} from "../services/api.js";
import {afficherChaines} from "./ui.js";

const openBtn = document.getElementById("openModal");

const closeBtn = document.getElementById("cancelModal");
const modal = document.getElementById("modal");

const addBtn = document.getElementById("ajoutModal");

openBtn.addEventListener("click", ()=>{
    modal.classList.remove("hidden");
    modal.classList.add("flex");
});

let modalErreur=document.getElementById("modalErreur");

function  closeModal (){
    modal.classList.remove("flex");
    modal.classList.add("hidden");
    modalErreur.classList.add("hidden");

    modal.querySelector("#formModal").reset();
    // reset do the same work
    //document.getElementById("inputName").value ="";
    // document.getElementById("inputLogo").value ="";

    // document.getElementById("inputCategory").value ="";
    // document.getElementById("inputCountry").value ="";
}


closeBtn.addEventListener("click", closeModal);

addBtn.addEventListener("click", async ()=>{
    let number= document.getElementById("inputNumber").value.trim();
    let regexNumber= /^\d{1,4}$/; 

    let nameChannel= document.getElementById("inputName").value.trim();
    let regexNom = /^[A-Za-z0-9 .-_]{3,30}$/;
   

    let logoCh= document.getElementById("inputLogo").value.trim();
    let regexLogo = /^https?:\/\//;
   

    let categoryCh= document.getElementById("inputCategory").value;
    let country= document.getElementById("inputCountry").value;

    
    if (number==="" ||nameChannel==="" || categoryCh==="" || country===""){
        modalErreur.textContent="Il faut remplir toutes les cases avant d'ajouter une chaine";
        modalErreur.classList.remove("hidden");
        return;
    }
    modalErreur.classList.add("hidden");
    
    let newChannel = {
    channelNumber: number,
    countryCode: country,
    name: nameChannel,
    category: categoryCh,
    logo: logoCh || "https://placehold.co/60x60?text=" + encodeURIComponent(nameChannel),
    previewImg: "https://placehold.co/800x450?text=" + encodeURIComponent(nameChannel),
    streamUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
    isLive: true,
    isFavorite: false,
    isBlacklisted: false,
    epg: {
      currentProgram: "Live Broadcast",
      startTime: "20:00",
      endTime: "21:00",
      progressPercentage: 100
    }
  };

  try{
    console.log(newChannel)
    await addChannels(newChannel);
    closeModal();
    const data = await getData();
    afficherChaines(data, country);
  }
  catch(error){
    console.error("Impossible d'ajouter la chaîne :", error);
    modalErreur.textContent = "Erreur : la chaîne n'a pas été ajoutée.";
    modalErreur.classList.remove("hidden");
  }
});
