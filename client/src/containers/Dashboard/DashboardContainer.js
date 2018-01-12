import React from 'react';
import {TopBarContainer, 
        WelcomeContainer, 
        MainMenuContainer, 
        RosterSetupContainer,
        TeamBarContainer,
        RoundStartContainer} from '../../containers/'
import {connect} from 'react-redux'

import './dashboard.css'

class DashboardContainer extends React.Component {

    landingPage(){
        return (
            <WelcomeContainer />
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

    roundStart() {
        return (
            <div className='main'>
                <RoundStartContainer />
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
            case "roundStart": return this.roundStart();
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