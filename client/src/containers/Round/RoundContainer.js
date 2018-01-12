
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {RoundStart, RoundQuestion} from '../../components'

import {Info} from '../../requests'

class RoundContainer extends Component {

    componentDidMount() {
        Info.getRound(this.props.sessionCode)
    }

    roundStart() {
        return (
            <RoundStart round={this.props.round} activeTeam={this.props.activeTeam}/>
        )
    }

    question() {
        return (
            <RoundQuestion round={this.props.round} activeTeam={this.props.activeTeam}/>
        )
    }

    currentPage(){
        switch(this.props.context){
            case "roundStart": return this.roundStart();
            case "question": return this.question();
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
        round: game.round,
        activeTeam: game.activeTeam,
        playerIndex: game.playerIndex
    }
}

export default connect(mapStateToProps)(RoundContainer)