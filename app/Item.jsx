import React from 'react';

class Item extends React.Component {
    render() {
        var item = this.props.item;
        console.log("Item:", item);

        return(
            <div>
                ...item...
            </div>
        );
    }
}

export default Item;
