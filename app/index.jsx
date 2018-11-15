import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import UIManager from './UIManager';
import Header from './Header';
import Track from './Track';
import Artist from './Artist';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Header />

                    {/* sample links to take us to the route */}
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/artist">Artist</Link></li>
                        <li><Link to="/track">Track</Link></li>
                    </ul>

                    {/* match route to React component */}
                    <Switch>
                        <Route exact path="/" component={UIManager} />
                        <Route path="/artist" component={Artist} />
                        <Route path="/track/:id?" component={Track} />
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
