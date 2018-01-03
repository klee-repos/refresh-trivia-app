
import React, {Component} from 'react'

import {MainMenu} from '../../components'

import {AllQuizes} from '../../requests'

class MainMenuContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            quizTitles: null
        }

        this.setGameList = this.setGameList.bind(this)
    }

    setGameList(quizList) {
        let allEntities = [];
        let quizListSize = Object.keys(quizList).length
        for (let i = 0; i < quizListSize; i++) {
            allEntities.push(quizList[Object.keys(quizList)[i]].name)
        }
        this.setState({quizTitles:allEntities})
    }

    componentDidMount() {
        AllQuizes.quizList().then(function(quizList) {
            this.setGameList(quizList.data)
        }.bind(this))
    }

    render() {
        return (
            <div className='mainMenu'>
                <MainMenu quizTitles={this.state.quizTitles}/>
            </div>
        )
    }
}

export default MainMenuContainer