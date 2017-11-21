
import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Card, Button} from 'semantic-ui-react';

import {TwentyOne} from '../../components'

class TwentyOneContainer extends Component {

    render() {
        return (
            <div>
            {this.props.twentyOne
                ? <Card>
                    <Card.Content header ='Twenty-One' textAlign='center' />
                    <Card.Content><TwentyOne /></Card.Content>
                </Card>
                : <p></p>         
            }
            </div>
        )
    }   
}

function mapStateToProps(state) {
    return {
        twentyOne: state.twentyOne,
    }
}

export default connect(mapStateToProps)(TwentyOneContainer);