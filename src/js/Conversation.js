export default class Conversation {
    constructor(box) {
        this.box = box;
    }
    addMessage(array) {
        this.msg = new SpeechSynthesisUtterance();
        array.map((dialog,i) => {
            
            this.entirely(dialog, dialog.text, i);           
        });
    }
    
    entirely(dialog, text, i) {
        let msg = new SpeechSynthesisUtterance();
            msg.text = text;
            msg.lang = dialog.author.msg.lang;
            msg.pitch = dialog.author.msg.pitch;
            msg.rate = dialog.author.msg.rate;
            msg.onstart = () => {
                this.box.innerHTML += `<div class="dialog" style="color: ${dialog.author.color}">${dialog.author.name}: ${text}</div>`;
                dialog.author = 1;
            };
            speechSynthesis.speak(msg);            
    }
    wordToWord() {}
    letterToLetter() {}
}