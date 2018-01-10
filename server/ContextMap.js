var ContextMap = {

    mainMenu: {
        activeIntents: [
            'input.welcome',
            'connect',
            'newGame',
            'joinGame'
        ]
    },

    rosterSetup: {
        activeIntents: [
            'connect',
            'goBack',
            'addPlayersToTeam',
            'removePlayersFromTeam'
        ]

    },

    readyToStart: {
        activeIntents: [
            'connect',
            'goBack',
            'addPlayersToTeam',
            'removePlayersFromTeam',
            'startGame'
        ]
    }
    
}

module.exports = ContextMap;