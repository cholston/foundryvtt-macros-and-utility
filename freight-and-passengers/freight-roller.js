/*
MGT2e die roller for passengers, freight, and mail

Uncomment dialogTemplate and change the selector on origin and destination below if you don't want my homebrew worlds.  Which you don't.

*/

async function freightAndPassengerMacro(){

    let whistlersReach = `
        <option value="B765634-9">Foxglove - Shithole</option>
        <option value="D00A51B-A">Foxglove - Nevada City</option>    
        <option value="B765634-9">Foxglove - Sonora</option>    
        <option value="A00096A-A">Foxglove - Foxglove/Sunrise Bay</option>    
        <option value="D00A51B-A">Foxglove - Klondike</option>            
        <option value="B765634-9">Roberts - Roberts</option>    
        <option value="B645619-8">Roberts - Myrr</option>
        <option value="C50031A-A">Whistler - Traeger</option>
        <option value="CS00447-A">Whistler - Hole</option>
        <option value="C73131A-A">Whistler - Simmons</option>
        <option value="B86A715-A">Whistler - Musk</option>
        <option value="A866938-A">Whistler - Whistler</option>
        <option value="C861600-A">Whistler - Korolev</option>
        <option value="C9C031A-A">Whistler - Mao</option>
        <option value="DLGG313-A">Whistler - Brin</option>
        <option value="D41521A-A">Whistler - Cartwright</option>
        <option value="D41521A-A">Whistler - Toussaint</option>
        <option value="ALGG51A-A">Whistler - Yang</option>
        <option value="C00061A-A">Whistler - Freyr</option>
        <option value="A267944-A">Whistler - Demeter</option>
        <option value="DS0011A-A">Whistler - Fuchs</option>
        <option value="XS00000-A">Whistler - Yama</option>

        

        

    `;

    let dialogTemplate = `
        <div>
            <h2>Freight, Passenger, & Mail Lots</h2>
            <div>
                <h3>System Info:</h3>
                <label>Origin World: <select name="originWorld"/>` + whistlersReach + `</select></label><br>
                <label>Destination World: <select name="destinationWorld">` + whistlersReach + `</select></label><br>
                <label>Origin Restriction: <select name="originRestriction" value="Green">
                    <option value="Green">Green</option>
                    <option value="Amber">Amber</option>
                    <option value="Red">Red</option>
                </select></label><br>
                <label>Destination Restriction: <select name="destinationRestriction" value="Green">
                    <option value="Green">Green</option>
                    <option value="Amber">Amber</option>
                    <option value="Red">Red</option>
                </select></label><br>
                <label>Distance in Parsecs: <input type="text" name="routeDistance" value="1" /></label><br>
            </div><br>
            <div>
                <h3>Crew Info:</h3>
                <label>Chief Steward's Skill: <input type="text" name="chiefSteward" value="0" /></label><br>
                <label>Passenger Roll: Broker / Carouse / Streetwise Effect: <input type="text" name="passengerRoll" value="0" /></label><br>
                <label>Freight Roll: Broker / Streetwise Effect: <input type="text" name="freightRoll" value="0" /></label><br>             
                <label>Highest Navy or Scout Rank: <input type="text" name="scoutRank" value="0" /></label><br>
                <label>Highest SOC DM: <input type="text" name="socRank" value="0" /></label><br>
                <label>Ship is armed: <input type="checkbox" name="shipArmed" checked /></label><br>
            </div>
        </div><br>
    `;


    /* let dialogTemplate = `
        <div>
            <h2>Freight, Passenger, & Mail Lots</h2>
            <div>
                <h3>System Info:</h3>
                <label>Origin World: <input type="text" name="originWorld" value="A866938-A" /></label><br>
                <label>Destination World: <input type="text" name="destinationWorld" value="A866938-A" /></label><br>
                <label>Origin Restriction: <select name="originRestriction" value="Green">
                    <option value="Green">Green</option>
                    <option value="Amber">Amber</option>
                    <option value="Red">Red</option>
                </select></label><br>
                <label>Destination Restriction: <select name="destinationRestriction" value="Green">
                    <option value="Green">Green</option>
                    <option value="Amber">Amber</option>
                    <option value="Red">Red</option>
                </select></label><br>
                <label>Distance in Parsecs: <input type="text" name="routeDistance" value="1" /></label><br>
            </div><br>
            <div>
                <h3>Crew Info:</h3>
                <label>Chief Steward's Skill: <input type="text" name="chiefSteward" value="0" /></label><br>
                <label>Passenger Roll: Broker / Carouse / Streetwise Effect: <input type="text" name="passengerRoll" value="0" /></label><br>
                <label>Freight Roll: Broker / Streetwise Effect: <input type="text" name="freightRoll" value="0" /></label><br>             
                <label>Highest Navy or Scout Rank: <input type="text" name="scoutRank" value="0" /></label><br>
                <label>Highest SOC DM: <input type="text" name="socRank" value="0" /></label><br>
                <label>Ship is armed: <input type="checkbox" name="shipArmed" checked /></label><br>
            </div>
        </div><br>
    `; */

    let dialogData = {
        title: "Traveller RPG Macro",
        content: dialogTemplate,
        buttons: {
          rollNow: {
            icon: '<i class="fas fa-dice"></i>',
            label: "Roll Now!",
            callback: async (html) => {
                // Get selected options and alt skill values
                const origin = html.find('select[name="originWorld"]').val();
                const originRestriction = html.find('select[name="originRestriction"]').val();
                const destination = html.find('select[name="destinationWorld"]').val();
                const destinationRestriction = html.find('select[name="destinationRestriction"]').val();

                const routeDistance = html.find('input[name="routeDistance"]').val();

                const chiefSteward = html.find('input[name="chiefSteward"]').val();
                const passengerRoll = html.find('input[name="passengerRoll"]').val();
                const freightRoll = html.find('input[name="freightRoll"]').val();

                const scoutRank = html.find('input[name="scoutRank"]').val();
                const socRank = html.find('input[name="socRank"]').val();
                const isArmed = html.find('input[name="shipArmed"]').prop("checked");


                let resultMessage = "<h2>Passenger & Freight Lots:</h2>";
                resultMessage += "<strong>Origin World: " + origin + " (" + originRestriction + ")</strong><br>";
                resultMessage += "<strong>Destination World: " + destination  + " (" + destinationRestriction + ")</strong><br>";
                resultMessage += "<strong>Route Distance: " + routeDistance + "</strong><br>";
                resultMessage += "<strong>Chief Steward's DM: " + chiefSteward  + "</strong><br>";
                resultMessage += "<strong>Passenger Roll: " + passengerRoll  + "</strong><br>";
                resultMessage += "<strong>Freight Roll: " + freightRoll  + "</strong><br>";
                resultMessage += "<strong>Navy/Scout Rank: " + scoutRank  + "</strong><br>";
                resultMessage += "<strong>SOC DM: " + socRank  + "</strong><br>";
                resultMessage += "<strong>Ship Armed: " + isArmed  + "</strong><br>";

                let originUWP = parseUWP(origin);
                let destinationUWP = parseUWP(destination);

                resultMessage += "<br><h3>Available Passengers</h3>";
                resultMessage += "<table><tr><th>Fare</th><th>Number</th></tr>";

                let highPassDM = getPassengerDM(chiefSteward, passengerRoll, "HIGH", originUWP, originRestriction, destinationUWP, destinationRestriction, routeDistance);
                let highPass = rollForPassengers(highPassDM);
                resultMessage += "<tr><td>High Passage</td><td>" + highPass + "</td></tr>"
                
                let midPassDM = getPassengerDM(chiefSteward, passengerRoll, "", originUWP, originRestriction, destinationUWP, destinationRestriction, routeDistance);
                let midPass = rollForPassengers(midPassDM);
                resultMessage += "<tr><td>Middle Passage</td><td>" + midPass + "</td></tr>"

                let basicPassDM = getPassengerDM(chiefSteward, passengerRoll, "", originUWP, originRestriction, destinationUWP, destinationRestriction, routeDistance);
                let basicPass = rollForPassengers(basicPassDM);
                resultMessage += "<tr><td>Basic Passage</td><td>" + basicPass + "</td></tr>"

                let lowPassDM = getPassengerDM(chiefSteward, passengerRoll, "LOW", originUWP, originRestriction, destinationUWP, destinationRestriction, routeDistance);
                let lowPass = rollForPassengers(lowPassDM);
                resultMessage += "<tr><td>Low Berth</td><td>" + lowPass + "</td></tr>"

                resultMessage += "</table>"

                
                resultMessage += "<br><h3>Available Freight Lots</h3>";
                resultMessage += "<table><tr><th>Lot Size (Tons)</th><th>Lots Available</th></tr>";

                let freightLots = [];

                let majorFreightDM = getFreightDM(freightRoll, "MAJOR", originUWP, originRestriction, destinationUWP, destinationRestriction, routeDistance);
                let majorFreightLots = rollForFreight(majorFreightDM);
                for (let i = 0; i < majorFreightLots; i++) {
                    let lotSize = new Roll("1d6*10").evaluate({ async: false });
                    freightLots.push(lotSize.total);
                }
                
                let minorFreightDM = getFreightDM(freightRoll, "MINOR", originUWP, originRestriction, destinationUWP, destinationRestriction, routeDistance);
                let minorFreightLots = rollForFreight(minorFreightDM);
                for (let i = 0; i < minorFreightLots; i++) {
                    let lotSize = new Roll("1d6*5").evaluate({ async: false });
                    freightLots.push(lotSize.total);
                }

                let incidentalFreightDM = getFreightDM(freightRoll, "INCIDENTAL", originUWP, originRestriction, destinationUWP, destinationRestriction, routeDistance);
                let incidentalFreightLots = rollForFreight(incidentalFreightDM);
                for (let i = 0; i < incidentalFreightLots; i++) {
                    let lotSize = new Roll("1d6").evaluate({ async: false });
                    freightLots.push(lotSize.total);
                }
                
                //maybe someday replace "lot" with a random goodie type
                let groupedLots = freightLots.reduce((p,c) => {
                    if (!p.hasOwnProperty(c)) {
                        p[c] = 0;
                      }
                      p[c]++;
                      return p;
                },{});

                  
                var countsExtended = Object.keys(groupedLots).map(k => {
                    return {name: k, count: groupedLots[k]}; });

                countsExtended.sort((a, b) => parseFloat(b.name) - parseFloat(a.name));

                countsExtended.forEach(element => {
                    resultMessage += "<tr><td>" + element.name + "</td><td>" + element.count + "</td></tr>"
                });

                resultMessage += "</table>"


                //let's do the mail
                resultMessage += "<br><h3>Available Mail</h3>";
                resultMessage += "<table><tr><th>Containers</th><th>Tons</th><th>Payment</th></tr>";

                let mailContainers = rollForMail(minorFreightDM, isArmed, originUWP, scoutRank, socRank);

                resultMessage += "<tr><td>" + mailContainers + "</td><td>" + mailContainers * 5 + "</td><td>" + Number(mailContainers * 25000).toLocaleString() + "</td></tr>";


                resultMessage += "</table>"
         
    
              // Display the results in a chat message
              ChatMessage.create({
                content: resultMessage,
                speaker: ChatMessage.getSpeaker(),
              });

              console.log(resultMessage);
            },
          },
          cancel: {
            icon: '<i class="fas fa-times"></i>',
            label: "Cancel",
          },
        },
        default: "rollNow",
      };
    
      // Show the dialog
      let dialog = await new Dialog(dialogData).render(true);



}

function rollForMail(freightDM, isArmed, originUWP, scoutRank, socRank){
    let returnCount = 0;

    let rollDM = 0;

    if (freightDM <= -10) rollDM += -2;
    if (freightDM >= -9 && freightDM <= -5) rollDM += -1;
    if (freightDM >= -4 && freightDM <= 4) rollDM += 0;
    if (freightDM >= 5 && freightDM <= 9) rollDM += 1;
    if (freightDM > 10) rollDM += 2;

    if(isArmed) rollDM += 2;

    if(originUWP.techL <=5) rollDM += -4;

    rollDM += Number(scoutRank);
    rollDM += Number(socRank);

    const r = new Roll('2D6+@mod', { mod: rollDM }).evaluate({ async: false });

    console.log("Rolled " + r.formula + " for Mail with a result of: " + r.total);

    if(r.total >= 12){
        returnCount = new Roll("1d6").evaluate({ async: false }).total;
        console.log("Rolled " + returnCount + " mail containers.");
    }

    

    return returnCount;
}

function rollForFreight(freightDM){
    let returnCount = 0;

    

    const r = new Roll('2D6+@mod', { mod: freightDM }).evaluate({ async: false });

    console.log("Rolled " + r.formula + " for Freight with a result of: " + r.total);

    tt = r.total;

    let passRoll = "0d6";

    if(tt == 2 || tt ==3) passRoll = "1d6";
    if(tt >= 4 && tt <= 5) passRoll = "2d6";
    if(tt >= 6 && tt <= 8) passRoll = "3d6";
    if(tt >= 9 && tt <= 11) passRoll = "4d6";
    if(tt >= 12 && tt <= 14) passRoll = "5d6";
    if(tt >= 15 && tt <= 16) passRoll = "6d6";
    if(tt == 17) passRoll = "7d6";
    if(tt == 18) passRoll = "8d6";
    if(tt == 19) passRoll = "9d6";
    if(tt >= 20) passRoll = "10d6";

    const pass = new Roll(passRoll).evaluate({ async: false });

    console.log("Rolled " + pass.formula + " for Freight Lots with a result of: " + pass.total);

    returnCount = pass.total;

    return returnCount;
};


function getFreightDM(freightRoll, freightType, originUWP, originRestriction, destinationUWP, destinationRestriction, distance)
{

    let rollDM = 0;

    rollDM += Number(freightRoll);
    
    
    if(freightType.toUpperCase() == "MAJOR") rollDM += -4;
    if(freightType.toUpperCase() == "MINOR") rollDM += 0;
    if(freightType.toUpperCase() == "INCIDENTAL") rollDM += 2;

   
    rollDM += planetFreightMod(originUWP, originRestriction);
    rollDM += planetFreightMod(destinationUWP, destinationRestriction);
   
    rollDM += ((Number(distance) - 1) * -1);

    
    return rollDM;

}

function planetFreightMod(planetUWP, planetRestriction){
    let returnMod = 0;

    if(planetUWP.pop <= 1) returnMod += -4;
    if(planetUWP.pop == 6 || planetUWP.pop == 7) returnMod += 2;
    if(planetUWP.pop >= 8) returnMod += 4;

    
    if(planetRestriction == "Red") returnMod += -6;
    if(planetRestriction == "Amber") returnMod += -2;

    returnMod += starportMod(planetUWP.starport);

    if(planetUWP.techL <= 6) returnMod += -1;
    if(planetUWP.techL >= 9) returnMod += 2;

    return returnMod;
}


function rollForPassengers(passsengerDM){
    let returnCount = 0;

    

    const r = new Roll('2D6+@mod', { mod: passsengerDM }).evaluate({ async: false });

    console.log("Rolled " + r.formula + " for Passengers with a result of: " + r.total);

    tt = r.total;

    let passRoll = "0d6";

    if(tt == 2 || tt ==3) passRoll = "1d6";
    if(tt >= 4 && tt <= 6) passRoll = "2d6";
    if(tt >= 7 && tt <= 10) passRoll = "3d6";
    if(tt >= 11 && tt <= 13) passRoll = "4d6";
    if(tt >= 14 && tt <= 15) passRoll = "5d6";
    if(tt == 16) passRoll = "6d6";
    if(tt == 17) passRoll = "7d6";
    if(tt == 18) passRoll = "8d6";
    if(tt == 19) passRoll = "9d6";
    if(tt >= 20) passRoll = "10d6";

    const pass = new Roll(passRoll).evaluate({ async: false });

    console.log("Rolled " + pass.formula + " for Passengers with a result of: " + pass.total);

    returnCount = pass.total;

    return returnCount;
}

function getPassengerDM(chiefSteward, passengerRoll, passengerType, originUWP, originRestriction, destinationUWP, destinationRestriction, distance)
{

    let rollDM = 0;

    rollDM += Number(chiefSteward);
    rollDM += Number(passengerRoll);
    
    
    if(passengerType.toUpperCase() == "HIGH") rollDM += -4;
    if(passengerType.toUpperCase() == "LOW") rollDM += 1;

    
    //origin mods
    rollDM += planetPassengerMod(originUWP, originRestriction);
    rollDM += planetPassengerMod(destinationUWP, destinationRestriction);
       

    
    rollDM += ((Number(distance) - 1) * -1);

    
    return rollDM;

}

function planetPassengerMod(planetUWP, planetRestriction){
    let returnMod = 0;

    if(planetUWP.pop <= 1) returnMod += -4;
    if(planetUWP.pop == 6 || planetUWP.pop == 7) returnMod += 1;
    if(planetUWP.pop >= 8) returnMod += 3;

    
    if(planetRestriction == "Red") returnMod += -4;
    if(planetRestriction == "Amber") returnMod += 1;

    returnMod += starportMod(planetUWP.starport);

    return returnMod;
}


function starportMod(starportType){
    let returnMod = 0;

    switch(starportType){
        case "A": 
            returnMod = 2;
            break;
        case "B":
            returnMod = 1;
            break;
        case "E": 
            returnMod = -1;
            break;
        case "X":
            returnMod = -3;
        break;
    }

    return returnMod;
}

function parseUWP (UWPprofile){
   

    // Strip out dash if used in profile
     UWPprofile = UWPprofile.replace('-', '');

    if (UWPprofile.length > 7) {
        const parsedUWP = {
            starport: UWPprofile[0],
            size: hexToBase10(UWPprofile[1]),
            atmo: hexToBase10(UWPprofile[2]),
            hydro: hexToBase10(UWPprofile[3]),
            pop: hexToBase10(UWPprofile[4]),
            techL: hexToBase10(UWPprofile[7])

        };

        return parsedUWP;
    }
    

   


}

// Convert hex value to base10
function hexToBase10 (value) {
    switch (value.toUpperCase()) {
      case 'A':
        return (10);
      case 'B':
        return (11);
      case 'C':
        return (12);
      case 'D':
        return (13);
      case 'E':
        return (14);
      case 'F':
        return (15);
      case 'G':
        return (16);
      default:
        return (Number(value));
    }
}

freightAndPassengerMacro();