import React from 'react';
import ReactDOM from 'react-dom';

class Home extends React.Component {
    render() {
        return (
            <div>React: Hello World!</div>
        );
    }
}

ReactDOM.render(<Home />, document.getElementById('app'));