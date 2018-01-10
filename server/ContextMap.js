var ContextMap = {

    welcome: {
        activeIntents: [
            'connect',
            'newGame',
            'joinGame'
        ]
    },

    rosterSetup: {
        activeIntents: [
            'connect',
            'newGame',
            'addPlayersToTeam',
            'removePlayersFromTeam'
        ]

    },

    readyToStart: {
        activeIntents: [
            'connect',
            'newGame',
            'addPlayersToTeam',
            'removePlayersFromTeam',
            'startGame'
        ]
    }
    
}

module.exports = ContextMap;