var ContextMap = {

    mainMenu: {
        activeIntents: [
            'input.welcome',
            'connect',
            'newGame',
            'joinGame',
            'test'
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
            'confirmRoster',
            'test'
        ],
        previous: 'mainMenu'
    },

    roundStart: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'test'
        ],
        previous: 'readyToStart'
    },

    question: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'guess',
            'test'
        ],
        previous:'readyToStart'
    }
    
}

module.exports = ContextMap;