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





export function searchStudents(etudiants) {
    let search = document.getElementById("search");
    search.addEventListener("input", function (e){
        let filtered= etudiants.filter(function (etudiant){
            return (etudiant.nom + " " + etudiant.filiere ).toUpperCase().includes(e.target.value.toUpperCase());
        }); 
        if(e.target.value === ""){
        console.log(etudiants);
        }else{
            console.log(filtered);
        }

    });
}
