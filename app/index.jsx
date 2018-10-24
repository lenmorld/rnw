import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import UIManager from './UIManager';

class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <UIManager />
            </BrowserRouter>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
