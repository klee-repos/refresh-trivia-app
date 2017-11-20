
import React, {Component} from 'react';
import testApi from '../utils/testApi';

// Semantic UI
import {Container} from 'semantic-ui-react';

function FlipComponent(props) {
    return (
        <div>{props.user} wants to do a flip </div>
    )
}

class Home extends Component {

    constructor(props){
        super(props);
    
        this.state = {
          user: null
        }
    
        this.getSomeData = this.getSomeData.bind(this);
    }

    componentDidMount() {
		this.getSomeData();
	}

    getSomeData() {
        testApi.fetchName()
            .then(function(name){
                this.setState(function() {
                    return {
                        user:name
                    }   
                })
            }.bind(this))
    }

    render() {
        return (
            <div>
                <Container style={{marginTop:'4em'}}>
                {!this.state.user
                    ? <p>Loading...</p>
                    : <FlipComponent user={this.state.user}/>
                }
                </Container>
            </div>
        )
    }

}

export default Home;