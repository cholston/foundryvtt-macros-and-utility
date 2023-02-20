//will write the chat log to a page in the journal defined below and prompt to save to disk
//requires the "Our Sessions" journal to exist and there must be at least one page there before this script works.

//// v10 version////
const date = new Date().toDateString();
const pageName = `Session ${date}`;
const fileName = `fvtt-log-${date.replace(/\s/g, "-")}.txt`;
const journal = game.journal.getName("Our Sessions");
let entry = journal.pages.find(e => e.name === pageName);
if(!entry) {
    //let messages = game.messages.filter(m => !m.rolls.length && !m.content.includes("<div "));
    let messages = game.messages.filter(m => true);
    let pageContent = "";
    let fileContent = "";
    for (let message of messages) {
        let time = new Date(message.timestamp).toLocaleDateString(`en-US`, {weekday: "short", hour: "numeric", minute: "numeric", second: "numeric"});
        let messageAuthor = message.speaker.alias !== undefined ? message.speaker.alias : "Debinani";
        let messageContent = message.content;
        pageContent += `<p>[${time}] ${messageAuthor}:</p><p>${messageContent}</p><p>--------------------------</p>`;
        fileContent += `[${time}] ${messageAuthor}:\n${messageContent}\n--------------------------\n`;
    }
    await JournalEntryPage.create({name: pageName, text: {content: pageContent, format: 1}, title: {show: false, level: 1}, "ownership.default": 3, sort: journal.sheet._pages.at(-1).sort + CONST.SORT_INTEGER_DENSITY}, {parent: journal});
    journal.sheet.render(true);
    saveDataToFile(fileContent, "text/plain", fileName);
}
else return ui.notifications.warn(`Journal Page - ${pageName} already exists`);