
import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'

import {Card, Button} from 'semantic-ui-react';

import {TwentyOne} from '../../components'
import * as dashboardActionCreators from '../../redux/modules/dashboard';


class TwentyOneContainer extends Component {

    constructor(props) {
        super(props)

        this.openTwentyOne = this.openTwentyOne.bind(this);
        this.closeTwentyOne = this.closeTwentyOne.bind(this);
    
    }

    openTwentyOne() {
        this.props.setTwentyOne(true);
    }

    closeTwentyOne() {
        this.props.setTwentyOne(false);
    }

    render() {
        return (
            <Card>
                <Card.Content header ='Twenty-One' textAlign='center' />
                    {this.props.twentyOne
                        ? <Card.Content><TwentyOne /></Card.Content>
                        : <p></p>
                    }
                <Card.Content textAlign='center'>
                    {!this.props.twentyOne
                        ? <Button content='Open' onClick={this.openTwentyOne} />
                        : <Button content='Close' onClick={this.closeTwentyOne} />
                    }
                </Card.Content>
            </Card>
        )
    }   
}

function mapStateToProps(state) {
    return {
        twentyOne: state.twentyOne,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(dashboardActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(TwentyOneContainer);