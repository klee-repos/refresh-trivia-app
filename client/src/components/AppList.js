var React = require('react');
var NavLink = require('react-router-dom').NavLink;

var Card = require('semantic-ui-react').Card

var apps = ['Blackjack'];

class AppList extends React.Component {
        render() {
            return (
                <div>
                    {apps.map(function(app){
                        return (
                        <Card key={app}>
                        <Card.Content>
                            <Card.Header>{app}</Card.Header>
                            <Card.Description>{app}</Card.Description>
                        </Card.Content>
                        <Card.Content extra>
                            <NavLink to="/dashboard/blackjack">
                                Open this app
                            </NavLink>
                        </Card.Content>
                        </Card>
                        )
                    })}
                </div>
            )
        }
    
    }

module.exports = AppList;