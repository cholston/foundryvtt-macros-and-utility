//add to world script to allow resizing windows with the mouse wheel

Hooks.on(`setAppScaleEvent`, (app, html) => { 
    let removeScaleTooltip = foundry.utils.debounce(()=> { $('.scale-tooltip').remove(); }, 500);
    app._element.find('.window-header').off('wheel');
    app._element.find('.window-header').on('wheel', function(e){
      let change = e.originalEvent.wheelDelta>0?-1:1;
      let scale = Math.round((app.position.scale+(.1*change))*10)/10;
      app.setPosition({scale});
      $('.scale-tooltip').remove();
      $('body').append($(`<span class="scale-tooltip" style="position: absolute; top: ${e.clientY-10}px; left: ${e.clientX+10}px; pointer-events: none; color: white; background: #000; border: 1px solid white; padding:2px; z-index:1000;">${Math.trunc(scale*100)}%</span>`));
      removeScaleTooltip();
    })
  })
  Hooks.on(`renderApplication`, (app, html) => { Hooks.call(`setAppScaleEvent`, app, html) });
  Hooks.on(`renderActorSheet`, (app, html) => { Hooks.call(`setAppScaleEvent`, app, html) });
  Hooks.on(`renderItemSheet`, (app, html) => { Hooks.call(`setAppScaleEvent`, app, html) });
  Hooks.on(`renderSidebarTab`, (app, html) => { Hooks.call(`setAppScaleEvent`, app, html) });