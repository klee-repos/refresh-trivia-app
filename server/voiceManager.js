var dialogFlow = require('apiai');
var df = dialogFlow(process.env.DIALOGFLOW);

var VoiceManager = function(socket) {

    this.runDF = function(data){
        return new Promise(function(resolve,reject){
            var options = {
                sessionId: '97834597854379853429708'
            };
            
            var request = df.textRequest(data, options);
            
            request.on('response', function(response) {
                console.log(response);
                resolve(response)
            });
            
            request.on('error', function(error) {
                console.log(error);
                reject(response);
            });
            
            request.end();
        });
    }
}

module.exports = VoiceManager;