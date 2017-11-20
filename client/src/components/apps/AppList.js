import React from 'react';
import {Card, Button} from 'semantic-ui-react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux'
import * as appActionCreators from '../../redux/modules/apps';

class AppList extends React.Component {
    constructor(props) {
        super(props)

        this.handleClick = this.handleClick.bind(this);
    
    }

    handleClick() {
        this.props.openBlackjack();
    }

    render() {
        return (
            <Card>
                <Card.Content header ='Twenty-One' textAlign='center' />
                <Card.Content textAlign='center'>
                    <Button content='Open' onClick={this.handleClick} />
                </Card.Content>
            </Card>
        )
    }    
}

function mapStateToProps(state) {
    return {
        appList: state.appList,
        blackjack: state.blackjack,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(appActionCreators, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(AppList);