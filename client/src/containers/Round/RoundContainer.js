
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {RoundStart, 
        RoundQuestion, 
        RoundCorrect,
        RoundResult,
        Steal,
        StealResult,
        Finish} from '../../components'

import {Info} from '../../requests'

import '../../components/Round/round.css'

class RoundContainer extends Component {

    constructor(props) {
        super(props)

        this.setCoins = this.setCoins.bind(this)

        this.setResults = this.setResults.bind(this)

        this.setCoinsSteal = this.setCoinsSteal.bind(this)
    }

    componentDidMount() {
        Info.getRound(this.props.sessionCode)
        Info.getQuestion(this.props.sessionCode)
        Info.getRoster(this.props.sessionCode)
        Info.getScore(this.props.sessionCode)
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

    setCoinsSteal(questionIndex) {
        switch(parseInt(questionIndex, 10)) {
            case 1: return 100;
            case 2: return 200;
            case 3: return 400;
            case 4: return 800;
            case 5: return 1600;
            default: return 100;
        }
    }

    setResults(result) {
        if (result === 'correct') {
            return 'Correct!'
        } 
        
        if (result === 'incorrect') {
            return 'Incorrect'
        }

        if (result === 'stolen') {
            return 'Coins stolen!'
        }

        if (result === 'saved') {
            return 'Steal Unsuccessful'
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

    result(result) {
        return (
            <RoundResult {...this.props} result={this.setResults(result)} />
        )
    }

    roundCorrect() {
        return (
            <RoundCorrect {...this.props}/>
        )
    }

    steal() {
        return (
            <Steal {...this.props}/>
        )
    }

    stealResult(result) {
        return (
            <StealResult {...this.props} result={this.setResults(result)} coinTotal={this.setCoins(this.props.questionIndex)}/>
        )
    }

    finish() {
        return (
            <Finish {...this.props}/>
        )
    }

    currentPage(){
        switch(this.props.context){
            case "roundStart": return this.roundStart();
            case "question": return this.question();
            case "correct" : return this.result('correct');
            case "incorrect": return this.result('incorrect');
            case "correctSteal" : return this.stealResult('stolen');
            case "incorrectSteal": return this.stealResult('saved');
            case "correctAnswer": return this.roundCorrect();
            case "steal": return this.steal()
            case "finish": return this.finish()
            default: return this.roundStart(); 
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
        winner: game.winner
    }
}

export default connect(mapStateToProps)(RoundContainer)