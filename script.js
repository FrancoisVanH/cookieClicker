(()=> {

    var clicker = document.getElementById("clicker");
    var counter = 0;
    var puntos = document.getElementById("totalText");
        

    clicker.addEventListener("click", ()=>{
        counter ++;
        puntos.innerHTML = "Puntos: "+counter;
    });
   
})();