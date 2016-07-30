'use strict'

import React from "react";
import Post from "./post";

export default class PostList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let postNodes = this.props.posts.map((post) => {
            return (
                <Post post={post} key={post._id}></Post>
            );
        });
        return (
            <div className="postList">
                {postNodes}
            </div>
        );
    }
}

PostList.propTypes = {
    posts: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            _id: React.PropTypes.string.isRequired,
            creator: React.PropTypes.object,
            title: React.PropTypes.string.isRequired,
            date: React.PropTypes.string.isRequired,
            content: React.PropTypes.string.isRequired,
        })
    )
};