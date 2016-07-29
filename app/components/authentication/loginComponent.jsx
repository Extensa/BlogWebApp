'use strict'

import React from "react";

export default class LoginComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            password: ''
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let username = this.state.username.trim();
        let password = this.state.password.trim();

        if (!username || !password) {
            return;
        }

        this.context.authenticationService.login({ username: username, password: password })
            .then((result) => {
                this.context.authenticationService.storeUser(result);
            }, (err) => {
                console.log(err);
            });

        this.setState({
            password: '',
        });
    }

    componentDidMount() {
        if (this.context.authenticationService.isLogged()) {
            this.context.router.push({ pathname: '/' });
        }
    }

    render() {
        return (
            <form className="col-md-5">
                <h3>Login</h3>
                <div className="form-group">
                    <label className="control-label" htmlFor="username">Username </label>
                    <input className="input-sm form-control" type="text" value={this.state.username} id="username"
                        onChange={this.handleUsernameChange}/>
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="password">Password </label>
                    <input className="input-sm form-control" type="password" value={this.state.password} id="password"
                        onChange={this.handlePasswordChange}/>
                </div>
                <input className="btn-success input-sm form-control" type="submit" value="Login" id="submit"
                    onClick={this.handleSubmit}/>
            </form>
        );
    }
}

LoginComponent.contextTypes = {
    authenticationService: React.PropTypes.object,
    router: React.PropTypes.object,
};