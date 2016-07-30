'use strict'

import React from "react";
import PostDetails from "./postDetails";
import CommentList from "../comment/commentList";

export default class PostDetailsComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            post: {
                _id: '',
                creator: {},
                title: '',
                date: '',
                content: '',
                comments: []
            }
        };
        this.getPostData = this.getPostData.bind(this);
    }

    getPostData(params) {
        if (params.postId) {
            this.context.postService.getById(params.postId)
                .then((response) => {
                    this.setState({ post: response });
                    console.log(response);
                }, (err) => {
                    console.log(err);
                });
        }

    }

    componentDidMount() {
        this.getPostData(this.props.params);
    }

    componentWillReceiveProps(nextProps) {
        this.getPostData(nextProps.params);
    }

    render() {
        return (
            <div>
                <PostDetails post={this.state.post} key={this.state.post._id}/>
                <CommentList comments={this.state.post.comments}/>
            </div>
        );
    }
}

PostDetailsComponent.propTypes = {
    params: React.PropTypes.any
};
PostDetailsComponent.contextTypes = {
    postService: React.PropTypes.object
};