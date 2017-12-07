import React from 'react';
import {Dashboard, NavBottom} from '../../components/'
import {DockContainer} from '../../containers/'
import {connect} from 'react-redux'

import './dashboard.css'

class DashboardContainer extends React.Component {
    render() {
        return (
            <div>
                {!this.props.sessionCode
                    ? <div className="connectCode">Connect to this dashboard using code {this.props.connectCode}</div>
                    

                    :<div className='dashboard'>
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