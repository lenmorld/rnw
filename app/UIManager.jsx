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

    searchList(event) {
        var search_term = event.target.value;
        console.log(search_term);
    }

    render() {
        return(
            <div>
                <Header />
                <div className="options">
                    <input type="text" 
                           placeholder="Filter..." 
                           onChange={this.searchList} />
                </div>
                <List list={this.state.list}/>
            </div>
        );
    }
}

export default UIManager;