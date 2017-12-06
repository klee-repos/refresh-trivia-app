import React from 'react';

const FullscreenLayout = function(props){
    if(props.openApps && props.openApps.length > 0){
        const App = props.openApps[0];
        return (
            <App />
        )
    }
    else 
        return (
            <div></div>
        )
}

 export default FullscreenLayout;