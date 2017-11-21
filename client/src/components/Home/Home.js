
import React, {Component} from 'react';

import {NavHome} from '../../components/'

// Semantic UI
import {Container, Menu, Segment, Visibility, Header, Button, Icon} from 'semantic-ui-react';

class Home extends Component {
    render() {
        return (
            <Segment
                inverted
                textAlign='center'
                style={{ minHeight: '100vh', padding: '1em 0em'}}
                vertical
            >
                <Container style={{marginTop:'5em'}}>
                    <NavHome />
                </Container>
                <Container text>
                    <Header
                        as='h1'
                        content='Voice-driven UX'
                        inverted
                        style={{ fontSize: '4em', fontWeight: 'normal', marginBottom: 0, marginTop: '3em' }}
                    />
                    <Header
                        as='h2'
                        content='Coming soon...'
                        inverted
                        style={{ fontSize: '1.7em', fontWeight: 'normal' }}
                    />
                </Container>
            </Segment>
        )
    }
}

export default Home;