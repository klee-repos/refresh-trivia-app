import React from 'react';
import {Dashboard} from '../../components/'
import {TopBarContainer, WelcomeContainer, MainMenuContainer, StatesQuizContainer} from '../../containers/'
import {connect} from 'react-redux'

import './dashboard.css'

class DashboardContainer extends React.Component {

    landingPage(){
        return (
            <WelcomeContainer />
        )
    }

    dashboard(){
        return(
            <div>
                <Dashboard apps={this.props.openApps} />
            </div>
        )
    }

    mainMenu() {
        return (
            <MainMenuContainer />
        )
    }

    statesQuiz() {
        return (
            <StatesQuizContainer />
        )
    }

    currentPage(status){
        switch(this.props.loadingStatus){
            case "INIT" : return this.landingPage();
            case "states": return this.statesQuiz();
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