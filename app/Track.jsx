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

        if (track_id) {
            axios.get(`/spotify/track/${track_id}`).then((response) => {
                this.setState({
                    track_data: response.data
                });
            });
        }
    }

    msToMinutesSeconds(ms){
        let minutes = Math.floor(ms / 60000);
        let seconds = Math.floor((ms % 60000)/1000);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    
    render() {
        if (!this.props.match.params.id) {
            return (<h1>No track id given</h1>);
        }
        if (!this.state.track_data) {
            return (<div>Loading...</div>);
        }

        console.log(this.state.track_data);
        var track = this.state.track_data;
        var image = track.album.images[0];

        return (
            <div>
                <h2>Track</h2>
                <ul>
                    <li>Title: {track.name}</li>
                    <li>Artist: {track.artists[0].name}</li>
                    <li>Album: {track.album.name}</li>
                    <li>Album track #: {track.track_number}</li>
                    <li>Duration: {this.msToMinutesSeconds(track.duration_ms)}</li>
                </ul>

                <img className="track_image" src={image.url} />  
                <div className="player">
                    {
                        track.is_playable ?
                            <audio controls="controls">
                                <source src={track.preview_url} type="audio/mpeg"/>
                            </audio>
                            : <div>Not playable</div>
                    }
                </div>

                <hr />
                <h3>Album images</h3>
                {
                    track.album.images.map((i, index) => 
                        (<img 
                            className="track_image"
                            key={index}
                            src={i.url} />)
                    )
                }
            </div>
        );
    }
}

export default Track;