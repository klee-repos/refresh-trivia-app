import React from 'react';
import {TopBarContainer, 
        WelcomeContainer, 
        MainMenuContainer, 
        RosterSetupContainer,
        TeamBarContainer,
        RoundContainer,
        InformationFooterContainer} from '../../containers/'
import {connect} from 'react-redux'

import './dashboard.css'

class DashboardContainer extends React.Component {

    landingPage(){
        return (
            <div className='main'>
                <WelcomeContainer />
                <InformationFooterContainer />
            </div>
        )
    }

    mainMenu() {
        return (
            <div className='main'>
                <MainMenuContainer />
            </div>
        )
    }

    rosterSetup(context) {
        return (
            <div className='main'>
                <RosterSetupContainer context={context}/>
                <TeamBarContainer />
            </div>
        )
    }

    round(context) {
        return (
            <div className='main'>
                <RoundContainer context={context} />
                <TeamBarContainer />
            </div>
        )
    }

    currentPage(status){
        switch(this.props.loadingStatus){
            case "INIT" : return this.landingPage();
            case "mainMenu": return this.mainMenu();
            case "rosterSetup": return this.rosterSetup('rosterSetup');
            case "readyToStart": return this.rosterSetup('readyToStart');
            case "roundStart": return this.round('roundStart');
            case "question": return this.round('question');
            case "correct": return this.round('correct');
            case "incorrect": return this.round('incorrect');
            case "correctSteal": return this.round('correctSteal');
            case "incorrectSteal": return this.round('incorrectSteal');
            case "correctAnswer": return this.round('correctAnswer');
            case "steal": return this.round('steal');
            case "finish": return this.round('finish')
            case "bonus": return this.round('bonus')
            default: return this.mainMenu(); 
        }
    }

    render() {
        var page = this.currentPage();
        return (
            <div className="dashboard">
                <TopBarContainer />
                {page}
            </div>
        )  
    }
}

function mapStateToProps({dashboard}) {
    return {
        sessionCode: dashboard.sessionCode,
        connectCode: dashboard.connectCode,
        openApps: dashboard.openApps,
        loadingStatus: dashboard.loadingStatus
    }
}

export default connect(mapStateToProps)(DashboardContainer);