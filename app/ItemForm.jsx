import React from 'react';

class ItemForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: {
                id: '',
                title: '',
                artist: '',
                album: ''
            }
        };
    }

    hideForm() {
        console.log("hide form");
    }

    onSubmitForm(event) {
        console.log("form submitted");
    }

    onChangeInput(event) {
        // console.log("input changed");
        
        // copy values, not reference
        var current_list_fields = Object.assign({}, this.state.fields);     

        // e.g. current_list_fields['artist'] = 'Artist1'
        current_list_fields[event.target.name] = event.target.value;

        this.setState({
            fields: current_list_fields
        });
    }

    render() {
        // debugger;
        return (
            <div>
                <form>
                    <div className="close_form">
                        <span onClick={this.hideForm}>[🗙]</span>
                    </div>
                    <h3>Create a new item</h3>
                    <p>
                        <label>ID:</label>
                        <input name="id"
                               onChange={(event) => this.onChangeInput(event)} 
                               value={this.state.fields.id} />
                    </p>
                    <p>
                        <label>Title:</label>
                        <input name="title"
                               onChange={(event) => this.onChangeInput(event)}
                               value={this.state.fields.title} />
                    </p>
                    <p>
                        <label>Artist:</label>
                        <input name="artist"
                               onChange={(event) => this.onChangeInput(event)}    
                               value={this.state.fields.artist} />
                    </p>
                    <p>
                        <label>Album:</label>
                        <input name="album"
                               onChange={(event) => this.onChangeInput(event)}
                               value={this.state.fields.album} />
                    </p>

                    <div className="create">
                        <button onClick={(event) => this.onSubmitForm(event) }>
                            CREATE
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ItemForm;
