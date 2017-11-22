import React from 'react';

const FullscreenLayout = function(props){
    console.log(props.apps)
    if(props.apps){
        const App = props.apps;
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