import React, {Component} from 'react';
import Social from './Social.jsx';
import {Link} from 'react-router';


class ImageIP extends Component {

    forEachImage(image){ //case when in post not only one image
        return <img key={image.id} src={image.link}/>
    }

    render(){
        var data = this.props.data;
        var author = data && data['account_url'];
        var images = data.images;
        return <div className="ip-image">
                <div className="post-header">
                    <div className="post-title-container">
                        <h1 className="post-title">{data.title}</h1>
                    </div>
                    <div className="post-title-meta font-opensans-semibold">
                        <span> by </span>
                        {!author && <Link to="/anonymous" title={`view account of Anonymous`} className="post-account">Anonymous</Link>}
                        {author && <Link to={`/user/${author}`} title={`view account of ${author}`} className="post-account">{author}</Link>}
                    </div>
                </div>
                <div className="post-holder">
                    {images ? images.map(this.forEachImage) : <img src={data.link}/>}
                </div>
                <Social data={data}/>
                <div className="image-stats">
                    <span className="post-action-stats pointer"><span className="post-action-stats-points">{data.points} Points</span><span>{data.views} Views</span></span>
                </div>
             </div>
    }
}

export default ImageIP;
