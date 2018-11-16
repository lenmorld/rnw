import React from 'react';
import Item from './Item';

const List = (props) => {
    // console.log("render list again!");
    var list = props.list;
    // console.log(list);

    return (
        <div className="items_grid">
            {
                list.map((item) => {
                    return (
                        <Item
                            item={item}
                            key={item.id}
                            deleteItem={props.deleteItem}
                            editItem={props.editItem}
                            display_type={props.display_type}
                            toggleItem={props.toggleItem}
                            isInStateList={props.isInStateList}
                        />
                    );
                })
            }
        </div>
    );
}

export default List;
