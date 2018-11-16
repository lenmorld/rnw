import React from 'react';
import Item from './Item';

class List extends React.Component {
    render() {
        var list = this.props.list;
        var search_term = this.props.search_term;
        // console.log(list);

        return(
            <div className="items_grid">
                {
                    list.map((item) => {
                        return (
                            <Item
                                item={item}
                                search_term={search_term}
                                key={item.id}
                                deleteItem={this.props.deleteItem}
                                editItem={this.props.editItem}
                                display_type={this.props.display_type}
                                toggleItem={this.props.toggleItem}
                                isInStateList={this.props.isInStateList}
                             />
                        );
                    })
                }
            </div>
        );
    }
}

export default List;
