'use strict'

import React from "react";
import { Link } from "react-router";

export default class Post extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    render() {
        let post = this.props.post;

        return (
            <div className="post">
                <Link to={post._id}><h3>{post.title}</h3></Link>
                <span className="text-info">Created by: {post.creator.username}</span>
                <span><span className="glyphicon glyphicon-time"></span> {post.date}</span>
                <p className="well">{post.content}</p>
            </div>
        );
    }
}

Post.propTypes = {
    post: React.PropTypes.shape({
        _id: React.PropTypes.string.isRequired,
        creator: React.PropTypes.object.isRequired,
        title: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired,
    })
};