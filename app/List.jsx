import React from 'react';
import Item from './Item';

class List extends React.Component {
    render() {
        var list = this.props.list;
        // console.log(list);

        return(
            <div className="items_grid">
                {
                    list.map((item) => {
                        return (
                            <Item
                                item={item}
                                key={item.id}
                                deleteItem={this.props.deleteItem}
                                editItem={this.props.editItem}
                             />
                        );
                    })
                }
            </div>
        );
    }
}

export default List;
