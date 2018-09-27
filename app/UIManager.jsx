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

    searchList(event) {
        var search_term = event.target.value;
        // console.log(search_term);

        this.setState({
            search_term: search_term
        });
    }

    onChangeFormInput(event) {
        console.log("input changed");
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
                </div>
                <List list={filtered_list}/>
                <ItemForm item={this.state.form_fields}
                          onChangeFormInput={(event) => this.onChangeFormInput(event) } />
            </div>
        );
    }
}

export default UIManager;
