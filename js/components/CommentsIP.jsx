import React, {Component} from 'react';
import {Link} from 'react-router';


class CommentsIP extends Component {

    constructor(){
        super();
        this.forEachComment = this.forEachComment.bind(this);
    }

    forEachComment(comment, index){
        return <div className="comment" key={comment.id}>
                    <div className="comment-wrapper">
                        <Link to={`/user/${comment['author']}`}><span className="author">{comment.author}</span></Link>
                        <span className="points">{comment.points + (comment.points === 1 ? ' pt' : ' pts')}</span>
                        <p className="comment-text">{comment['comment']}</p>
                    </div>
                    {comment.children.map(this.forEachComment)}
                </div>
    }

    render(){
        var data = this.props.data;
        return <div className="ip-comments">
            {data.map(this.forEachComment)}
        </div>
    }
}

export default CommentsIP;
