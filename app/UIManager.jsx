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
            form_fields: {
                id: '',
                title: '',
                artist: '',
                album: ''
            }
        }
    }

    // data API - CRUD methods
    createItem() {
        // debugger;
        console.log("[UIManager] Create ");

        // get Item data from state
        var item = this.state.form_fields;
        // copy list values, not reference, using ES6 spread operator
        var current_list_items = [...this.state.list];
        // add new item
        current_list_items.push(item);
        // apply change to state
        this.setState({
            list: current_list_items
        });

        // empty fields for next round
        this.setState({
            form_fields: {
                id: '',
                title: '',
                artist: '',
                album: ''
            }
        });
    }

    searchList(event) {
        var search_term = event.target.value;
        // console.log(search_term);

        this.setState({
            search_term: search_term
        });
    }

    onChangeFormInput(event) {
        // console.log("input changed");

        // copy values, not reference
        var current_list_fields = Object.assign({}, this.state.form_fields);     
        // e.g. current_list_fields['artist'] = 'Artist1'
        current_list_fields[event.target.name] = event.target.value;
        // apply new value to state
        this.setState({
            form_fields: current_list_fields
        });
    }

    deleteItem(item_id) {
        console.log("[UIManager]: delete ", item_id );
    }

    editItem(item_id) {
        console.log("[UIManager]: edit ", item_id );
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
                <List list={filtered_list} 
                      deleteItem={(item_id) => this.deleteItem(item_id) }
                      editItem={(item_id) => this.editItem(item_id) } />
                <ItemForm item={this.state.form_fields}
                          onChangeFormInput={(event) => this.onChangeFormInput(event) } 
                          createItem={() => this.createItem()} />
            </div>
        );
    }
}

export default UIManager;
