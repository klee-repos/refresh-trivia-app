var PlaybackEngine = require('../PlaybackEngine');

var pe = new PlaybackEngine();

pe
.say("Hello. ")
.pause("200ms")
.play("http://localhost:8080/test")
.say("How are you doing? ")
console.log(pe.getSSML());