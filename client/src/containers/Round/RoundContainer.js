
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {RoundStart, 
        RoundQuestion, 
        RoundCorrect,
        RoundResult,
        Steal,
        StealResult,
        Finish,
        Bonus} from '../../components'

import {Info} from '../../requests'

import '../../components/Round/round.css'

class RoundContainer extends Component {

    constructor(props) {
        super(props)

        this.setCoins = this.setCoins.bind(this)

        this.setResults = this.setResults.bind(this)

        this.setWinner = this.setWinner.bind(this)

        this.setBonusWinner = this.setBonusWinner.bind(this)
        this.questionValue = this.questionValue.bind(this)
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
            case 2: return 100;
            case 3: return 300;
            case 4: return 700;
            case 5: return 1500;
            default: return 100;
        }
    }

    questionValue(questionIndex) {
        switch(parseInt(questionIndex, 10)) {
            case 1: return 100;
            case 2: return 200;
            case 3: return 400;
            case 4: return 800;
            case 5: return 1600;
            default: return 100;
        }
    }

    setWinner(winner) {
        if (winner === 'Everyone') {
            return 'Tie game!'
        }
        if (winner === 'Team 1') {
            return 'Team 1 you win!'
        } else {
            return 'Team 2 you win!'
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

    setBonusWinner(activeTeam) {
        if (activeTeam === 'team1') {
            return 'Team 2'
        } else {
            return 'Team 1'
        }
    }


    roundStart() {
        return (
            <RoundStart round={this.props.round} activeTeam={this.props.activeTeam} />
        )
    }

    question() {
        return (
            <RoundQuestion {...this.props} coinTotal={this.questionValue(this.props.questionIndex)}/>
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
            <StealResult {...this.props} stealValue={this.setCoins(this.props.stealQuestion)} result={this.setResults(result)}/>
        )
    }

    finish() {
        return (
            <Finish {...this.props} winner={this.setWinner(this.props.winner)}/>
        )
    }

    bonus() {
        return (
            <Bonus {...this.props} bonusWinner={this.setBonusWinner(this.props.activeTeam)}/>
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
            case "bonus": return this.bonus()
            default: return this.roundStart() 
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
        winner: game.winner,
        stealQuestion: game.stealQuestion
    }
}

export default connect(mapStateToProps)(RoundContainer)