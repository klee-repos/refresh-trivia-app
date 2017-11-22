import React from 'react';
import BlankQuarant from './BlankQuadrant'

const QuadrantLayout = function(props){
    if(props.apps.length < 4)
        console.log('Not enough apps');

    const App1 = props.apps[0];
    const App2 = props.apps[1];
    const App3 = props.apps[2];
    const App4 = props.apps[3];
    return (
        <div></div>
        // <Grid columns='equal' celled>
        //     <Grid.Row>
        //         <Grid.Column>
        //             <App1 />
        //         </Grid.Column>
        //         <Grid.Column>
        //             <App2 />
        //         </Grid.Column>
        //     </Grid.Row>
        //     <Grid.Row>
        //         <Grid.Column>
        //             <App3 />
        //         </Grid.Column>
        //                 <Grid.Column>
        //             <App4 />
        //         </Grid.Column>
        //     </Grid.Row>
        // </Grid>
    )
}

 export default QuadrantLayout;