import React, {Component} from 'react';
import {Link} from 'react-router';


class ImageIP extends Component {
    render(){
        var data = this.props.data;
        var author = data && data['account_url'];
        return <div>
                <div className="post-header">
                    <div className="post-title-container">
                        <h1 className="post-title">{data.title}</h1>
                    </div>
                    <div className="post-title-meta font-opensans-semibold">
                        <span> by </span>
                        {!author && <Link to="/anonymous" title={`view account of Anonymous`} className="post-account">Anonymous</Link>}
                        {author && <Link to={`/user/${author}`} title={`view account of ${author}`} className="post-account">{author}</Link>}
                        <span title="Wed Oct 19 2016 22:43:44 GMT+0200 (Central European Daylight Time)">20h</span>
                    </div>
                </div>
                <div className="post-holder">
                    <img src={data.link}/>
                </div>
             </div>
    }
}

export default ImageIP;