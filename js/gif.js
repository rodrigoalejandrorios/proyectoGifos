/*--API DE GIPHY---*/

// PARAMETERS
const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/';
const GIPHY_API_USERNAME = "glowupdesign";
const GIPHY_API_KEY = "qAYj5sLDr6gXtwQv3AHcTtazy8ldSC8k";
const GIPHY_UPLOAD_URL = "https://upload.giphy.com/v1/gifs";
const HOY_TE_SUGERIMOS_GIFS_LENGTH = 4;
const TENDENCIAS_GIFS_LENGTH = 16;
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
                console.log(gifosConst)
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
                    search(q)
                    contTrending.parentNode;
                    contTrending.remove()
                    //console.log(inputSearch.value.length)
                    let textoDom = addText.innerText="Resultado de "+ gifosConst.data.title;
                    replaceH3.remove(textoDom)
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
    let tag = "";
    let trendingEndpoint = GIPHY_API_URL + "trending?api_key=" + GIPHY_API_KEY + '&limit=' + (TENDENCIAS_GIFS_LENGTH);

    

    for(var i = 0; i < 1; i++){
        fetch(trendingEndpoint)
            .then((response)=>{
                return response.json()
            })
            .then(gifosTrend=>{
                gifosTrend.data.forEach((obj)=>{
                    //console.log(obj)
                    var gifContainer = document.createElement("div");
                    
                    var gifSrc = document.createElement("div");
                    var gifSrcImg = document.createElement("img");

                    

                    
                    gifSrcImg.src = obj.images.downsized.url;
                    var styleEl = contTrending.appendChild(gifContainer)
                    styleEl.classList.add("trend-element-style")

                
                    gifContainer.appendChild(gifSrc)
                    var tamImg = gifSrc.appendChild(gifSrcImg);
                    tamImg.classList.add("trend-element-img");

                    tamImg.addEventListener("mouseover",(e)=>{
                        gifTitle = document.createElement("div");
                        gifTitle.innerHTML = "#" + obj.title;
                        var textStyle = gifContainer.appendChild(gifTitle)
                        textStyle.classList.add("trend-element-title")
                        tamImg.classList.remove("trend-element-style")
                        tamImg.classList.add("trend-element-style-hv")

                        
                    })

                    tamImg.addEventListener("mouseout",()=>{
                        gifTitle.replaceWith()
                        tamImg.classList.remove("trend-element-style-hv")
                        tamImg.classList.add("trend-element-style")
                    })
                    
                })
                
            })
            .catch((error)=>{
                console.log("Error en la funcion tendencias:"+error)
            })
    }

    
}


crearTendencias()

/*
function crearTendencias(){
    let tag = "";
    let trendingEndpoint = GIPHY_API_URL + "trending?api_key=" + GIPHY_API_KEY;
    let i = TENDENCIAS_GIFS_LENGTH
    if(tag.length > 0){
        trendingEndpoint += "&tag" + tag;
    }

    fetch(trendingEndpoint)
            .then((response)=>{
                return response.json()
            })
            .then(gifosTrend=>{
                var gifContainer = document.createElement("div");
                    var gifTitle = document.createElement("div");
                    var gifSrc = document.createElement("div");
                    var gifSrcImg = document.createElement("img");
            
                    gifTitle.innerHTML = "#" + gifosTrend.data[i].title;
                    gifSrcImg.src = gifosTrend.data[i].images.downsized.url;
                    var styleEl = contTrending.appendChild(gifContainer)
                    styleEl.classList.add("sug-element-style")
            
                    var textStyle = gifContainer.appendChild(gifTitle)
                    textStyle.classList.add("sug-element-title")
                            
                    gifContainer.appendChild(gifSrc)
                                var tamImg = gifSrc.appendChild(gifSrcImg);
                    tamImg.classList.add("sug-element-img");
                
            })
            .catch((error)=>{
                console.log("Error en la funcion tendencias:"+error)
            })

    

    
}

crearTendencias()*/


/*   BUSQUEDA!    */
const searchForm = document.getElementById("searching");
const inputSearch = document.getElementById("input-type");
let secResult = document.getElementById("result");

let tituloBusqueda = document.getElementById("cont-busqueda");
let crearTit = document.createElement("h3");
let addText = tituloBusqueda.appendChild(crearTit);


searchForm.addEventListener("submit", (e)=>{
    e.preventDefault()
    const q = inputSearch.value
    search(q)
    contTrending.parentNode;
    contTrending.remove()

    //console.log(inputSearch.value.length

    let textoDom = addText.innerText="Resultado de "+ inputSearch.value;
    replaceH3.remove(textoDom)
})




function search(q){
    //SEARCH ENDPOINT PARAMETER
    let searchEndpoint = GIPHY_API_URL+'search?api_key='+GIPHY_API_KEY+"&q="+q;
    //console.log(searchEndpoint)

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
            let width = obj.images.fixed_width.width;
            let height = obj.images.fixed_width.height;
            let tag = obj.title
            resultHTML += '<img class="img-item" src="'+url+'" width="'+width+'" height="'+height+'" alt="'+tag+'">'
        
        })
        secResult.innerHTML = resultHTML
    })
    .catch((e)=>{
    console.log("Error en el searchEndpoint "+e.message)
    });

}
