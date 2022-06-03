(()=> {

    var clicker = document.getElementById("clicker");
    var counter = 0;
    var puntos = document.getElementById("totalText");
    var click = document.getElementById("clickText");
    

    clicker.addEventListener("click", ()=>{
        counter ++;
        click.innerHTML = "click: "+counter+" | click/sec: 0"
        puntos.innerHTML = "Puntos: "+counter;
    });
   
})();