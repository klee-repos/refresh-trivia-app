import React, {Component} from 'react';

import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard';

import {Menu, Container, Icon, Header, Segment} from 'semantic-ui-react';

class NavBottom extends Component {

    constructor(props) {
        super(props)

        this.changeTwentyOne = this.changeTwentyOne.bind(this);
    }

    changeTwentyOne() {
        if (this.props.twentyOne) {
            this.props.setTwentyOne(false);
        } else {
            this.props.setTwentyOne(true);
        }
    }

    loadHome() {

    }

    render() {
        return (
            <div>
            {!this.props.sessionCode
                ? <p></p>
                : <Menu fixed='bottom' compact borderless>
                    <Container>
                    <Menu.Item
                        active={this.props.twentyOne}
                        onClick={this.changeTwentyOne}
                        
                    >
                        <Icon name='game' size='large' centered/>
                        Twenty-One
                    </Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item
                            onClick={this.loadHome}
                        >
                            <Icon name='home' size='large'/>
                        </Menu.Item>
                        <Menu.Item>
                            {this.props.sessionCode && <span>Session code<Header as='h4' color='red'>{this.props.sessionCode}</Header></span>}
                        </Menu.Item>
                    </Menu.Menu>
                </Container>
              </Menu>
            }
          </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        sessionCode: state.sessionCode,
        twentyOne: state.twentyOne,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(dashboardActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBottom);