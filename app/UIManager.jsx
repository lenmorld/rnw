import React from 'react';
import Header from './Header';
import data from './data';

console.log(data);

class UIManager extends React.Component {
    render() {
        return(
            <div>
                <Header />
                <div>List goes here...</div>
            </div>
        );
    }
}

export default UIManager;