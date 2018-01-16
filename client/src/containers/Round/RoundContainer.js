
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {RoundStart, RoundQuestion, RoundCorrectAnswer} from '../../components'

import {Info} from '../../requests'

import '../../components/Round/round.css'

class RoundContainer extends Component {

    componentDidMount() {
        Info.getRound(this.props.sessionCode)
        Info.getQuestion(this.props.sessionCode)
        Info.getRoster(this.props.sessionCode)
    }

    roundStart() {
        return (
            <RoundStart round={this.props.round} activeTeam={this.props.activeTeam}/>
        )
    }

    question() {
        return (
            <RoundQuestion {...this.props}/>

        )
    }

    correctAnswer() {
        return (
            <RoundCorrectAnswer {...this.props}/>
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
        teamOne: game.teamOne,
        teamTwo: game.teamTwo,
        round: game.round,
        activeTeam: game.activeTeam,
        playerIndex: game.playerIndex,
        question: game.question,
        picklist: game.picklist,
        mediaURL: game.mediaURL,
    }
}

export default connect(mapStateToProps)(RoundContainer)