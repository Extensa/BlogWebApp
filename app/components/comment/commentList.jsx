'use strict'

import React from "react";
import Comment from "./comment";

export default class CommentList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let commentNodes = this.props.comments.map((comment) => {
            return (
                <Comment comment={comment} key={comment._id}></Comment>
            );
        });
        return (
            <ul className="list-group">
                {commentNodes}
            </ul>
        );
    }
}

CommentList.propTypes = {
    comments: React.PropTypes.arrayOf(
        React.PropTypes.shape({
            _id: React.PropTypes.string.isRequired,
            creator: React.PropTypes.object.isRequired,
            date: React.PropTypes.string.isRequired,
            content: React.PropTypes.string.isRequired
        })
    )
};