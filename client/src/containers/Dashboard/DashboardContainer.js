import React from 'react';
import {TopBarContainer, WelcomeContainer, MainMenuContainer, RosterSetupContainer} from '../../containers/'
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
            <MainMenuContainer />
        )
    }

    rosterSetup() {
        return (
            <RosterSetupContainer />
        )
    }

    currentPage(status){
        switch(this.props.loadingStatus){
            case "INIT" : return this.landingPage();
            case "mainMenu": return this.mainMenu();
            case "rosterSetup": return this.rosterSetup();
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