

let liDay = document.getElementById("s-day");
let liNight = document.getElementById("s-night")
let themeDay = document.getElementById("linkThemeDay");
let themeDark = document.getElementById("linkThemeDark");
let logoDay = document.getElementById("logoday")
let logoDark = document.getElementById("logodark")
logoDark.style.display="none";
let dropDay = document.getElementById("dd-day");
let dropDark = document.getElementById("dd-dark");
dropDark.style.display="none";
dropDark.style.marginTop="7px";


/*------LOCALSTORAGE------*/

    if(localStorage.getItem("theme")==="true"){
        themeDay.parentNode.replaceChild(themeDark,themeDay);
        logoDark.style.display="block";
        dropDark.style.display="block";
        var logoMain = logoDay.parentNode;
        logoMain.replaceChild(logoDark, logoDay)
        var dropMain = dropDay.parentNode;
        dropMain.replaceChild(dropDark, dropDay);
    }else{
        themeDark.parentNode.replaceChild(themeDay,themeDark);
        var logoMainDos = logoDark.parentNode;
        logoMainDos.replaceChild(logoDay,logoDark)
        var dropMainDos = dropDark.parentNode;
        dropMainDos.replaceChild(dropDay, dropDark)
    }

/*---------EVENTO CAMBIAR DE TEMA--------*/

liNight.addEventListener("click", ()=>{
    logoDark.style.display="block";
    dropDark.style.display="block";
    setTimeout(()=>{
        themeDay.parentNode.replaceChild(themeDark,themeDay);
    },0000);
    
    var logoMain = logoDay.parentNode;
    logoMain.replaceChild(logoDark, logoDay)
    var dropMain = dropDay.parentNode;
    dropMain.replaceChild(dropDark, dropDay);
    
    localStorage.setItem("theme", "true")
    
})

liDay.addEventListener("click", ()=>{

    setTimeout(()=>{
        themeDark.parentNode.replaceChild(themeDay,themeDark);
    },0000);
    var logoMainDos = logoDark.parentNode;
    logoMainDos.replaceChild(logoDay,logoDark)
    var dropMainDos = dropDark.parentNode;
    dropMainDos.replaceChild(dropDay, dropDark)

    localStorage.setItem("theme", "false")
    
})


let btnMisGifos = document.getElementById("btn-night-a")


btnMisGifos.style.color = "grey"


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


