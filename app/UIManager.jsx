import React from 'react';
import Header from './Header';
import List from './List';

import data from './data';

console.log(data);

class UIManager extends React.Component {

    constructor() {
        super();
        this.state = {
            list: data.list
        }
    }

    render() {
        return(
            <div>
                <Header />
                <List list={this.state.list}/>
            </div>
        );
    }
}

export default UIManager;