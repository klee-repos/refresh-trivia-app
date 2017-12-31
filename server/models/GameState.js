var mongoose = require('mongoose');

var gameStateSchema = new mongoose.Schema(
    {
        began: {type:Date, default:Date.now},
        gameStateId: String,
        gAssistantId: String,
        status: String,
        entity: String,
        quizId: String,
        type: String,
        totalQuestions: Number,
        questions: Object,
    });

var GameState = mongoose.model('GameState', gameStateSchema);

module.exports = GameState;