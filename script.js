    ///////////////////////////////////////////////////// Variables //////////////////////////////////////////////////////
    var counter = 0;

    var clicker = document.getElementById("clicker");
    var clickText = document.getElementById("clickText");
    var puntos = document.getElementById("totalText");
    var textTimer = document.querySelectorAll("#base");
    var btnIcons = document.querySelectorAll(".icon01");
    var bandTop = document.querySelectorAll("#band01");
    

    var autoClickBonusText = document.getElementById("autoClickBonus");
    var autoClickBonusBtn = document.getElementById("bouton2");
    autoClickBonusBtn.disabled = true;
    changeIcone(btnIcons[1], "./img/hand_svg_icon_off.svg");

    var multiplierBonusText = document.getElementById("multplierBonus");
    var multiplierBonusBtn = document.getElementById("bouton1");
    multiplierBonusBtn.disabled = true;
    changeIcone(btnIcons[0], "./img/smiley_svg_icon_off.svg");

    var boostBonusText = document.getElementById("boostBonus");
    var boostBonusBtn = document.getElementById("bouton3");
    boostBonusBtn.disabled = true;
    changeIcone(btnIcons[2], "./img/flame_svg_icon_off.svg");

    var autoClickBonusCost = 100;
    var multiplierBonusCost = 15;
    var boostBonusCost = 60;
    
const delai = 1000;
    var autoClickPerSecond = 0;
    var intervalAutoClick = null;

    var boostActive = false;
    var boost = 1;
 
    var multipl = 1;

    var now = 0;

    ///////////////////////////////////////////////////// Functions //////////////////////////////////////////////////////
    /**
     * Update Score text (= total text = "puntos text") 
     */
    function updatePuntosText(){
        puntos.innerHTML = "+" + Math.round(counter * 100) / 100;
    }

    /**
     * Update Current click text (current active multiplier bonus + current active autoclick bonus)
     */
    function updateClickText(){
        clickText.innerHTML = "Smiley per click: "+ Math.round((multipl * boost) * 100) / 100 + " | Auto click: " + autoClickPerSecond + "/sec";
    }

    /**
     * Update the text of a button (Called when cost of a bonus changed)
     * @param {Element} btn 
     * @param {string} text 
     */
    function updateBtnText(btn, text){
        btn.textContent = text;
    }

    /**
     * Increment click (Called when user click the main button)
     */
    function click(){
        counter = counter + ((1 * multipl)* boost);
        updatePuntosText();
        UpdateDisableStateBonusBtn();
    }

    function UpdateDisableStateBonusBtn(){

        if(checkScore(autoClickBonusCost, counter)){
            autoClickBonusBtn.disabled = false;
            changeIcone(btnIcons[1], "./img/hand_svg_icon.svg");
        }
        else{
            autoClickBonusBtn.disabled = true;
            changeIcone(btnIcons[1], "./img/hand_svg_icon_off.svg");
        }

        if(checkScore(multiplierBonusCost, counter)){
            multiplierBonusBtn.disabled = false;
            changeIcone(btnIcons[0], "./img/smiley_svg_icon.svg");
        }
        else{
            multiplierBonusBtn.disabled = true;
            changeIcone(btnIcons[0], "./img/smiley_svg_icon_off.svg");
        }
        
        if(checkScore(boostBonusCost, counter)){
            boostBonusBtn.disabled = false;
            changeIcone(btnIcons[2], "./img/flame_svg_icon.svg");
        }
        else{
            boostBonusBtn.disabled = true;
            changeIcone(btnIcons[2], "./img/flame_svg_icon_off.svg");
        }
    }

    /**
     * Update cost of a bonus button (Called when user bought a bonus)
     * @param {number} bonusCost 
     * @param {number} incrementation 
     * @returns number
     */
    function updateBonusCost(bonusCost, incrementation){
        return bonusCost * incrementation;
    }

    /**
     * multiplicateur basique en X2
     */
    function multiplicateur()
    {
        multipl *= 1.1;
    }

    /**
     * check if user has enough score to buy the bonus
     * @param {Number} bonusCost 
     * @param {Number} counter 
     * @returns Boolean
     */
    function checkScore(bonusCost, counter){
        if(counter >= bonusCost){
            return true;
        }
        else {
            return false;
        }
    }

    function changeIcone(icone, newSrc){
        icone.src = newSrc;
    }

    /**
     * Create new autoclick (interval) each seconds 
     */
    function intervalBonusAutoClick(){
        intervalAutoClick = setInterval(() =>{
            //Called click x times
            for(let i = 0; i < autoClickPerSecond; i++){
                click();
            }
        }, delai);
    }

    /**
     * function click autoclick bonus 
     */
    function autoclickBonusClick(){
        if(checkScore(autoClickBonusCost, counter)){
            //Decrease the score by the bonus cost
            counter -= autoClickBonusCost;
            UpdateDisableStateBonusBtn();
            updatePuntosText();
              document.body.style.backgroundColor = 'rgb(172, 73, 255)'; // mauve
            for (let x in bandTop) {
            bandTop[x].innerHTML = 'AUTO CLICK ACTIVATED';
            }

            //Stop previous interval and increase the bonus per second
            if(intervalAutoClick != null){
                clearInterval(intervalAutoClick);
                for (let x in textTimer) {
                    textTimer[x].innerHTML = 'WELCOME TO SMILEY CLICKER';
            }
            }

            autoClickPerSecond++;

            autoClickBonusCost = updateBonusCost(autoClickBonusCost, 2);
            updateBtnText(autoClickBonusText, "Auto click: " + autoClickBonusCost + " | +" + (autoClickPerSecond + 1) + "/sec");

            updateClickText();

            intervalBonusAutoClick();
        }
        else{
            console.log("not enough score to buy this");
        }
    }

function timeOutfunc() {
    for (let x in textTimer) {
        textTimer[x].innerHTML = "00:" + now.toString().padStart(2, "0");
    }
    if (now <= 0) {
        for (let x in textTimer) {
            textTimer[x].innerHTML = "WELCOME to smiley clicker";
        }
    }
}
    /**
     * interval pour le boost bonus
     */
        function intervalBonusBoost() {
        for (let x in textTimer) {
                textTimer[x].innerHTML = "FRENZY FRENZY FRENZY";
    }
        var intervalBoost = setInterval(()=>{

            updatePuntosText();
            now--;
             // rouge
            
            let timeOutBand = setTimeout(() => {
                //Change text timer
                timeOutfunc();
            }, 2000);
            
            //stop interval after 30s
            if(now<=0){
                clearInterval(intervalBoost);
                boostActive = false;
                boost = 1;
               // document.body.style.backgroundColor = 'rgb(255, 255, 255)'; // blanc
                updateClickText();
            }
            
        }, delai);
    }

    /**
     *  function click boost bonus
     */
    function boostBonusClick (){
         
        if(checkScore(boostBonusCost, counter) && !boostActive){
            //Decrease the score by the bonus cost
            counter -= boostBonusCost;
            UpdateDisableStateBonusBtn();
            updatePuntosText();
            document.body.style.backgroundColor = 'rgb(255, 34, 0)';

            
            now = 30;
            //change boostActive on
            boostActive = true;
            boost = 2;
        
            
            updateClickText();

            boostBonusCost = updateBonusCost(boostBonusCost, 2);
            updateBtnText(boostBonusText, "Frenzy: "+boostBonusCost+" | X200%/30sec");

            intervalBonusBoost();
            
        }
        else{
            console.log("not enough score");
        }
    }
    
    /**
     * function click bonus multiplier
     */
    function multiplierBonusClick(){        
        if(checkScore(multiplierBonusCost, counter)){
            counter -= multiplierBonusCost;
            UpdateDisableStateBonusBtn();
            updatePuntosText();
            multiplicateur();
             document.body.style.backgroundColor = 'rgb(255, 174, 0)'; // jaune
            for (let x in bandTop) {
            bandTop[x].innerHTML = 'MULTI ACTIVATED';
        }

            multiplierBonusCost = updateBonusCost(multiplierBonusCost, 1.5);
            updateBtnText(multiplierBonusText, "Multiplicator: " + Math.round(multiplierBonusCost * 100) / 100);
            updateClickText();
        }
        else{
            console.log("not enough score");
        }
    }

    ///////////////////////////////////////////////////// Code //////////////////////////////////////////////////////

    //Click
    clicker.addEventListener("click", (e)=>{
        click(); 
           let actionClicker = document.getElementById("actionClicker");
        actionClicker.style.left = `${e.offsetX - 40}px`;
        actionClicker.style.top = `${e.offsetY - 35}px`; 
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


    autoClickBonusBtn.addEventListener("click", ()=>{
        autoclickBonusClick();
    });
    
    
    boostBonusBtn.addEventListener("click", ()=>{
        boostBonusClick(); 
    });
    
    
    multiplierBonusBtn.addEventListener("click", () => {
        multiplierBonusClick();
    });