var React = require('react');

class TwentyOne extends React.Component {

    render() {
        return (
            <div>
                <div className='sessionCode'>
                    <span>The session id is {this.props.sessionCode}</span>
                </div>
            </div>
        )
    }

}

module.exports = TwentyOne;