import React from 'react';

const Item = (props) => {
    // console.log("render", props.item.id);
    var item = props.item;
    // console.log("Item:", item);

    return (
        <div className="item">
            {
                props.display_type === "spotify_api" ?
                    (
                        <div className="add_remove">
                            <span onClick={() => props.toggleItem(item)}>
                                {props.isInStateList(item.id) ? '❎' : '➕'}
                            </span>
                        </div>
                    ) :
                    (
                        <div className="delete_edit_button">
                            <span onClick={() => props.deleteItem(item.id)}>❎</span>
                            <span onClick={() => props.editItem(item.id)}>📝</span>
                        </div>
                    )
            }
            <div className="left">
                <iframe src={"https://open.spotify.com/embed/track/" + item.id}
                    width="80" height="80" frameBorder="0" allowtransparency="true" allow="encrypted-media">
                </iframe>
            </div>
            <div className="right">
                <div className="title">{item.title}</div>
                <div className="artist">{item.artist}</div>
                <div className="album">{item.album}</div>
            </div>
        </div>
    );
}

export default Item;
