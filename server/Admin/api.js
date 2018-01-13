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
    csv({delimiter: '\t'})
        .fromFile(file)
        .on('json',function(json) {
            Question.findById(json.ID).then(function(question) {
                let picklist = json.Picklist.split(',')
                for (let i = 0; i < picklist.length; i++) {
                    picklist[i] = picklist[i].trimLeft().trimRight()
                }
                if (question) {
                    question.text = json.Question
                    question.picklist = picklist
                    question.answer = json.Answer
                    question.categorgy = json.Category
                    question.difficult = json.Difficulty
                    question.tags = json.Tags.split(',')
                    question.mediaURL = json.MediaURL
                    question.save()
                } else {
                    question = Question({
                        _id: json.ID,
                        text: json.Question,
                        picklist: picklist,
                        answer: json.Answer,
                        category: json.Category,
                        difficulty: json.Difficult,
                        tags: json.Tags.split(','),
                        mediaURL: json.MediaURL
                    })
                    question.save()
                }
            })
        })
        .on('done',(error)=>{
            console.log('Completed reading questions flat file....')
            let result = {
                status: "Questions saved to database"
            }
            res.send(result)
        })  
})

module.exports = routes;