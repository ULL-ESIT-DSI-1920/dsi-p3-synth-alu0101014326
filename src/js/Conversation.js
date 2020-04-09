export default class Conversation {
    constructor(box) {
        this.box = box;
    }
    addMessage(array) {
        array.map((dialog,i) => {
            if(dialog.mode == "entirely") this.entirely(dialog, dialog.text, i);  
            if(dialog.mode == "ltl") this.letterToLetter(dialog, dialog.text, i); 
            if(dialog.mode == "wtw") this.wordToWord(dialog, dialog.text, i);         
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
        };
        speechSynthesis.speak(msg);            
    }
    wordToWord(dialog, text, i) {
        let msg = new SpeechSynthesisUtterance();
        
        msg.lang = dialog.author.msg.lang;
        msg.pitch = dialog.author.msg.pitch;
        msg.rate = dialog.author.msg.rate;
        msg.text = text;

        msg.onstart = () => this.box.innerHTML += `<div class="dialog" style="color: ${dialog.author.color}">${dialog.author.name}: <div id="fill${i}" style="display: inline-block"></div>  </div></div>`;
        msg.onboundary = (event) => document.querySelector(`#fill${i}`).innerHTML = text.substring(0, event.charIndex+event.charLength+1);
        
        speechSynthesis.speak(msg);
    }

    letterToLetter(dialog, text, i) {
        let msg = new SpeechSynthesisUtterance();
        
        msg.lang = dialog.author.msg.lang;
        msg.pitch = dialog.author.msg.pitch;
        msg.rate = dialog.author.msg.rate;
        msg.text = text;

        msg.onstart = () => {
            this.box.innerHTML += `<div class="dialog" style="color: ${dialog.author.color}">${dialog.author.name}: <div id="fill${i}" style="display: inline-block"></div>  </div></div>`;
        };
 
        msg.onboundary = (event) => {
            
            console.log(event.name, event.charIndex, event.charLength, event.elapsedTime);
            document.querySelector(`#fill${i}`).innerHTML = text.substring(0, event.charIndex+event.charLength+1);
        };
        speechSynthesis.speak(msg);
    }

    soundEffect() {}
}