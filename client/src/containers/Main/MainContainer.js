import React, {Component} from 'react';
import {NavBottom} from '../../components/';

class MainContainer extends Component {

    render() {
        return (
            <div className='mainContainer'> 
                {this.props.children}
                <NavBottom />
            </div>
        )
    }
}

export default MainContainer;