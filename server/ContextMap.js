var ContextMap = {

    'input.welcome': {
        activeIntents: [
            'input.welcome',
            'connect',
            'goTo'
        ],
        previous: 'input.welcome'
    },

    mainMenu: {
        activeIntents: [
            'input.welcome',
            'connect',
            'newGame',
            'joinGame',
            'goTo'
        ],
        previous: 'mainMenu'
    },

    rosterSetup: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'goTo',
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
            'goTo',
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
            'goTo',
            'guess',
            'guessIntent'
        ],
        previous:'readyToStart'
    },

    correctAnswer: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'goTo',
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
            'goTo',
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
            'goTo',
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
            'goTo',
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
            'goTo',
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
            'goTo',
            'guess',
            'guessIntent'
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
    },

    bonus: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'goTo',
            'guess',
            'guessIntent'
        ],
        previous:'readyToStart'
    }
    
}

module.exports = ContextMap;