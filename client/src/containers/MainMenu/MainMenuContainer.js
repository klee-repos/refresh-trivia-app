
import React, {Component} from 'react'

import {MainMenu} from '../../components'

import {Games} from '../../requests'

class MainMenuContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            triviaGames: null
        }

        this.setGameList = this.setGameList.bind(this)
    }

    setGameList(games) {
        let gameNames = []
        var totalGames = Object.keys(games.data).length;
        for (let i = 0; i < totalGames; i++) {
            gameNames.push(games.data[Object.keys(games.data)[i]].name)
        }
        this.setState({triviaGames:gameNames})
    }

    componentDidMount() {
        Games.gamesList().then(function(games) {
            this.setGameList(games)
        }.bind(this))
    }

    render() {
        return (
            <div className='mainMenu'>
                <MainMenu triviaGames={this.state.triviaGames}/>
            </div>
        )
    }
}

export default MainMenuContainer