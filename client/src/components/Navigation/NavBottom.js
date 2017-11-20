import React, {Component} from 'react';

import {connect} from 'react-redux';

import {Menu, Container, Icon, Header} from 'semantic-ui-react';

class NavBottom extends Component {
    render() {
        return (
            <div>
            {!this.props.sessionCode
                ? <p></p>
                : <Menu fixed='bottom' borderless>
                <Container>
                    <Menu.Item>
                        {this.props.sessionCode && <span>Session code<Header as='h4' color='red'>{this.props.sessionCode}</Header></span>}
                    </Menu.Item>
                    <Menu.Menu position='right' style={{marginRight:'7em'}}>
                        <Menu.Item>
                            <Icon name='home' size='large'/>
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
        socket: state.socket,
    }
}

export default connect(mapStateToProps)(NavBottom);