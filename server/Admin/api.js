const routes = require('express').Router();
const path = require('path');

const User = require('../models/User')
const Question = require('../models/Question')

const SessionManager = require('../SessionManager');

const csv=require('csvtojson')
const file = path.join(__dirname,'../TestTrivia.csv')

routes.post('/setContext', function(req, res) {
    let context = req.body.context;
    let sessionCode = req.body.sessionCode;
    User.findOne({sessionCode:sessionCode}).then(function(user) {
        if (user) {
            user.context.name = context;
            user.save()
            SessionManager.sendData(sessionCode, 'setStatus', context);
            res.send(user)
        } else {
            res.send("Did not find a user")
        }
    })
})

routes.post('/setQuestions', function(req,res) {
    Question.remove({}).exec().then(function(){
        csv({delimiter: '\t'})
        .fromFile(file)
        .on('json',function(json) {
            console.log(json)
            let picklist = json.Picklist.split(',')
            for (let i = 0; i < picklist.length; i++) {
                picklist[i] = picklist[i].trimLeft().trimRight()
            }                
            question = Question({
                qId: json.ID,
                text: json.Question,
                picklist: picklist,
                answer: json.Answer,
                category: json.Category,
                difficulty: parseInt(json.Difficulty),
                tags: json.Tags.split(','),
                mediaURL: json.MediaURL
            })
            question.save()
        })
        .on('done',(error)=>{
            console.log('Completed reading questions flat file....')
            let result = {
                status: "Questions saved to database"
            }
            res.send(result)
        }) 
    })
})

module.exports = routes;