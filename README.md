# Práctica 3: Synth
## 1. Clase Profile
```javascript
export default class Profile {
    constructor(name, features) {

        // atributes
        this.name = name;
        this.color = features.color;
        this.msg = new SpeechSynthesisUtterance();

        // features
        this.msg.lang = features.lang;
        this.msg.rate = features.rate;
        this.msg.pitch = features.pitch;
        this.msg.volume = features.volume;
        this.counting = 0;
    }
}
```

La clase Profile es un mero contenedor de informción para guardar los perfiles de los usuarios que vayan a conversar preparando un `SpeechSynthesisUtterance` que, aunque no va a ser el objeto que será reproducido con speak edebido a la asincronicidad, se usará para traspasar valores en las llamadas de los métodos del `Conversation` que es donde se crean nuevos `SpeechSynthesisUtterance` que serán sobre el que se haga speak. Esto se ve mejor cuando analicemos la clase `Conversation`.

Antes de nada, aclarar que se crean los siguientes perfiles.

```javascript
const p1 = new Profile("Kaerit", {lang: "nb-NO", rate: 2, pitch: 2, color: "#ffa500", volume: 1});
const p2 = new Profile("Keko", {lang: "it-IT", rate: 0.1, pitch: 0.1, color: "#00fff3", volume: 1});
const p3 = new Profile("Nun", {lang: "es", rate: 1, pitch: 1, color: "#9d00ff", volume: 1});
```

## 2. Clase Conversation

La calse conversation lo único que recibe en el constructor es el objeto donde se va a ir creando elementos del DOM, correspondiente a los bloques de díalogos dentro de un div identificado por chatbox.
```html
 <div id="chatbox"></div>
```
que corresponde con el chatbox que recibe la clase
```javascript
constructor(box) {
    this.box = box;
}
```

Siendo obtenido desde el index
```javascript
const conversation = new Conversation(document.querySelector('#chatbox'));
``` 

Finalmente, se llama al método `addMessage`, que es quien se encarga de inicializarlo todo. Que recibe un array del siguiente estilo:
```javascript
 conversation.addMessage([
        { author: p3, text: "AAAHaaAAAaaaaaAaaaaaA aAAaaaaAAaaAAAAaAAAaaa AAAAAaAAAaaa", mode: "ltl"},
        { author: p1, text: "¡Hola a todos! ¿Qué tal están?",               mode: "wtw" },
        { author: p2, text: "Muy bien, ¡gracias!",                          mode: "entirely" },
        { author: p3, text: "Vaya caras largas traen algunos",               mode: "wtw" },
        { author: p1, text: "Ya ves, hay que animarse ¡Hombre!",             mode: "wtw" },
        { author: p3, text: "Bueno, bueno, tampoco nos vengamos arriba",     mode: "wyw" },
        { author: p2, text: "Eh...",                                         mode: "entirely" },
        { author: p1, text: "¡Alehop!",                                      mode: "wtw" },
        { author: p3, text: "saca wikicheli pa podé gozá, vaamoh a montaaa un wateeekeee",  mode: "wtw" },
    ]);
```

Y en el método.

```javascript
addMessage(array) {
        array.map((dialog,i) => {
            if(dialog.mode == "entirely") this.entirely(dialog, dialog.text, i);  
            if(dialog.mode == "ltl") this.letterToLetter(dialog, dialog.text, i); 
            if(dialog.mode == "wtw") this.wordToWord(dialog, dialog.text, i);         
        });
    }
```

Irá haciendo llamadas de tratamiento diálogo a díalogo, según el modo especificado.
    a. Entirely: El diálogo se plasma completo independiente de la voz.
    b. letterToLetter: El texto se añade letra a letra de forma porgresiva con el sintetizador.
    c. wordToWord: El texto se añade de forma progresiva palabra a palabra.

## 3. Progresión del texto
### 3.1. Entirely
```javascript
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
```

### 3.2. Palabra a palabra
```javascript
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
```

### 3.3. Letra a letra
```javascript
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
```

## 4. Sound effect

*dsi-p3-synth-dkuroi created by GitHub Classroom*
