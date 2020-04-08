import Profile from './Profile.js';
import Conversation from './Conversation.js';

console.log(document.querySelector('#curtain > h1'));

const p1 = new Profile("Kaerit", {lang: "nb-NO", rate: 2, pitch: 2, color: "#ffa500", volume: 1});
const p2 = new Profile("Keko", {lang: "it-IT", rate: 0.1, pitch: 0.1, color: "#00fff3", volume: 1});
const p3 = new Profile("Nun", {lang: "es", rate: 1, pitch: 1, color: "#9d00ff", volume: 1});

const conversation = new Conversation(document.querySelector('#chatbox'));

// BEGIN EVENTS BASE
document.querySelector('#curtain > h1').addEventListener('click', () => {
    document.querySelector('#curtain').style.visibility = 'hidden';
    document.querySelector('#chatbox').style.visibility = 'visible';

    
    conversation.addMessage([
        { author: p1, text: "¡Hola a todos! ¿Qué tal están?" },
        { author: p2, text: "Muy bien, ¡gracias!" },
        { author: p3, text: "Vaya caras largas traen algunos" },
        { author: p1, text: "Ya ves, hay que animarse ¡Hombre!" },
        { author: p3, text: "Bueno, bueno, tampoco nos vengamos arriba" },
        { author: p2, text: "Eh..." },
        { author: p1, text: "¡Alehop!" },
        { author: p3, text: "saca wikicheli pa podé gozá, vaamoh a montaaa un wateeekeee" },
    ]);
});

// END EVENTS BASE

/*
var msg = new SpeechSynthesisUtterance();

// atributos
msg.lang = "es";
msg.rate = 1;
msg.pitch = 0;
msg.volume = 1;

var count = 0;
//msg.onstart = () => {};
msg.onend = () => {msg.text = " "+count++; speechSynthesis.speak(msg);}
*/