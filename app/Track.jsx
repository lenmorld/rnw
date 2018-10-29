import React from "react";
import axios from 'axios';

// we need to fetch Track details into track_data
// on component load

class Track extends React.Component {
    constructor() {
        super();
        this.state = {
            track_data: null
        };
    }

    componentWillMount() {
        // var track_id = this.props.location.id;
        var track_id = this.props.match.params.id;

        axios.get(`/spotify/track/${track_id}`).then((response) => {
            this.setState({
                track_data: response.data
            });
        });
    }
    
    render() {

        if (!this.state.track_data) {
            return (<div>Loading...</div>);
        }

        // console.log(this.state.track_data);
        var track = this.state.track_data;

        return (
            <div>
                <h2>Track</h2>
                <ul>
                    <li>Title: {track.name}</li>
                    <li>Artist: {track.artists[0].name}</li>
                    <li>Album: {track.album.name}</li>
                    <li>Album track #: {track.track_number}</li>
                    <li>Duration: {track.duration_ms}</li>
                </ul>
                <hr />
                {
                    track.album.images.map((i, index) => 
                        (<img 
                            class="track_image"
                            key={index}
                            src={i.url} />)
                    )
                }
            </div>
        );
    }
}

export default Track;