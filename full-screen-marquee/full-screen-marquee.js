/*
    uses the Sequencer module to throw an image up full screen with audio
    adjust delay times to get the fade in/hold/fade out to sync up properly
*/

let audioFile = "global/audio/GirlFromIpanema.mp3";
let imageFile = "global/whistlers-reach/tiles/Chapter%204%20Black.png";
let fadeIn = 1500;
let fadeOut = 1500;
let holdDuration = 5000;
let bgColor = "0x000000";

//preload everything for the clients so there's a chance it all finishes simultaneously
Sequencer.Preloader.preloadForClients([imageFile, audioFile]);

new Sequence()
    .sound(audioFile)
    .effect()
            .file(imageFile)
            .fadeIn(fadeIn)
            .duration(holdDuration)
            .fadeOut(fadeOut)
            .screenSpace()
            .screenSpaceScale({ fitX: true, ratioY: true })
            .screenSpaceAnchor({ x: 0.5, y: 0.5 })
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