
/*---------Cambiando de tema--------*/
/*---------DOM--------*/

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


/*---------BOTON DE SEARCH--------*/


let texto = document.getElementById("input-type")
let botonBuscar = document.getElementById("btn-busca")
let Lupa = document.getElementById("g-id")


getID=(id)=>{
    return document.getElementById(id).value;
}

innderHTML=(id, result)=>{
    return document.getElementById(id).innerHTML=result;
}

texto.addEventListener("keypress", ()=>{
        setInterval(function(){
            var c = getID("input-type")
    
            if(c.length>0){
                botonBuscar.classList.replace("btn-search","btn-dos")
                
                Lupa.classList.replace("act-lupa","in-lupa");
                

                //let padreUno = lupaIn.parentNode;
                //padreUno.replaceChild(lupaAct,lupaIn)
            }else{
                botonBuscar.classList.replace("btn-dos","btn-search")
                //let padreDos = lupaAct.parentNode;
                //padreDos.replaceChild(lupaIn,lupaAct);
            }
        },0000);
})


