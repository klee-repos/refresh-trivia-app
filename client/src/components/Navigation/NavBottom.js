import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as dashboardActionCreators from '../../redux/modules/dashboard';

import{Nav, Navbar, NavItem} from 'react-bootstrap';
import './nav.css' 

class NavBottom extends Component {

    constructor(props) {
        super(props)

        this.changeTwentyOne = this.changeTwentyOne.bind(this);
    }

    changeTwentyOne() {
        if (this.props.twentyOne) {
            this.props.setTwentyOne(false);
        } else {
            this.props.setTwentyOne(true, "blackjack");
        }
    }

    loadHome() {

    }

    render() {
        return (
            <div>
            {!this.props.sessionCode
                ? <p></p>
                : <Navbar fixedBottom>
                    <Nav>
                        <NavItem>
                            <NavLink to="/"><div className='home'>"Go Home"</div></NavLink>
                        </NavItem>
                        <NavItem
                            active={this.props.twentyOne}
                            onClick={this.changeTwentyOne}
                        >    
                        <span className='home'>"Open Twenty One"</span>    
                        </NavItem>
                    </Nav>
                    <Nav pullRight>
                        <NavItem>
                            {this.props.sessionCode && <div><p>Session code: </p>{this.props.sessionCode}</div>}
                        </NavItem>
                    </Nav>
                </Navbar>
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