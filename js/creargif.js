

let themeDay = document.getElementById("linkThemeDay");
let themeDark = document.getElementById("linkThemeDark");
let logoDay = document.getElementById("logoday")
let logoDark = document.getElementById("logodark")



if(localStorage.getItem("theme")==="true"){
    themeDay.parentNode.replaceChild(themeDark,themeDay);
    logoDark.hidden=false;
    var logoMain = logoDay.parentNode;
    logoMain.replaceChild(logoDark, logoDay)
    
}else{
    themeDark.parentNode.replaceChild(themeDay,themeDark);
    var logoMainDos = logoDark.parentNode;
    logoMainDos.replaceChild(logoDay,logoDark)
}


const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/';
const GIPHY_API_USERNAME = "glowupdesign";
const GIPHY_API_KEY = "qAYj5sLDr6gXtwQv3AHcTtazy8ldSC8k";
const GIPHY_UPLOAD_URL = "https://upload.giphy.com/v1/gifs";




getGifById = (id) =>{
    
    let misgifosCreados = document.getElementById("misgifosCreados")
    const urlById = GIPHY_API_URL + id +"?api_key="+GIPHY_API_KEY
    //console.log(id)
    //const urlById = `${GIPHY_API_URL}${id}?api_key=${GIPHY_API_KEY}`

    console.log(urlById)
    
    fetch(urlById)
        .then((res)=>{
        console.log(res)
        return res.json()
        
        })
        .then((resJson) => {
        let data = resJson.data
        //console.log(data)
        let contDiv = document.createElement("div")
        let contImg = document.createElement("img")

        contDiv.classList.add("divMisgifos")
        contImg.src = data.images.fixed_width.url
        contImg.classList.add("imgMisGifs")

        misgifosCreados.appendChild(contDiv)
        contDiv.appendChild(contImg)
    })
    .catch((e)=>{
        console.log("Error en el getGifById" + e)
    })
}

getGifsById = (gifsId) => {
      console.log(gifsId)
    for(let id of gifsId){
        getGifById(id)
    }   
}


const validarGifsId = () => {
    if (localStorage.getItem('myGifs') !== null) {
        let idDeGif = JSON.parse(localStorage.myGifs);
        if (idDeGif.length === 0) {
            console.log('no hay gifos creados')
        } else {
            console.log('hay gifos')
            getGifsById(idDeGif)
            //console.log(idDeGif)
        }
    }
}

validarGifsId()
