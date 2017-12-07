import React from 'react';
import {Dashboard, NavBottom} from '../../components/'
import {DockContainer} from '../../containers/'
import {connect} from 'react-redux'

import './dashboard.css'

class DashboardContainer extends React.Component {
    render() {
        return (
            <div className="dashboard">
                {!this.props.sessionCode ? 
                <div>
                    <div className="connectCode">Say to alexa: Alexa</div>
                    <div className="alexa">Use dash code {this.props.connectCode}</div>
                    </div>
                    :
                    <div >
                        <DockContainer />
                        <Dashboard apps={this.props.openApps} />
                        <NavBottom />
                    </div>
                }
            </div>
        )  
    }
}

function mapStateToProps({dashboard}) {
    return {
        sessionCode: dashboard.sessionCode,
        connectCode: dashboard.connectCode,
        openApps: dashboard.openApps
    }
}

export default connect(mapStateToProps)(DashboardContainer);