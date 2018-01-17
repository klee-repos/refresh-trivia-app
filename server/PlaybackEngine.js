var Playback = function(){
    var ssmlOutput = ["<speak>"];
    var estimatedOutputTime = 0; 

    this.say = function(phrase){
        ssmlOutput.push(phrase);
        return this;
    }

    this.pause = function(time, unit){
        //Assume milliseconds unless overridden
        if(!unit || (unit != 'ms' && unit != 's')) unit = 'ms' 

        ssmlOutput.push('<break time="'+ time+unit +'"/>')
        return this;
    }

    this.pitch = function(){

    }

    this.rate = function(){
        //Audio vs speech
    }

    this.emphasis = function(){
        
    }

    this.play = function(url, altSpeech){
        ssmlOutput.push('<audio src="'+url+'">'+ altSpeech || '' + '</audio>')
        return this;
    }

    this.getSpeech = function(){
        return ssmlOutput.reduce(function(total, nextBlock){
            return total.concat(nextBlock);
        })
    }
}

//SSML reference: https://developers.google.com/actions/reference/ssml