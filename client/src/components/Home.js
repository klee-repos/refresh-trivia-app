
var React = require('react');
var testApi = require('../utils/testApi');

// Semantic UI
var Container = require('semantic-ui-react').Container;

function FlipComponent(props) {
    return (
        <div>{props.user} wants to do a flip </div>
    )
}

class Home extends React.Component {

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

module.exports = Home;