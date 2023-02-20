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
Select the current ship status.
`

let dialogEditor = new Dialog({
  title: `Ship Power Systems`,
  content: content,
  buttons: {
    none: {
      icon: "<i class='fas fa-eye'></i>",
      label: `All Off`,
      callback: () => {
           for (const [key, value] of Object.entries(Tagger.getByTag("emergencyLight", {"allScenes": true})))
            {
                const updates = value.map(l => ({_id: l.id,  "hidden": true}));
                const scn = game.scenes.get(key)
                scn.updateEmbeddedDocuments("AmbientLight", updates);
                scn.update({"globalLight": false, "darkness":1})
            }        
            for (const [key, value] of Object.entries(Tagger.getByTag("panelLight", {"allScenes": true})))
            {
                const updates = value.map(l => ({_id: l.id,  "hidden": true}));
                const scn = game.scenes.get(key)
                scn.updateEmbeddedDocuments("AmbientLight", updates);
            }
            for (const [key, value] of Object.entries(Tagger.getByTag("engineSound", {"allScenes": true})))
            {
                const updates = value.map(l => ({_id: l.id,  "hidden": true}));
                const scn = game.scenes.get(key)
                scn.updateEmbeddedDocuments("AmbientSound", updates);
            }


        dialogEditor.render(true)
      }
    },
    actionstations: {
        icon: "<i class='fas fa-bullseye'></i>",
        label: `Action Stations`,
        callback: () => {
            for (const [key, value] of Object.entries(Tagger.getByTag("emergencyLight", {"allScenes": true})))
            {
                const updates = value.map(l => ({_id: l.id,  "hidden": true}));
                const scn = game.scenes.get(key)
                scn.updateEmbeddedDocuments("AmbientLight", updates);
                scn.update({"globalLight": true, "darkness":.8})
            }      
          dialogEditor.render(true)
        }
      },
    reactor: {
      icon: "<i class='fas fa-bullseye'></i>",
      label: `Reactor Online`,
      callback: () => {
        for (const [key, value] of Object.entries(Tagger.getByTag("engineSound", {"allScenes": true})))
        {
            const updates = value.map(l => ({_id: l.id,  "hidden": false}));
            const scn = game.scenes.get(key)
            scn.updateEmbeddedDocuments("AmbientSound", updates);
        }
        dialogEditor.render(true)
      }
    },
    reactoroff: {
        icon: "<i class='fas fa-bullseye'></i>",
        label: `Reactor Offline`,
        callback: () => {
          for (const [key, value] of Object.entries(Tagger.getByTag("engineSound", {"allScenes": true})))
          {
              const updates = value.map(l => ({_id: l.id,  "hidden": true}));
              const scn = game.scenes.get(key)
              scn.updateEmbeddedDocuments("AmbientSound", updates);
          }
          dialogEditor.render(true)
        }
      },
    emergencylights: {
      icon: "<i class='fas fa-traffic-light'></i>",
      label: `Emergency Lights`,
      callback: () => {
        for (const [key, value] of Object.entries(Tagger.getByTag("emergencyLight", {"allScenes": true})))
        {
            const updates = value.map(l => ({_id: l.id,  "hidden": false}));
            const scn = game.scenes.get(key)
            scn.updateEmbeddedDocuments("AmbientLight", updates);
        }   
        dialogEditor.render(true)
      }
    },
    emergencylightsoff: {
        icon: "<i class='fas fa-traffic-light'></i>",
        label: `Emergency Lights Off`,
        callback: () => {
          for (const [key, value] of Object.entries(Tagger.getByTag("emergencyLight", {"allScenes": true})))
          {
              const updates = value.map(l => ({_id: l.id,  "hidden": true}));
              const scn = game.scenes.get(key)
              scn.updateEmbeddedDocuments("AmbientLight", updates);
          }   
          dialogEditor.render(true)
        }
      },
    panellights: {
        icon: "<i class='fas fa-traffic-light'></i>",
        label: `Panel Lights`,
        callback: () => {
          for (const [key, value] of Object.entries(Tagger.getByTag("panelLight", {"allScenes": true})))
          {
              const updates = value.map(l => ({_id: l.id,  "hidden": false}));
              const scn = game.scenes.get(key)
              scn.updateEmbeddedDocuments("AmbientLight", updates);
          }   
          dialogEditor.render(true)
        }
      },
      panellightsoff: {
        icon: "<i class='fas fa-traffic-light'></i>",
        label: `Panel Lights Off`,
        callback: () => {
          for (const [key, value] of Object.entries(Tagger.getByTag("panelLight", {"allScenes": true})))
          {
              const updates = value.map(l => ({_id: l.id,  "hidden": true}));
              const scn = game.scenes.get(key)
              scn.updateEmbeddedDocuments("AmbientLight", updates);
          }   
          dialogEditor.render(true)
        }
      },
      runninglights: {
        icon: "<i class='fas fa-traffic-light'></i>",
        label: `Running Lights`,
        callback: () => {
          for (const [key, value] of Object.entries(Tagger.getByTag("panelLight", {"allScenes": true})))
          {
              const scn = game.scenes.get(key)
              scn.update({"globalLight": true, "darkness":0})
          }   
          dialogEditor.render(true)
        }
      },
      runninglightsoff: {
        icon: "<i class='fas fa-traffic-light'></i>",
        label: `Running Lights Off`,
        callback: () => {
          for (const [key, value] of Object.entries(Tagger.getByTag("panelLight", {"allScenes": true})))
          {
              const scn = game.scenes.get(key)
              scn.update({"globalLight": true, "darkness":1})
          }   
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