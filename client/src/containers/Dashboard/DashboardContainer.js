import React from 'react';
import {Dashboard, NavBottom} from '../../components/'
import {DockContainer} from '../../containers/'
import {connect} from 'react-redux'

import './dashboard.css'

class DashboardContainer extends React.Component {

    landingPage(){
        return (
            <div className="container">
                <div className="connectCode">Connect to Dash using Alexa</div>
                <div className="connectCode">Alexa, tell Dash I'm using code {this.props.connectCode}</div>
            </div>
        )
    }

    setup(){
        return (
            <div className="container">
                <div className="connectCode">What city are you in?</div>
                <div className="connectCode">Alexa, tell Dash I'm in city CITY_NAME</div>
            </div>
        )
    }

    dashboard(){
        return(
            <div>
                <DockContainer />
                <Dashboard apps={this.props.openApps} />
                <NavBottom />
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