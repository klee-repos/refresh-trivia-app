import React from 'react';

const FullscreenLayout = function(props){
    if(props.apps && props.apps.length > 0){
        const App = props.apps[1];
        return (
            <div>
                <App />
            </div>
        )
    }
    else 
        return (
            <div></div>
        )
}

 export default FullscreenLayout;