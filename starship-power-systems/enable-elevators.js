for (const [key, value] of Object.entries(Tagger.getByTag("elevatorPanel", {"allScenes": true})))
{
    const updates = value.map(l => ({_id: l.id,  "flags.monks-active-tiles.active": true}));
    const scn = game.scenes.get(key)
    scn.updateEmbeddedDocuments("Tile", updates);

}