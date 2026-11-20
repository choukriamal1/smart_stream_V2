import { updateIsBlacklisted } from "../services/api";

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
});

let number= document.getElementById("inputNumber").value.trim();
let nameChannel= document.getElementById("inputName").value.trim();
let logoCh= document.getElementById("inputLogo").value.trim();

let categoryCh= document.getElementById("inputCategory").value;
let country= document.getElementById("inputCountry").value;

let newChannel = {
    channelNumber: number,
    countryCode: country,
    name: nameChannel,
    category: categoryCh,
    logo: logoCh || "https://via.placeholder.co/60x60?text=TV",
    previewImage: "https://via.placeholder.co/800x450?text=" + encodeURIComponent(nameChannel),
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

//   if (number==="" ||nameChannel==="" || categoryCh==="" || country==="")

