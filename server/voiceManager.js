
// You can find your project ID in your Dialogflow agent settings
const projectId = 'dashboard-57f45'; //https://dialogflow.com/docs/agents#settings
const sessionId = '123456789';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient({
    client_email: process.env.DIALOGFLOW_CLIENT_EMAIL,
    private_key: process.env.DIALOGFLOW_PRIVATE_KEY.replace(/\\n/g, '\n')
});

// Define Dialogflow session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);


var VoiceManager = function(socket) {

    this.runDF = function(data) {
        return new Promise(function(resolve, reject) {
        var requestDF = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: data,
                    languageCode: languageCode,
                }
            },
            auth: authClient
        }
        sessionClient
            .detectIntent(requestDF)
            .then(function(responses) {
                const result = responses[0].queryResult;
                socket.emit('voiceResponse', result.fulfillmentText)
                console.log(`  Query: ${result.queryText}`);
                console.log(`  Response: ${result.fulfillmentText}`);
                console.log(`  Parameters: ${result.parameters.fields}`);
                if (result.intent) {
                console.log(`  Intent: ${result.intent.displayName}`);
                } else {
                console.log(`  No intent matched.`);
                }
                resolve(result);
            })
            .catch(function(err) {
                console.error('ERROR:', err);
            })
        })
    }
}

module.exports = VoiceManager;