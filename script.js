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

    var autoClickBonusCost = 100;
    var multiplierBonusCost = 15;
    var boostBonusCost = 60;
    
    const delai = 1000;
    var autoClickPerSecond = 0;
    var interval = null;

    var boostActive = false;
    var boost = 1;
 
    var multipl = 1;

    ///////////////////////////////////////////////////// Functions //////////////////////////////////////////////////////
    //Update Texts functions
    //Update Score text (= total text = "puntos text")
    function updatePuntosText(){
        puntos.innerHTML = "+" + Math.round(counter * 100) / 100;
    }
    //Update Current click text (current active multiplier bonus + current active autoclick bonus)
    function updateClickText(){
        clickText.innerHTML = "Smiley per click: "+ Math.round((multipl * boost) * 100) / 100 + " | Auto click: " + autoClickPerSecond + "/sec";
    }
    //Update the text of a button (Called when cost of a bonus changed)
    function updateBtnText(btn, text){
        btn.textContent = text;
    }

    //Other functions
    //Increment click (Called when user click the main button)
    function click(){
        counter = counter + ((1 * multipl)* boost);
        updatePuntosText();
    }
    //Update cost of a bonus button (Called when user bought a bonus)
    function updateBonusCost(bonusCost, incrementation){
        return bonusCost * incrementation;
    }
    // multiplicateur basique en X2
    function multiplicateur()
    {
        multipl *= 1.1;
    }

    ///////////////////////////////////////////////////// Code //////////////////////////////////////////////////////

    //Click
    clicker.addEventListener("click", (e)=>{
        click(); 
           let actionClicker = document.getElementById("actionClicker");
        actionClicker.style.left = `${e.offsetX - 40}px`;
        actionClicker.style.top = `${e.offsetY - 40}px`; 
        actionClicker.style.display = 'inline';
        actionClicker.style.opacity = '1';
        setTimeout(() => {
        //    actionClicker.style.display = 'none';
            actionClicker.style.opacity = '0';
        }, 300);
        setTimeout(() => {
            actionClicker.style.display = 'none';
        }, 600);
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
            }

            autoClickPerSecond++;

            //Increase the bonus cost and update the bonus button text
            autoClickBonusCost = updateBonusCost(autoClickBonusCost, 2);
            updateBtnText(autoClickBonusBtn, "Auto click: " + autoClickBonusCost + " | +" + (autoClickPerSecond + 1) + "/sec");

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

            var now = 30;
            //change boostActive on
            boostActive = true;
            boost = 2;
            
            //Update click text
            updateClickText();

            //Increase the bonus cost and update the bonus button text
            boostBonusCost = updateBonusCost(boostBonusCost, 2);
            updateBtnText(boostBonusBtn, "Frenzy: "+boostBonusCost+" | X200%/30sec");

            //Set boost
            var intervalBoost = setInterval(()=>{

                updatePuntosText();
                now--;

                //Change text timer
                textTimer.innerHTML = "Frenzy timer: "+now+"s";

                //stop interval after 30s
                if(now<=0){
                    clearInterval(intervalBoost);
                    boostActive = false;
                    boost = 1;

                    //Update click text
                    updateClickText();
                }
              
            }, delai);
        }
        else{
            console.log("not enough score");
        }
    });

    //Multiplier Bonus
    multiplierBonusBtn.addEventListener("click", ()=>{

        if(counter >= multiplierBonusCost)
        {
            counter -= multiplierBonusCost;
            updatePuntosText();
            multiplicateur();
            multiplierBonusCost = updateBonusCost(multiplierBonusCost, 1.5);
            updateBtnText(multiplierBonusBtn, "Multiplicator: " + Math.round(multiplierBonusCost * 100) / 100);
            updateClickText();
        }
        else{
            console.log("not enough score");
        }
    })
})();