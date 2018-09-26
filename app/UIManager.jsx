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
            list: data.list,
            form_mode: 'CREATE',
            form_item: null
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

    deleteItem(item_id) {
        // console.log("[UIManager]: delete ", item_id );

        // copy by value, not by reference, using ES6 spread operator
        var current_list_items = [...this.state.list];
        // filter list copy, by excluding item to delete
        var filtered_list = current_list_items.filter(function(item) {
            return item.id !== item_id;
        });
        // apply change to state
        this.setState({
            list: filtered_list
        });
    }

    editItem(item_id) {
        console.log("[UIManager]: edit ", item_id );
         // copy by value, not by reference, using ES6 spread operator
        var current_list_items = [...this.state.list];
        // filter list copy, by excluding item to delete
        var filtered_list = current_list_items.filter(function(item) {
            return item.id === item_id;
        });
        
         // filter returns an array, but there should only be one matching item with given ID
        var item_to_edit = filtered_list[0];
         // set mode of ItemForm
        this.setState({
            form_mode: 'EDIT',
            form_item: item_to_edit
        })
         // show ItemForm
        this.showForm();
    }

    saveUpdatedItem(item) {
        console.log("[UIManager]: save updated item ", item_id );
    }

    showForm() {
        var modal = document.querySelector('.modal');
        modal.style.display = "block";
    }

    onAddItem() {
        this.setState({
            form_mode: 'CREATE',
            form_item: {
                id: '',
                title: '',
                artist: '',
                album: ''
            }
        });
        this.showForm();
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
                    <span className="add" onClick={() => this.onAddItem()}>[➕]</span>
                </div>
                <List list={filtered_list} 
                      deleteItem={(item_id) => this.deleteItem(item_id) }
                      editItem={(item_id) => this.editItem(item_id) } />
                <ItemForm 
                    createItem={ (item) => this.createItem(item) }
                    updateItem={ (item) => this.saveUpdatedItem(item) }
                    mode={this.state.form_mode}
                    item={this.state.form_item} />
            </div>
        );
    }
}

export default UIManager;
