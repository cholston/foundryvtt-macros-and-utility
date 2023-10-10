/*
    uses the Sequencer module to throw an image up full screen with audio
    adjust delay times to get the fade in/hold/fade out to sync up properly
*/

let audioFile = "global/audio/Dradis%20Sound.m4a";
let fadeIn = 1500;
let fadeOut = 1500;
let holdDuration = 8000;
let delayDuration = 2000;
let delayedHold = holdDuration - delayDuration;
let bgColor = "0x000000";

//preload everything for the clients so there's a chance it all finishes simultaneously
Sequencer.Preloader.preloadForClients([audioFile]);


let currentDate = SimpleCalendar.api.currentDateTimeDisplay();
let dateString = currentDate.weekday + ", " + currentDate.day + ' ' + currentDate.monthName +  " " + currentDate.yearPrefix + currentDate.year;



let value = await new Promise((resolve) => {
    new Dialog({
      modal: true,
      title: 'Input Marquee Text',
      content: `<table style="width:100%"><tr><th><label>Marquee Text</label></th><td><input type="text" name="input"/></td></tr></table>`,
      buttons: {
        Ok: {
          label: 'Ok',
          callback: (html) => { resolve(html.find('input').val()); }
        }
      },
      default: "Ok",
      render: (html) => {
        html.find("[name=input]").focus();
      }
    }).render(true);
  });

  

const style = {
   "fill": "#ffffff",
    "fontFamily": "\"Courier New\", Courier, monospace",
    "fontSize": 36
};

new Sequence()
    .sound(audioFile)
    .effect()
            .text(dateString, style)
            .fadeIn(fadeIn)
            .duration(holdDuration)
            .fadeOut(fadeOut)
            .screenSpace()
            .screenSpaceAnchor({ x: 0.5, y: 0.4 })
            .zIndex(2)
            .screenSpaceAboveUI(true)
    .effect()
            .text(value, style)
            .delay(delayDuration)
            .fadeIn(fadeIn)
            .duration(delayedHold)
            .fadeOut(fadeOut)
            .screenSpace()
            .screenSpaceAnchor({ x: 0.5, y: 0.6 })
            .zIndex(2)
            .screenSpaceAboveUI(true)
    .effect()
            .shape("rectangle", { width: 5000, height: 5000, fillColor: bgColor, fillAlpha: 1 })
            .fadeIn(fadeIn)
            .duration(holdDuration)
            .fadeOut(fadeOut)
            .screenSpace()
            .screenSpaceScale({ fitX: true, fitY: true })
            .screenSpaceAnchor({ x: 0, y: 0 })
            .zIndex(1)
            .screenSpaceAboveUI(true)
.play()