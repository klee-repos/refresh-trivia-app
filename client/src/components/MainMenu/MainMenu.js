
import React, {Component} from 'react'

import './mainMenu.css'

class MainMenu extends Component {

    render() {
        return(
            <div className='mainMenuContainer'>
                <div className='gameHeading'>
                    <div className='gameTitle'>
                        <h1>Would you like to play a game?</h1>
                    </div>
                </div>
                <div className='gameList'>
                    <div className='games'>
                        {this.props.triviaGames
                            ? this.props.triviaGames.map(function(game, idx) {
                                return (
                                    <p key={idx}>{game}</p>
                                )
                            })
                            : null
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default MainMenu