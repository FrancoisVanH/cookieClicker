(()=> {
    ///////////////////////////////////////////////////// Variables //////////////////////////////////////////////////////
    var counter = 0;

    var clicker = document.getElementById("clicker");
    var clickText = document.getElementById("clickText");
    var puntos = document.getElementById("totalText");
    var textTimer = document.getElementById("text-timer");

    var autoClickBonusBtn = document.getElementById("autoClickBonus");
    var multiplierBonusBtn = document.getElementById("multplierBonus");
    var boostBonusBtn = document.getElementById("boostBonus");

    var autoClickBonusCost = 25;
    var multiplierBonusCost = 15;
    var boostBonusCost = 30;
    
    const delai = 1000;
    var autoClickPerSecond = 1;
    var interval = null;
    var boostActive = false;
    var boost = 1;
    var multiplicateur = 1;

    ///////////////////////////////////////////////////// Functions //////////////////////////////////////////////////////
    //Update Texts functions
    //Update Score text (= total text = "puntos text")
    function updatePuntosText(){
        puntos.innerHTML = "Puntos: " + counter;
    }
    //Update Current click text (current active multiplier bonus + current active autoclick bonus)
    function updateClickText(){
        clickText.innerHTML = "Puntos per click: "+ 1 + " | AutoPuntos: " + autoClickPerSecond + "/sec"
    }
    //Update the text of a button (Called when cost of a bonus changed)
    function updateBtnText(btn, text){
        btn.textContent = text;
    }

    //Other functions
    //Increment click (Called when user click the main button)
    function click(){
        if(boostActive){
            boost = 2;
        }
        else{
            boost = 1;
        }

        counter = counter + ((1 * multiplicateur)* boost);
        updatePuntosText();
    }
    //Update cost of a bonus button (Called when user bought a bonus)
    function updateBonusCost(bonusCost, incrementation){
        return bonusCost * incrementation;
    }

    ///////////////////////////////////////////////////// Code //////////////////////////////////////////////////////

    //Click
    clicker.addEventListener("click", ()=>{
        click();     
    });

    //Autoclick bonus
    autoClickBonusBtn.addEventListener("click", ()=>{
        //Check if the user have enough score to buy the bonus
        if(counter >= autoClickBonusCost){
            //Decrease the score by the bonus cost
            counter -= autoClickBonusCost;
            updatePuntosText();

            //Stop previous interval and increase the bonus per second
            if(interval != null){
                clearInterval(interval);
                autoClickPerSecond *= 2;
            }

            //Increase the bonus cost and update the bonus button text
            autoClickBonusCost = updateBonusCost(autoClickBonusCost, 2);
            updateBtnText(autoClickBonusBtn, "auto click: " + autoClickBonusCost + " | +" + (autoClickPerSecond * 2) + "/sec");

            //Update click text
            updateClickText();

            //Create new autoclick (interval) each seconds
            interval = setInterval(() =>{
                //Called click x times
                for(let i = 0; i < autoClickPerSecond; i++){
                    click();
                }
            }, delai);
        }
        else{
            console.log("not enough score to buy this");
        }
    });



        //Boost Bonus
        boostBonusBtn.addEventListener("click", ()=>{
            // Check if the user have enough score to buy the bonus
            if(counter >= boostBonusCost && !boostActive){
                //Decrease the score by the bonus cost
                counter -= boostBonusCost;
                updatePuntosText();
                //change boostActive on
                boostActive = true;


            //Variable for timer 30s    
            var now = 30;

             //Increase the bonus cost and update the bonus button text
             boostBonusCost = updateBonusCost(boostBonusCost, 2);
             updateBtnText(boostBonusBtn, "frenzy: "+boostBonusCost+" | X200%/30sec");
       
            //Set boost
            var intervalBoost = setInterval(()=>{
                        
                for(let j = 0; j < autoClickPerSecond; j++){
                       
                    updatePuntosText();
                    now--;


                    //Change text timer
                    textTimer.innerHTML = "Frenzy timer: "+now+"s";
                    
                                    
                    //stop interval after 30s
                    if(now<=0){
                    clearInterval(intervalBoost);
                    boostActive = false;
                    }
                                                           
                }
                }, delai);
                 
            }
                   
            else{
                console.log("not enough score");
            }

        });



})();