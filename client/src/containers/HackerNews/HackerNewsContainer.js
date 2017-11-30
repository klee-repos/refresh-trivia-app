
import React, {Component} from 'react'
import {connect} from 'react-redux'

import {HackerNews} from '../../components/'

class HackerNewsComponent extends Component {

    render() {
        return (
            <div className={this.props.layoutClass}>
            {this.props.headlines
                ? <HackerNews headlines={this.props.headlines}/>
                : <p>Loading...</p>
            }
            </div>
        )
    }
}

function mapStateToProps({hackerNews}) {
    return {
        headlines: hackerNews.headlines
    }
}

export default connect(mapStateToProps)(HackerNewsComponent);