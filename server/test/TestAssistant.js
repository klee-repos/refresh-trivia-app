var res = _res;
this.deviceProfile = _deviceProfile;

var responseData: {

}

var resStatus = 200;

/* /////////////////////////////////
// Speech Builder Functions
*/ ///////////////////////////////
this.say = function(){return this};
this.play = function(){return this};
this.pause = function(){return this};

this.reprompt = {
    say: function(){return this},
    play: function(){return this},
    pause: function(){return this}
}

this.setContext = function(contextName, lifespan) {
    return this;
}

this.data = function(_data){
    return this;
}

this.error = function(errorCode){
    return this;
}

this.finish = function(){

}

this.setUser = function(user){
    this.deviceProfile.user = user._id;
}