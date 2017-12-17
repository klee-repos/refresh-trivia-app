
import React, {Component} from 'react'

import './queryBar.css'

class QueryBar extends Component {

    constructor(props) {
        super(props)

        this.state = {}

        this.setPlaceholder = this.setPlaceholder.bind(this);
    }

    setPlaceholder(recognizing) {
        if (recognizing) {
            return "Listening..."
        } else {
            return "Press the Spacebar to begin speaking..."
        }
    }

    render() {
        return (
            <nav className="navbar navbar-fixed-bottom">
                <div className="queryBar">
                    <div className="queryContainer">
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button className="btn btn-secondary" type="button">
                                    <img className='micIcon' src={require(`./img/mic.png`)} alt='mic'/>
                                </button>
                            </span>
                            <input type="text" className="form-control" placeholder={this.setPlaceholder(this.props.recognizing)} value={this.props.final_transcript} />
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default QueryBar;