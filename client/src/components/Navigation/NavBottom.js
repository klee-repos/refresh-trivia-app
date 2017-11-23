import React, {Component} from 'react';
import { NavLink } from 'react-router-dom'
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as twentyOneActionCreators from '../../redux/modules/twentyOne';

class NavBottom extends Component {

    constructor(props) {
        super(props)

        this.twentyOne = this.twentyOne.bind(this);
    }

    twentyOne() {
        this.props.changeTwentyOne(this.props.twentyOne);
    }

    render() {
        return (
            <div>
            {!this.props.sessionCode
                ? <p></p>
                : 
                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <div className="container">
                        <div className="navbar-collapse">
                            <ul className="nav navbar-nav navbar-left">
                                <li>
                                    <NavLink exact to='/'><span className='alexa'>Go Home</span></NavLink>
                                </li>
                                <li>
                                    <a onClick={this.twentyOne}>
                                        <span className='alexa'>Open Twenty One</span>
                                    </a>
                                </li>
                            </ul>
                            <ul className="nav navbar-nav navbar-right">
                            <li>
                                <a>{this.props.sessionCode && 
                                    <div>Session code: <span className='alexa'>{this.props.sessionCode}</span></div>
                                }</a>
                            </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            }
          </div>
        )
    }
}

function mapStateToProps({dashboard, twentyOne}) {
    return {
        sessionCode: dashboard.sessionCode,
        twentyOne: twentyOne.twentyOne,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(twentyOneActionCreators, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBottom);