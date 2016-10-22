import React, {Component} from 'react';
import {Link} from 'react-router';

class Error extends Component {

    render(){
        var feedState = this.props.feedState;
        return <div className="text-center footer textbox">
                    <h1>Zoinks! You've taken a wrong turn.</h1>
                    <p>Let's split up, gang. If you're looking for an image, it's probably been deleted or may not have existed at all.</p>
                    <p>If you are looking for groovy images, <Link to="/igp">visit our gallery!</Link></p>
                </div>
    }

}

export default Error;

