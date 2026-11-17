import { updateIsFavorite, updateIsBlacklisted } from "../services/api.js";
import { getData } from "../services/api.js";

    const liste=document.getElementById("channels-list");
    let chainesPays=[];
    let hlsElement=null;
   
    export function afficherChaines(chaines, codePays){

    //filtrer chaine click
    chainesPays=chaines;
    if (codePays){
        chainesPays = chaines.filter(function(chaine){
        return chaine.countryCode === codePays;
    });
}
    //creer les liste du chaines
    let html = "";
    chainesPays.forEach(function(chaine){
        html+=`
        <div data-id="${chaine.id}" class="channel flex items-center gap-3 rounded-xl border-white/5 bg-white/[0.03] p-3 cursor-pointer hover:hover:bg-white/[.08]">
        <img src="${chaine.logo}" alt="${chaine.name}" class="h-10 w-10 rounded-lg">
        <div class="min-w-0 flex-1">
        <p class="text-sm font-semibold text-slate-200">${chaine.name}</p>
        <p class="text-[11px] text-slate-500">N° ${chaine.channelNumber} . ${chaine.category}</p>
        </div>
        <span class="favorite "><i class="${chaine.isFavorite ? "fa-solid":  "fa-regular"} fa-heart" style="color: rgb(185, 21, 21);"></i></span>
       
        <span class="blocked "><i class="${chaine.isBlacklisted ? "fa-solid": "fa-regular"} fa-eye-slash" style="color: rgb(237, 238, 244);"></i></span>
        </div>
        `;
    });
        liste.innerHTML = html;
    if (chainesPays.length > 0) {
        showChannelInfo(chainesPays[0]);
    }
}
    
  

    const previewImage=document.getElementById("preview-image");
    const channelProgram=document.getElementById("channel-program");
    const channelTime=document.getElementById("channel-time");
    const channelProgress=document.getElementById("channel-progress");
    const channelCategory=document.getElementById("channel-category");
    const channelLive=document.getElementById("channel-live");
    const channelCountry=document.getElementById("channel-country");
    const channelName=document.getElementById("channel-name");
    const chaineNumber=document.getElementById("channel-number");
    const channelStream=document.getElementById("vedio");


    function showChannelInfo(chaine){
        
                channelStream.src = chaine.streamUrl;
                console.log(chaine.streamUrl);
                
                if(hlsElement){
                    hlsElement.destroy(); //arrête la chaîne précédente
                }
                    hlsElement = new Hls();
                    hlsElement.loadSource(chaine.streamUrl);
                    hlsElement.attachMedia(channelStream);
                    hlsElement.on(Hls.Events.MANIFEST_PARSED, () => {
                        channelStream.play();
                });

                channelName.textContent =chaine.name;
                channelCountry.textContent = chaine.countryCode;
                chaineNumber.textContent = chaine.channelNumber;
                channelCategory.textContent = chaine.category;

                channelProgram.textContent = chaine.epg.currentProgram;
                channelTime.textContent = chaine.epg.startTime + " -> " +chaine.epg.endTime; 
                channelProgress.textContent = chaine.epg.progressPercentage + "%";
            }




        liste.addEventListener("click", function(e){
            
            const bloc = e.target.closest(".channel");
            //e.target représente l'élément exact sur lequel tu as cliqué
            //closest(".channel") remonte dans les éléments parents pour retrouver la carte de la chaîne.
            if (!bloc) return;

            // Quelle chaîne la position dans la liste
            const index  = Array.from(liste.children).indexOf(bloc);
            const chaine = chainesPays[index];


            const coeur= e.target.closest(".favorite");
            const oeil= e.target.closest(".blocked");
                if (coeur){
                    let icon = coeur.querySelector("i");
                    icon.classList.toggle("fa-solid");
                    icon.classList.toggle("fa-regular");
                    chaine.isFavorite = !chaine.isFavorite;
                    updateIsFavorite(chaine.id, chaine.isFavorite);
                    return;
                    //On transmet deux informations :
                    // - chaine.id : quelle chaîne modifier ?
                    // - chaine.isFavorite : quelle valeur enregistrer ?
                }
                if(oeil){
                    let iconeye=oeil.querySelector("i");
                    iconeye.classList.toggle("fa-solid");
                    iconeye.classList.toggle("fa-regular");
                    chaine.isBlacklisted =  !chaine.isBlacklisted;
                    updateIsBlacklisted(chaine.id, chaine.isBlacklisted);
                    return;
                }
                showChannelInfo(chaine);
            });


            let btnFavorite = document.getElementById("btnFavorite");
            let btnBlacklisted = document.getElementById("btnBlacklisted");

            btnFavorite.addEventListener("click", async()=>{
                const datas = await getData();
                console.log(datas);
                const favoris=datas.filter(function(chaine){
                    return chaine.isFavorite === true;
                });
                afficherChaines(favoris)
            });

            btnBlacklisted.addEventListener("click", async ()=>{
                const data = await getData();
                console.log(data)
                const block = data.filter(function(chaine){
                    return chaine.isBlacklisted ===true;
                });
                console.log(block)
                afficherChaines(block)
            })