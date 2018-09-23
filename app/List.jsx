import React from 'react';
import Item from './Item';

class List extends React.Component {
    render() {
        var list = this.props.list;
        console.log(list);

        return(
            <div>
                <Item />
            </div>
        );
    }
}

export default List;
