
import React, {Component} from 'react'

import './queryBar.css'

class QueryBar extends Component {

    render() {
        return (
            <nav className="navbar navbar-fixed-bottom">
                <div className="queryBar">
                    <div className="queryContainer">
                        <div className="input-group">
                            <span className="input-group-btn">
                                <button className="btn btn-secondary" type="button">Go!</button>
                            </span>
                            <input type="text" className="form-control" placeholder="Press the Spacebar to begin speaking..." aria-label="Search..." value={this.props.final_transcript} />
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default QueryBar;