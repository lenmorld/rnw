import React from 'react';
import Header from './Header';
import List from './List';
import ItemForm from './ItemForm';

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

    // data API - CRUD methods
    createItem(item) {
        // console.log("[UIManager] Create ", item);

        // copy by value, not by reference, using ES6 spread operator
        var current_list_items = [...this.state.list];
        // add new item
        current_list_items.push(item);
        // apply change to state
        this.setState({
            list: current_list_items
        })
    }

    showForm() {
        var modal = document.querySelector('.modal');
        modal.style.display = "block";
    }

    render() {
        // debugger;        
        var list = this.state.list;
        var search_term = this.state.search_term;
        var filtered_list;

        if (!search_term) {
            filtered_list = list;
        } else {
            filtered_list = list.filter(function (item) {
                return item.title.toLowerCase().includes(search_term.toLowerCase());
            });
        }

        return(
            <div>
                <Header />
                <div className="options">
                    <input type="text" 
                           placeholder="Filter..." 
                           onChange={ (event) => {
                                        // debugger;
                                        this.searchList(event);
                                       } 
                                    } />
                    <span className="add" onClick={this.showForm}>[➕]</span>
                </div>
                <List list={filtered_list}/>
                <ItemForm 
                    createItem={ (item) => this.createItem(item) }/>
            </div>
        );
    }
}

export default UIManager;
