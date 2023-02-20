//presents a dialog allowing a user to select a flashlight or night vision goggles

const artificialLight = {
    "alpha": 0.1,
    "angle": 360,
    "animation": {"type": "none"},
    "color": "#a6bbdd",
    "luminosity": 0.5
}

async function tokenUpdate(lightData, sightData) {
  if (canvas.tokens.controlled.length === 0){
    return ui.notifications.error("No token is selected!")
  }
  const tokens = canvas.tokens.controlled.map(token => {
      return {
          _id: token.id,
          light: {...lightData},
          sight: {...sightData}
      }
  })
  await canvas.scene.updateEmbeddedDocuments('Token', tokens)

}

const dialogOptions = {
    id: "lightPickerSelector",
    width: 320
}

const content = `
<style>
  #lightPickerSelector .dialog-button { margin: auto; min-width: 200px; }
  #lightPickerSelector .light { min-width: 200px; }
  #lightPickerSelector .lightHeightened { min-width: 75px; }
</style>
Pick the light source the selected token is holding.
`

let dialogEditor = new Dialog({
  title: `Personal Visibility Kit`,
  content: content,
  buttons: {
    none: {
      icon: "<i class='fas fa-eye'></i>",
      label: `None`,
      callback: () => {
        tokenUpdate({"bright": 0, "dim": 0, "angle": 360,}, {"visionMode": "basic"});
        dialogEditor.render(true)
      }
    },
   
    flashlight: {
      icon: "<i class='fas fa-bullseye'></i>",
      label: `Flashlight`,
      callback: () => {
        tokenUpdate({...artificialLight, "bright": 60, "dim": 120, "angle": 45})
        dialogEditor.render(true)
      }
    },
    nightVision: {
      icon: "<i class='fas fa-traffic-light'></i>",
      label: `Night Vision Goggles`,
      callback: () => {
        tokenUpdate({}, {"range": 30, "visionMode": "lightAmplification"})
        dialogEditor.render(true)
      }
    },
    close: {
      icon: "<i class='fas fa-times'></i>",
      label: `Close`
    },
  },
  default: "close",
  close: () => {}
}, dialogOptions)

dialogEditor.render(true)