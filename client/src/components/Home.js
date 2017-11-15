
var React = require('react');
var testApi = require('../utils/testApi');

function FlipComponent(props) {
    return (
        <div>{props.user} wants to do a flip </div>
    )
}

class Home extends React.Component {

    constructor(props){
        super();
    
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
                <div className='row>'>
                {!this.state.user
                    ? <p>Loading</p>
                    : <FlipComponent user={this.state.user}/>
                }
                </div>
            </div>
        )
    }

}

module.exports = Home;