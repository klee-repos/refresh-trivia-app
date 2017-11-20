import React, {Component} from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';
import TwentyOne from './TwentyOne';
import AppList from './AppList';


class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionCode: null,
            socket: null,
            apps: {
                blackjack: false,
                appList: true
            }
        }
        this.grabProps = this.grabProps.bind(this);
    }

    grabProps() {
        this.setState(function() {
            return {
                sessionCode: this.props.sessionCode,
                socket: this.props.socket
            }
        })
    }

    componentDidMount() {
        this.grabProps();      
    }
    
    render() {
        return (
            <div>
                <Container style={{marginTop:'5em'}}>
                {!this.state.sessionCode
                    ? <p>Loading...</p>
                    : <Grid.Row style={{marginTop:'1.5em'}}>
                        <Grid columns={2}>
                            <Grid.Column>
                                {this.state.apps.appList
                                    ? <AppList />
                                    : <p></p>
                                }
                                {this.state.apps.blackjack
                                    ? <TwentyOne 
                                        sessionCode={this.state.sessionCode}
                                        socket={this.state.socket} 
                                        Component={TwentyOne}
                                    />
                                    : <p></p>
                                }
                            </Grid.Column>
                        </Grid>
                    </Grid.Row>
                }
                </Container>
            </div>
        )
    }
}

export default Dashboard;