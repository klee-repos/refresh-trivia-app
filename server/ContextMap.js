var ContextMap = {

    mainMenu: {
        activeIntents: [
            'input.welcome',
            'connect',
            'newGame',
            'joinGame'
        ],
        previous: null
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
            'goBack',
        ],
        previous: 'readyToStart'
    },

    question: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'guess',
        ],
        previous:'readyToStart'
    }
    
}

module.exports = ContextMap;