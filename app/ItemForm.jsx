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

    render() {
        return (
            <div>
                <form>
                    <div className="close_form">
                        <span>[🗙]</span>
                    </div>
                    <h3>Create a new item</h3>
                    <p>
                        <label>ID:</label>
                        <input name="id" 
                               value={this.state.fields.id} />
                    </p>
                    <p>
                        <label>Title:</label>
                        <input name="title" 
                               value={this.state.fields.title} />
                    </p>
                    <p>
                        <label>Artist:</label>
                        <input name="artist" 
                               value={this.state.fields.artist} />
                    </p>
                    <p>
                        <label>Album:</label>
                        <input name="album" 
                               value={this.state.fields.album} />
                    </p>

                    <div className="create">
                        <button>
                            CREATE
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default ItemForm;
