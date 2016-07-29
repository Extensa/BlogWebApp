'use strict'

import React from "react";

export default class RegisterComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            username: '',
            email: '',
            password: ''
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({ username: e.target.value });
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();
        let username = this.state.username.trim(),
            email = this.state.email.trim(),
            password = this.state.password.trim();

        if (!username || !email || !password) {
            return;
        }

        this.context.authenticationService.register({ username: username, email: email, password: password })
            .then((result) => {
                this.context.authenticationService.storeUser(result);
            }, (err) => {
                console.log(err);
            });

        this.setState({
            username: '',
            email: '',
            password: ''
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
                <h3>Register</h3>
                <div className="form-group">
                    <label className="control-label" htmlFor="username">Username </label>
                    <input className="input-sm form-control" type="text" value={this.state.username} id="username"
                        onChange={this.handleUsernameChange}/>
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="email">Email </label>
                    <input className="input-sm form-control" type="text" value={this.state.email} id="email"
                        onChange={this.handleEmailChange}/>
                </div>
                <div className="form-group">
                    <label className="control-label" htmlFor="password">Password </label>
                    <input className="input-sm form-control" type="password" value={this.state.password} id="password"
                        onChange={this.handlePasswordChange}/>
                </div>
                <input className="btn-info input-sm form-control" type="submit" value="Register" onClick={this.handleSubmit}/>
            </form>
        );
    }
}

RegisterComponent.contextTypes = {
    authenticationService: React.PropTypes.object,
    router: React.PropTypes.object,
};