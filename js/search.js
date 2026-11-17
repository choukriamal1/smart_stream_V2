// export const recherche = (channels, text)=>{
//     const search = text.toLowerCase().trim();
//     return channels.filter((chaine)=>
//     chaine.name.toLowerCase().includes(search));
// };
// produits.forEach((produit, index)=>{
       // let filtered = [];
        // console.log(filtered)


// })

import { afficherChaines } from "./ui.js";

export function searchChannels(channels){
    const search = document.querySelector("#search");
 

        search.addEventListener("input", function (e) {
          
            console.log(e.target.value);
        // console.log(e.target.value.toUpperCase())
        const filtered = channels.filter(function (chaine) {
            return (chaine.name+" "+chaine.channelNumber).toUpperCase().includes(e.target.value.toUpperCase());
        });
        afficherChaines(filtered)
    });
}

 

 