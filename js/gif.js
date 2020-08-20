/*--API DE GIPHY---*/

// PARAMETERS
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/';
const GIPHY_API_USERNAME = "glowupdesign";
const GIPHY_API_KEY = "qAYj5sLDr6gXtwQv3AHcTtazy8ldSC8k";
const GIPHY_UPLOAD_URL = "https://upload.giphy.com/v1/gifs";
const HOY_TE_SUGERIMOS_GIFS_LENGTH = 4;
const TENDENCIAS_GIFS_LENGTH = 19;
let replaceH3 = document.getElementById("hTendencias")
let contTrending = document.getElementById("contTendencias");

// END PARAMETERS


function crearGif(){
    let contSugerencias = document.getElementById("contGif");
    let tag = "";
    let randomEndpoint = GIPHY_API_URL + "random?api_key=" + GIPHY_API_KEY;

    if(tag.length > 0){
        randomEndpoint += "&tag" + tag;
    }

    fetch(randomEndpoint)
            .then((response)=>{
                return response.json()
            })
            .then(gifosConst=>{
                //CREACION DE ELEMENTOS RANDOM
                var gifContainer = document.createElement("div");
                var gifTitle = document.createElement("div");
                var gifSrc = document.createElement("div");
                var gifSrcImg = document.createElement("img");
                var closeButton = document.createElement("img");
                var vermasBtn = document.createElement("button");
                closeButton.src="images/button3.svg"

                gifTitle.innerHTML = "#" + gifosConst.data.title;
                gifSrcImg.src = gifosConst.data.image_url;
                
                vermasBtn.innerHTML= "Ver más...";
                vermasBtn.classList.add("btn-vermas")
                gifContainer.appendChild(vermasBtn)
                var styleEl = contSugerencias.appendChild(gifContainer)
                styleEl.classList.add("sug-element-style")

                var textStyle = gifContainer.appendChild(gifTitle)
                textStyle.classList.add("sug-element-title")
                
                gifContainer.appendChild(gifSrc)
                var tamImg = gifSrc.appendChild(gifSrcImg);
                tamImg.classList.add("sug-element-img");
                var closeStyle = gifTitle.appendChild(closeButton)
                closeStyle.classList.add("sug-close");
                
                closeButton.addEventListener("click",()=>{
                    gifContainer.replaceWith()
                    crearGif()
                })



                vermasBtn.addEventListener("click", ()=>{
                    
                    const q = gifosConst.data.title;

                    if(q !== ""){   
                        search(q)
                        limpiar(q)
                        palabraGuardada(q)
                    }
                })
                
            })
            .catch((error)=>{
                console.log("Error en la funcion sugerencias:"+error)
            })
}


function sugerencias(){
    
    for(var i = 0; i < HOY_TE_SUGERIMOS_GIFS_LENGTH; i++){
        crearGif()
    }

}

sugerencias()




function crearTendencias(){
    let trendingEndpoint = GIPHY_API_URL + "trending?api_key=" + GIPHY_API_KEY + '&limit=' + (TENDENCIAS_GIFS_LENGTH);
    

    for(var i = 0; i < 1; i++){
        fetch(trendingEndpoint)
            .then((response)=>{
                return response.json()
            })
            .then(gifosTrend=>{
                gifosTrend.data.forEach((obj)=>{

                    let gifContainer = document.createElement("div");
                    let gifSrc = document.createElement("div");
                    let gifSrcImg = document.createElement("img");

                    let scaleWidth = obj.images.fixed_height.width
                    let scaleHeight = obj.images.fixed_height.height
                    
                    gifSrcImg.src = obj.images.downsized.url;
                    let styleEl = contTrending.appendChild(gifContainer)
                    
                
                    gifContainer.appendChild(gifSrc)
                    let tamImg = gifSrc.appendChild(gifSrcImg);
                    

                    if(scaleWidth>350){
                        
                        tamImg.classList.add("trend-element-img-tres");
                        styleEl.classList.add("trend-element-style-tres")
                        tamImg.classList.add("trend-element-img-tres");
                    }else{
                        styleEl.classList.add("trend-element-style")
                        tamImg.classList.add("trend-element-img");
                    }

                    tamImg.addEventListener("mouseover",()=>{
                        gifTitle = document.createElement("div");
                        gifTitle.innerHTML = "#" + obj.title;
                        let textStyle = gifContainer.appendChild(gifTitle)
                        if(scaleWidth>350){
                            textStyle.classList.add("trend-element-title-tres")
                            tamImg.classList.remove("trend-element-style-tres")
                            tamImg.classList.add("trend-element-style-hv-tres")
                        }else{
                            textStyle.classList.add("trend-element-title")
                            tamImg.classList.remove("trend-element-style")
                            tamImg.classList.add("trend-element-style-hv")
                        }
                        
                    })

                    tamImg.addEventListener("mouseout",()=>{
                        gifTitle.replaceWith()
                        if(scaleWidth>350){
                            tamImg.classList.remove("trend-element-style-hv-tres")
                            tamImg.classList.add("trend-element-style-tres")
                        }else{
                            tamImg.classList.remove("trend-element-style-hv")
                            tamImg.classList.add("trend-element-style")
                        }
                        
                    })
                    
                })
                
            })
            .catch((error)=>{
                console.log("Error en la funcion tendencias:"+error)
            })
    }

    
}


crearTendencias()





/*   BUSQUEDA!    */
let textoDom = ""
let guardarTextDom = []
const searchForm = document.getElementById("searching");
const inputSearch = document.getElementById("input-type");
let secResult = document.getElementById("result");
//Variable Autocompletar
let autoComplete = document.getElementById("autocomplete")
autoComplete.style.display = "none";

let tituloBusqueda = document.getElementById("cont-busqueda");
let crearTit = document.createElement("h3");
let addText = tituloBusqueda.appendChild(crearTit);


/*  EJECUCIÓN DE LA BUSQUEDA  */

function limpiar(q){
    contTrending.parentNode;
    contTrending.remove()
    textoDom = q
    let reTextoDom = addText.innerText="Resultados de "+ textoDom;
    replaceH3.remove(reTextoDom)
}



searchForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const q = inputSearch.value
    search(q)
    limpiar(q)
    palabraGuardada(q)
    cerrarCaja()
})





/*  FUNCIÓN DE LA BUSQUEDA  */

function search(q){

    let searchEndpoint = GIPHY_API_URL+'search?api_key='+GIPHY_API_KEY+"&q="+q;

    fetch(searchEndpoint)
    .then((respSearch)=>{
    return respSearch.json()
    })
    .then((json)=>{
        let resultHTML = ""
       
        //console.log(json)
        json.data.forEach((obj)=>{
            //console.log(resultHTML)
            let url = obj.images.fixed_width.url;
            let width = obj.images.fixed_width.width*1.4;
            let height = obj.images.fixed_width.height*1.4;
            let tag = obj.title
            resultHTML += '<img class="img-item" src="'+url+'" width="'+width+'" height="'+height+'" alt="'+tag+'">'
        })
        secResult.innerHTML = resultHTML
        //secResult.innerHTML = resultTitle
    })
    .catch((e)=>{
    console.log("Error en el searchEndpoint "+e.message)
    });

}



/*  FUNCIÓN BUSQUEDA PREDICTIVA  */



function searchAuto(q){
    
    let searchEndpoint = GIPHY_API_URL+'search?api_key='+GIPHY_API_KEY+"&q="+q + '&limit=' + 3;

    fetch(searchEndpoint)
    .then((respSearch)=>{
    return respSearch.json()
    //console.log(respSearch)
    })
    .then((json)=>{
        let data = json.data
        autoComplete.innerHTML = "";


        for(var i = 0; i < data.length; i++){
            
            const button = document.createElement("button")
            button.classList.add("box-auto")
            let tag = data[i].title
            button.innerText = tag

            //EVENTO BUSCAR RELACIONADAS
            
            button.addEventListener("click",()=>{
                const q = tag
                search(q)
                limpiar(q)
                palabraGuardada(q)
                cerrarCaja()

            })
            autoComplete.appendChild(button)
        }

    
        if((inputSearch.value.length)===0){
            cerrarCaja()
        }
       
        
    
    })

    .catch((e)=>{
    console.log("Error en el autocomplete "+e.message)
    });

}

/* BUSQUEDA PREDICTIVA  */

let eventoBuscar = searchForm.addEventListener("input", () => {
    autoComplete.style.display = "block";
    const q = inputSearch.value;
    searchAuto(q) //tira 3 resultados
})


let guardarBusquedas = document.getElementById("res-guard");


function palabraGuardada(q){
    
    let nuevoText = textoDom
    guardarTextDom.push(nuevoText)
    localStorage.setItem("mySearch", JSON.stringify(guardarTextDom))
    

    let boxResult = document.createElement("button");
    
    boxResult.classList.add("res-guard-btn")
    boxResult.innerHTML = "#" + nuevoText;
    guardarBusquedas.appendChild(boxResult);

    let closeButton = document.createElement("img");
    closeButton.classList.add("click-over")
    closeButton.src="images/button3.svg"

    boxResult.addEventListener("mouseover", ()=>{

        setTimeout(()=>{
            boxResult.appendChild(closeButton)
        },0000)
        

        closeButton.addEventListener("click", ()=>{
            boxResult.remove()
        })
    })

    boxResult.addEventListener("mouseout", ()=>{
        setTimeout(()=>{
            closeButton.remove() 
        },1000)
        
    })

    boxResult.addEventListener("click", () =>{
        search(nuevoText)
        limpiar(q)
    })

}






function cerrarCaja () {
    setTimeout(()=>{
        objeto = [];
        autoComplete.innerHTML = "";
        autoComplete.style.display = "none";
    },0000)
}


