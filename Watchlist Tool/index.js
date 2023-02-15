document.addEventListener('DOMContentLoaded', function() { 
    var staffelInput = document.getElementById('staffelInput');
    var folgeInput = document.getElementById('folgeInput');
    var zeitInput = document.getElementById('zeitInput');
    var serieTitel = document.getElementById('outputText');
    var saveButton = document.getElementById('saveButton');
    var outputText = document.getElementById('outputText');
    outputText.disabled = true;
    disableEdit(true);
    checkSeries();
    function checkSeries(){
        if(localStorage.length > 0){
            for (var i = 0; i < localStorage.length; i++) {
                var key = localStorage.key(i);
                var value = localStorage.getItem(key);
                var data = JSON.parse(value);

                createSerie(data.name);
                staffelInput.value = data.staffel;
                folgeInput.value = data.folge;
                zeitInput.value = data.zeit;
                //createSerie(key);


                
              }
        }
    }

    function disableEdit(BOOL){
        const inputs = document.getElementsByClassName('watchlistTel');
        Array.from(inputs).forEach(function(element) {
          element.disabled = BOOL;
        });
    }

    // Create Button Event Listener
    var createButton = document.getElementById('createButton');
    createButton.addEventListener("click", () => {
        saveButton.className = "topButtons notSave";
        var inputText = document.getElementById('inputText')
        if(inputText.value.length > 0){
            createSerie(inputText.value);
            inputText.value = "";
            disableEdit(false);
            clearInputs();
        }
    });
    
    // Selektiert Serie
    function selectSeries(BUTTON){
        var serieTitel = document.getElementById('outputText');
        serieTitel.value = BUTTON.value;
        const allButtons = document.getElementsByClassName('seriesButtons');
        Array.from(allButtons).forEach(function(button){
            button.className = "seriesButtons";
        });
        BUTTON.className = "seriesButtons selectedButton";
        disableEdit(true);
        if(localStorage.getItem(BUTTON.value)){
            //Lädt den eintrag
            var jsonData = localStorage.getItem(BUTTON.value);
            var data = JSON.parse(jsonData);
            staffelInput.value = data.staffel;
            folgeInput.value = data.folge;
            zeitInput.value = data.zeit;
        }
        else{
            clearInputs();
        }

    }

    function clearInputs(){
        staffelInput.value = "";
        folgeInput.value = "";
        zeitInput.value = "";
    }

    
    // Erstellt neuen Button
    function createSerie(NAME){
        var buttonListDiv = document.getElementById('buttonList');
        var newSerieButton = document.createElement("button");
        newSerieButton.innerHTML = NAME;
        newSerieButton.value = NAME;
        newSerieButton.className = "seriesButtons";
        newSerieButton.id = NAME;
        newSerieButton.onclick = function() {
            selectSeries(newSerieButton);
        };
        buttonListDiv.appendChild(newSerieButton);

        var serieTitel = document.getElementById('outputText');
        serieTitel.value = NAME;
    }
    var deleteButton = document.getElementById('deleteButton');
    deleteButton.addEventListener("click", () =>{
        var currentButton = document.getElementById(serieTitel.value);
        var name = serieTitel.value;
        currentButton.remove();
        serieTitel.value = "";
        staffelInput.value = "";
        folgeInput.value = "";
        zeitInput.value = "";
        localStorage.removeItem(name);

    });



    var staffelInput = document.getElementById('staffelInput');
    var folgeInput = document.getElementById('folgeInput');
    var zeitInput = document.getElementById('zeitInput');
    var serieTitel = document.getElementById('outputText');


    saveButton.addEventListener("click", () =>{
        SaveCurrentData(serieTitel.value, staffelInput.value, folgeInput.value, zeitInput.value);
        saveButton.className = "topButtons";
    });

    var editButton = document.getElementById('editButton');
    editButton.addEventListener("click", () =>{
        if(staffelInput.disabled){
            disableEdit(false);
            saveButton.className = "topButtons notSave";
        }
        else{
            disableEdit(true);
        }
    });
    
    

    function SaveCurrentData(NAME, STAFFEL, FOLGE, ZEIT){
        var data = {name: NAME, staffel: STAFFEL, folge: FOLGE, zeit: ZEIT};
        console.log(data);
        //Speichert den Eintrag
        var jsonData = JSON.stringify(data);
        localStorage.setItem(NAME, jsonData);
        disableEdit(true);
    }
});