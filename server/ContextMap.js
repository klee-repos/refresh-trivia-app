var ContextMap = {

    mainMenu: {
        activeIntents: [
            'input.welcome',
            'connect',
            'newGame',
            'joinGame'
        ],
        previous: 'mainMenu'
    },

    rosterSetup: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'addPlayersToTeam',
            'removePlayersFromTeam'
        ],
        previous: 'mainMenu'

    },

    readyToStart: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'addPlayersToTeam',
            'removePlayersFromTeam',
            'confirmRoster'
        ],
        previous: 'mainMenu'
    },

    roundStart: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack'
        ],
        previous: 'readyToStart'
    },

    question: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'guess'
        ],
        previous:'readyToStart'
    },

    correctAnswer: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'play',
            'bank'
        ],
        previous:'readyToStart'
    },

    correct: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'play',
            'bank'
        ],
        previous:'readyToStart'
    },

    incorrect: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'play',
            'bank'
        ],
        previous:'readyToStart'
    },

    correctSteal: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'play',
            'bank'
        ],
        previous:'readyToStart'
    },

    incorrectSteal: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'play',
            'bank'
        ],
        previous:'readyToStart'
    },

    steal: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'guess'
        ],
        previous:'readyToStart'
    },

    finish: {
        activeIntents: [
            'input.welcome',
            'connect',
            'newGame',
            'joinGame',
            'goBack',
        ],
        previous:'mainMenu'
    }
    
}

module.exports = ContextMap;