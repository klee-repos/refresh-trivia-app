
import React, {Component} from 'react'

import {connect} from 'react-redux'

import {IEX} from '../../components/'

class IEXContainer extends Component {

    render() {
        return (
            <div className={this.props.layoutClass}>
                <IEX stockList={this.props.stockList} />
            </div>
        )
    }

}

function mapStateToProps({iex}) {
    return {
        stockList: iex.stockList
    }
}

export default connect(mapStateToProps)(IEXContainer);