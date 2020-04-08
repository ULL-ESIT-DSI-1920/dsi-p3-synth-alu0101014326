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