import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route, Link } from 'react-router-dom';

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
                    <Route exact path="/" component={UIManager} />
                    <Route exact path="/artist" component={Artist} />
                    <Route exact path="/track/:id" component={Track} />
                </div>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
