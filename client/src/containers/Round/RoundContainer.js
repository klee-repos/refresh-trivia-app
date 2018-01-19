
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {RoundStart, RoundQuestion, RoundCorrectAnswer} from '../../components'

import {Info} from '../../requests'

import '../../components/Round/round.css'

class RoundContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {}

        this.setCoins = this.setCoins.bind(this)

    }

    componentDidMount() {
        Info.getRound(this.props.sessionCode)
        Info.getQuestion(this.props.sessionCode)
        Info.getRoster(this.props.sessionCode)
    }

    setCoins(questionIndex) {
        switch(parseInt(questionIndex, 10)) {
            case 1: return 100;
            case 2: return 200;
            case 3: return 400;
            case 4: return 800;
            case 5: return 1600;
            default: return 100;
        }
    }

    roundStart() {
        return (
            <RoundStart round={this.props.round} activeTeam={this.props.activeTeam} />
        )
    }

    question() {
        return (
            <RoundQuestion {...this.props} coinTotal={this.setCoins(this.props.questionIndex)}/>

        )
    }

    correctAnswer() {
        return (
            <RoundCorrectAnswer {...this.props} coinTotal={this.setCoins(this.props.questionIndex)}/>
        )
    }

    currentPage(){
        switch(this.props.context){
            case "roundStart": return this.roundStart();
            case "question": return this.question();
            case "correctAnswer": return this.correctAnswer();
            default: return this.mainMenu(); 
        }
    }

    render() {
        var page = this.currentPage();
        return (
            <div className='mainContainer'>
                {page}
            </div>
        )
    }
}

function mapStateToProps({dashboard,game}) {
    return {
        sessionCode: dashboard.sessionCode,
        teamOne: game.teamOnePlayers,
        teamTwo: game.teamTwoPlayers,
        round: game.round,
        activeTeam: game.activeTeam,
        playerIndex: game.playerIndex,
        questionIndex: game.questionIndex,
        question: game.question,
        picklist: game.picklist,
        mediaURL: game.mediaURL,
    }
}

export default connect(mapStateToProps)(RoundContainer)