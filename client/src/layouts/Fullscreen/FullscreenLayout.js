import React from 'react';

const FullScreenLayout = function(props){
    const App = props.apps[0];
    return (
        <div>
            <App />
        </div>
    )
}

 export default FullScreenLayout;