import React from 'react';
import {Dashboard} from '../../components/'
import {QueryBarContainer} from '../../containers/'
import {connect} from 'react-redux'

import './dashboard.css'

class DashboardContainer extends React.Component {

    landingPage(){
        return (
            <div className="welcome">
                <div className="welcomeContainer">
                    <div className="connectCode"> Connect to code {this.props.connectCode}</div>
                </div>
            </div>
            
        )
    }

    setup(){
        return (
            <div className="welcome">
                <div className="welcomeContainer">
                    <div className="connectCode">What city are you located in?</div>
                </div>
            </div>
        )
    }

    dashboard(){
        return(
            <div>
                <Dashboard apps={this.props.openApps} />
            </div>
        )
    }

    currentPage(status){
        switch(this.props.loadingStatus){
            case "INIT" : return this.landingPage();
            case "SETUP": return this.setup();
            default: return this.dashboard(); 
        }
    }

    render() {
        var page = this.currentPage();
        return (
            <div className="dashboard">
                {page}
                <QueryBarContainer />
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