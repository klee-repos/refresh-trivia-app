import React, {Component} from 'react';
import {Container, Grid, Header} from 'semantic-ui-react';
import TwentyOne from './TwentyOne';

class Dashboard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            sessionCode: null,
            socket: null
        }

        this.grabProps = this.grabProps.bind(this);
    }

    grabProps() {
        this.setState(function() {
            console.log(this.props.sessionCode);
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
                                <TwentyOne 
                                    sessionCode={this.state.sessionCode}
                                    socket={this.state.socket} 
                                    Component={TwentyOne}
                                />
                            </Grid.Column>
                            <Grid.Column>
                                <Header as='h3' color='grey'>App placeholder</Header>
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