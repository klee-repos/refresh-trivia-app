const routes = require('express').Router();
const path = require('path');

const User = require('../models/User')
const Question = require('../models/Question')

const SessionManager = require('../SessionManager');

const csv=require('csvtojson')
const file = path.join(__dirname,'../TriviaQuestions.csv')

routes.post('/setContext', function(req, res) {
    let context = req.body.context;
    let sessionCode = req.body.sessionCode;
    User.findOne({sessionCode:sessionCode}).then(function(user) {
        if (user) {
            user.context = context;
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

routes.post('/setRound', function(req, res) {
    let round = req.body.round;
    let sessionCode = req.body.sessionCode;
    User.findOne({sessionCode:sessionCode}).populate('game').then(function(user) { 
        if (user) {
            let activeTeam = user.game.gameState.round.activeTeam
            let playerIndex = user.game.gameState.round.playerIndex
            let questionIndex = user.game.gameState.round.questionIndex
            let newRound = user.game.setRound(round, activeTeam, playerIndex, questionIndex)
            SessionManager.sendData(user.sessionCode, 'setRound', newRound);
            user.save()
            user.game.save()
            res.send(user)

        } else {
            res.send("Did not find a user")
        }
    })
})

routes.post('/setTurn', function(req, res) {
    let turn = req.body.turn;
    let sessionCode = req.body.sessionCode;
    User.findOne({sessionCode:sessionCode}).populate('game').then(function(user) {
        if (user) {
            let round = user.game.gameState.round.round
            let activeTeam = user.game.gameState.round.activeTeam
            let playerIndex = user.game.gameState.round.playerIndex
            let newRound = user.game.setRound(round, activeTeam, playerIndex, turn)
            SessionManager.sendData(user.sessionCode, 'setRound', newRound);
            user.save()
            user.game.save()
            res.send(user)
        } else {
            res.send("Did not find a user")
        }
    })
})

module.exports = routes;