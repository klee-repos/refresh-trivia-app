var ContextMap = {

    mainMenu: {
        activeIntents: [
            'input.welcome',
            'connect',
            'newGame',
            'joinGame'
        ],
        goBack: null
    },

    rosterSetup: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'addPlayersToTeam',
            'removePlayersFromTeam'
        ],
        goBack: 'mainMenu'

    },

    readyToStart: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
            'addPlayersToTeam',
            'removePlayersFromTeam',
            'confirmRoster'
        ]
        ,goBack: 'mainMenu'
    },

    roundStart: {
        activeIntents: [
            'input.welcome',
            'connect',
            'goBack',
        ]
    },
    goBack: 'readyToStart'
}

module.exports = ContextMap;