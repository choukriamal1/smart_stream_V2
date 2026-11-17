// export  function getChannelsJSON () {
//     return fetch("https://iptv-org.github.io/api/streams.json")
//     .then (response => {
//         return response.json();
//     })
//     .then (data =>{
//         return data
//     })
//     .catch(error =>{
//         console.log("Error", error)
//     });
// }

let loading=document.getElementById("loading");
let error = document.getElementById("error");

const dataApi ="https://6af43b2c55a1de7dcf03be12.mockapi.io/api/v1/iptv"
async function getData (){
        try{
            loading.classList.remove("hidden");
            loading.classList.add("flex");

            const res= await fetch(dataApi)
            if(res.status >= 500){
                error.classList.remove("hidden");
                error.classList.add("flex");
            }
            if(!res.ok){
                throw new Error(`HTTP Error : ${res.status}`)
            }
            const data= await res.json()
            console.log(res)
            return data
        }
        catch (error){
            console.error ("Failed to fetch channels : ", error)
        }
        finally{
            loading.classList.add("hidden");
            loading.classList.remove("flex");
        }
    }
    async function updatechannels(){
        const res = await fetch(dataApi)
        const channels= await res.json()
        for(let chaine of channels){
            await fetch (`${dataApi}/${chaine.id}`,{
                method: "PUT",
                headers:{"Content-Type": "application/json"},
                body: JSON.stringify({ isFavorite: false, isBlacklisted: false}),
            });
        }
    console.log("Done");
}

export {getData, updatechannels};