import React from 'react';
import Header from './Header';
import List from './List';

import data from './data';

console.log(data);

class UIManager extends React.Component {

    constructor() {
        super();
        // debugger;
        this.state = {
            search_term: '',
            list: data.list
        }
    }

    searchList(event) {
        var search_term = event.target.value;
        // console.log(search_term);

        this.setState({
            search_term: search_term
        });
    }

    render() {
        console.log("this.state.search_term", this.state.search_term);

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