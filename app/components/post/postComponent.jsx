'use strict'

import React from "react";
import PostList from "./postList";

export default class PostComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            posts: []
        };
        this.getAllPosts = this.getAllPosts.bind(this);
    }

    getAllPosts() {
        this.context.postService.getAll()
            .then((response) => {
                let dataArray = response.sort((a, b) => {
                    return Date.parse(a.date) < Date.parse(b.date);
                });
                this.setState({ posts: dataArray })
            }, (err) => {
                console.log(err);
            });
    }

    componentDidMount() {
         this.getAllPosts();
    }

    render() {
        return (
            <div>
                <PostList posts={this.state.posts}/>
            </div>   
        );
    }
}

PostComponent.contextTypes = {
    authenticationService: React.PropTypes.object,
    postService: React.PropTypes.object
};