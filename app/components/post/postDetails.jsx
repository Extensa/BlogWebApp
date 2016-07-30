'use strict'

import React from "react";

export default class PostDetails extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    render() {
        let post = this.props.post;

        return (
            <div className="post">
                <h3>{post.title}</h3>
                <span className="text-info">Created by: {post.creator.username}</span>
                <span><span className="glyphicon glyphicon-time"></span> {post.date}</span>
                <p className="well">{post.content}</p>
                <p className="text-center">{post.comments.length} comments</p>
            </div>
        );
    }
}

PostDetails.propTypes = {
    post: React.PropTypes.shape({
        _id: React.PropTypes.string.isRequired,
        creator: React.PropTypes.object.isRequired,
        title: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
        comments: React.PropTypes.array.isRequired
    })
};