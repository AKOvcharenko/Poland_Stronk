import React, {Component} from 'react';

class Social extends Component {

    constructor(){
        super();
        this.share = this.share.bind(this);
    }
    
    share(e){
        var settings;
        var social = e.target.getAttribute('data-social');
        var href = `http://imgur.com/a/${this.props.data.id}`;
        var title = this.props.data.title;
        var imageSrc = this.props.data.images && this.props.data.images[0].link || this.props.data.link;

        switch (social) {
            case "f":
                href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(href)}`;
                settings = "left=20,top=20,width=500,height=500,toolbar=1";
                break;
            case "twttr":
                href = `https://twitter.com/home?status=${encodeURIComponent(title + " " + href)}`;
                break;
            case "pin":
                href = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(href)}&media=${encodeURIComponent(imageSrc)}&description=${title}`;
                settings = "left=20,top=20,width=750,height=601,toolbar=1";
                break;
            case "reddit":
                href = `//www.reddit.com/submit?title=${encodeURIComponent(title)}&url=${encodeURIComponent(href)}`;
                settings = "left=20,top=20,width=860,height=700,toolbar=1"
        }
        window.open(href, "sharer", settings);
    }

    render() {
        return <div className="social text-right">
            <span className="social-icon icon-f"><i className="fa fa-facebook" onClick={this.share} data-social="f" /></span>
            <span className="social-icon icon-twttr"><i className="fa fa-twitter" data-social="twttr" onClick={this.share}/></span>
            <span className="social-icon icon-pin"><i className="fa fa-pinterest-p" data-social="pin" onClick={this.share}/></span>
            <span className="social-icon icon-reddit"><i className="fa fa-reddit-alien" data-social="reddit" onClick={this.share}/></span>
        </div>
    }
}


export default Social;