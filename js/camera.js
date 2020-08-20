
let logoDay = document.getElementById("logoday")
let logoDark = document.getElementById("logodark")
logoDark.style.display="none";
let themeDay = document.getElementById("linkThemeDay");
let themeDark = document.getElementById("linkThemeDark");



/*------LOCALSTORAGE------*/

    if(localStorage.getItem("theme")==="true"){
        themeDay.parentNode.replaceChild(themeDark,themeDay);
        logoDark.style.display="block";
        var logoMain = logoDay.parentNode;
        logoMain.replaceChild(logoDark, logoDay)
    }else{
        themeDark.parentNode.replaceChild(themeDay,themeDark);
        var logoMainDos = logoDark.parentNode;
        logoMainDos.replaceChild(logoDay,logoDark)
    }



//------INGRESANDO A LA CAMARA

const GIPHY_API_URL = 'https://api.giphy.com/v1/gifs/';
const GIPHY_API_USERNAME = "glowupdesign";
const GIPHY_API_KEY = "qAYj5sLDr6gXtwQv3AHcTtazy8ldSC8k";
const GIPHY_UPLOAD_URL = "https://upload.giphy.com/v1/gifs";


const GYPHY_BUILT_URL = GIPHY_UPLOAD_URL + "?api_key=" + GIPHY_API_KEY + "&username=" + GIPHY_API_USERNAME;

//console.log(GYPHY_BUILT_URL)




//----BOTONES
let preview = document.getElementById("preview");
let imgCam = document.getElementById("camera");
imgCam.style.display = "none"
let btnCapture = document.getElementById("capturarImg")
let btnRecorded = document.getElementById("recordingImg")
let recordedVideo = document.getElementById("recordedGif")
let playButton = document.getElementById("reproducir")
let uploadButton= document.getElementById("uploadBtn")
let controlVideo = document.getElementById("controlVideo")
let ventanaCarga = document.getElementById("ventanaCarga")
let boxDownload = document.getElementById("box-download")


let btnRepetirCap = document.getElementById("btn-cancel")

ventanaCarga.classList.add("dispNone")



recordedVideo.hidden = true
controlVideo.style.display = "none"



btnRecorded.style.display = "none"


let btnDesactiveCam = document.getElementById("desactiveCam")
let btnActiveCam = document.getElementById("activeCam")
btnActiveCam.hidden = true;


boxDownload.style.display="none";
//----VARIABLES A UTILIZAR

let stream;
let recorderVideo, recorderGif;
let blobGif, blobVideo;
let recording = false;


setTimeout(async function activeCam(){
    stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            width: {ideal: 643},
            height: {ideal: 397}
        }
        
        
    })
        preview.style.display ="none"
        imgCam.style.display = "block"
        imgCam.srcObject = stream
        imgCam.play()
        //console.log(stream.active)
        localStorage.setItem("cam","true")

        btnDesactiveCam.addEventListener("click", () => {
            let track = stream.getTracks()[0];  // if only one media track
            // ...
            track.stop();
            btnDesactiveCam.hidden = true;
            btnActiveCam.hidden = false;
        })
        btnActiveCam.addEventListener("click", () => {
            activeCam()
            btnDesactiveCam.hidden = false;
            btnActiveCam.hidden = true;
        })
   
},1000)

let divBtnActCam = document.getElementById("div-btncam")

async function grabar(){
    divBtnActCam.style.display = "none"
    let cambiarTit = document.getElementById("tituloCaja")
    const contador = document.getElementById("contadorTiempo")

    let time = 0;
    
    if(time>=0){
      setTimeout(()=>{
        time=0
        time++
      },0000)
      setInterval(function(){
        contador.innerHTML = '00:00:0'+time+':00';
        time++;
      },1000);
    }
    contador.innerHTML = '00:00:0'+time+':00';
    cambiarTit.innerHTML = "Capturando Tu Guifo"
    btnRecorded.style.display = "block"
    btnCapture.style.display = "none"
    cambiarTit.innerHTML = "Capturando Tu Guifo"

    
    
    recorderVideo = new RecordRTCPromisesHandler(stream,{
            type: "video",
            frameRate: 1,
            quality: 10,
            width: 643,
            height: 397,
    });
    recorderGif = new RecordRTCPromisesHandler(stream, {
            type: "gif",
            frameRate: 1,
            quality: 10,
            width: 360,
            height: 240,
      });

      
      recorderVideo.startRecording();
      recorderGif.startRecording();
      const sleep = (m) => new Promise((r) => setTimeout(r, m));
      await sleep(4000);
      detenerGrabacion();
      cambiarTit.innerHTML = "Vista previa"
    
}


let descargaBtn = document.getElementById("descarga-btn")
async function detenerGrabacion() {
    if ((await recorderVideo.getState()) === "recording") {
      await recorderVideo.stopRecording();
      await recorderGif.stopRecording();
        blobVideo = await recorderVideo.getBlob();
        blobGif = await recorderGif.getBlob();
        
        btnRecorded.style.display = "none"
        btnCapture.style.display = "none"
        controlVideo.style.display = "block"

      mostrarGrabacion(blobVideo);
      
    }
  }



  function mostrarGrabacion(blob) {
    recordedVideo.hidden = false
    preview.style.display ="none"
    imgCam.style.display ="none"
    const gif = URL.createObjectURL(blob);
    recordedVideo.src = gif;
    let track = stream.getTracks()[0];
    track.stop();
    
    descargaBtn.addEventListener("click", downloadGif=()=>{

      //copiarPort.style.transition = "all 0.3 linear"
      descargaBtn.innerHTML = "Descargando"    
      let url = gif
      console.log(url)
      descargaBtn.setAttribute("href", url)
      
        setTimeout(function() {
        descargaBtn.innerHTML = "Descargar Guifo"
      },3000)
    })


  }

  function reproducirVideoGrabado() {
    recordedVideo.play();
    
  }

 
  

  function updateProgress() {
        const progressBar = document.getElementById("progress")
        const contador = document.getElementById("contador")

        let value = 0;
        if (recordedVideo.currentTime > 0) {
          value = Math.floor(
            (100 / recordedVideo.duration) * recordedVideo.currentTime
          );
        }
        let time = 0;
        if (recordedVideo.currentTime > 0) {
          time = Math.floor(
            recordedVideo.currentTime
          );
          if(recordedVideo.currentTime>recordedVideo.currentTime){
            time + 1
          }
        }
    //console.log(time)
        contador.innerHTML = '00:00:0'+time+':00'
        
        progressBar.style.width = value + '%';
  }
  

  


  let botonesGroup = document.getElementById("groupBtn")
  let pararUploap = document.getElementById("pararUpload")
  pararUploap.style.display="none";
  let cajaCamaraInit = document.getElementById("cajacamaraInit")

  let uploadedGifs = [];

  
  let copiarPort = document.getElementById("copiar")
  
  let progressCarga = document.getElementById("loaderGif")
  progressCargaF=()=>{
    let time = 0;
    if(time<100){
      timeRepeat=(time) => {
        setInterval(function(){
          time++
          progressCarga.setAttribute("value",time)
        },200)
      }
    }
    timeRepeat(time)
    if(time>=100){
      time=0
      timeRepeat(time)
    }
    
  }

  progressCargaF()




  async function subirGif(){
    if(blobGif){
      let form = new FormData();
      const gifName = prompt("No seas así: Dame un nombre para el gif") || "migif";
      form.append("file", blobGif, gifName + "myGif.gif");
      //var tiempoInicio = Date.now();
      
      botonesGroup.style.display ="none"
      controlVideo.style.display = "none"
      pararUploap.style.display="block";
      pararUploap.classList.add("btnCam")
        let btnParar = document.createElement("a")
        btnParar.classList.add("btn-cancel2")
        btnParar.innerHTML = "Cancelar"
        btnParar.setAttribute("href","camera.html")
        pararUploap.appendChild(btnParar)

        pararUploap.addEventListener("click", ()=>{
          uploadedGifs.pop();
        })
    
    try{
      recordedVideo.style.display = "none"
      ventanaCarga.classList.replace("dispNone","ventanaCarga")
      ventanaCarga.classList.add("ventanaCarga")
      const resp = await fetch(GYPHY_BUILT_URL,{
          mode: "cors",
          method: "POST",
          body: form,
        });
        
        
        const parsedResponse = await resp.json();

        
        console.log(parsedResponse.data.id);
        uploadedGifs.push(parsedResponse.data.id);
        localStorage.setItem("myGifs", JSON.stringify(uploadedGifs));
        let idGif = parsedResponse.data.id

        
        
        cajaCamaraInit.style.display="none";
        boxDownload.style.display="block";
        getGifById(idGif)

        copiarPort.addEventListener("click", copiarPorta=()=>{

          //copiarPort.style.transition = "all 0.3 linear"
          copiarPort.innerHTML = "Enlace Copiado! =)"    
          let url = "https://giphy.com/gifs/" + idGif
          console.log(url)
            let aux = document.createElement("input");
            aux.setAttribute("value",url);
            document.body.appendChild(aux);
            aux.select();
            document.execCommand("copy");
            document.body.removeChild(aux);
          setTimeout(function() {
            copiarPort.innerHTML = "Copiar Enlace Guifo"
          },3000)
        })
        
    }catch (e) {
      console.log(e);
      alert("Error algo salio mal");
    }
  }else{
    alert("No has grabado nada para subir");
  }

}


getGifById = (id) =>{
  
  let imgGifCreado = document.getElementById("gifcreado")
  const urlById = GIPHY_API_URL + id +"?api_key="+GIPHY_API_KEY
  //console.log(id)
  //const urlById = `${GIPHY_API_URL}${id}?api_key=${GIPHY_API_KEY}`

  console.log(urlById)
  
  fetch(urlById)
      .then((res)=>{
      //console.log(res)
      return res.json()
      
      })
      .then((resJson) => {
        let data = resJson.data
        console.log(data)
        let contImg = document.createElement("img")

        contImg.src = data.images.fixed_width.url
        
        contImg.classList.add("imgMiGif")

        imgGifCreado.appendChild(contImg)

        
  })
  .catch((e)=>{
      console.log("Error en el getGifById" + e)
  })
}





const validarGifsId = () => {
  if (localStorage.getItem('myGifs') !== null) {
      let idDeGif = JSON.parse(localStorage.myGifs);
      if (idDeGif.length === 0) {
          console.log('no hay gifos creados')
      } else {
          console.log('hay gifos')
          uploadedGifs = JSON.parse(localStorage.getItem("myGifs"))
          
      }
  }
}



validarGifsId()


  btnCapture.addEventListener("click", grabar);
  btnRecorded.addEventListener("click", detenerGrabacion);
  recordedVideo.addEventListener("timeupdate", updateProgress, false);
  playButton.addEventListener("click", reproducirVideoGrabado);
  uploadButton.addEventListener("click", subirGif);
  btnRecorded.style.display = "none"


  
  
  
