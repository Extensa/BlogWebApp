'use strict'

import React from "react";

export default class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.props = props;
    }

    render() {
        let comment = this.props.comment;

        return (
            <li className="list-group-item">
                <span className="text-info">{comment.creator.username}</span>
                <span><span className="glyphicon glyphicon-time"></span> {comment.date}</span>
                <div className="panel-body">{comment.content}</div>
            </li>
        );
    }
}

Comment.propTypes = {
    comment: React.PropTypes.shape({
        _id: React.PropTypes.string.isRequired,
        creator: React.PropTypes.object.isRequired,
        date: React.PropTypes.string.isRequired,
        content: React.PropTypes.string.isRequired
    })
};