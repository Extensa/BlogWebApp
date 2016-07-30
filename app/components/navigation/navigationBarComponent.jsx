'use strict'

import React from "react";
import {Link} from 'react-router'

export default class NavigationBarComponent extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = { isLogged: false };
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout() {
        this.context.authenticationService.removeStoredUser();
        this.setState({
                isLogged: false
            });
    }

    componentDidMount() {
        if (this.context.authenticationService.isLogged()) {
            this.setState({
                isLogged: true
            });
        }
    }

    render() {
        if (this.state.isLogged) {
            return (
                <nav className="navbar navbar-default">
                    <div className="container">
                        <div className="navbar-header">
                            <Link to="/">Web Blog</Link>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li><a onClick={this.onLogout}><span className="glyphicon glyphicon-off"></span> Logout</a></li>
                        </ul>
                    </div>
                </nav>
            );
        }
        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand">Web Blog</a>
                    </div>
                    <ul className="nav navbar-nav navbar-right">
                        <li><Link to="login"><span className="glyphicon glyphicon-log-in"></span> Login</Link></li>
                        <li><Link to="register"><span className="glyphicon glyphicon-user"></span> Sign Up</Link></li>
                    </ul>
                </div>
            </nav>
        );
    }
}

NavigationBarComponent.contextTypes = {
    authenticationService: React.PropTypes.object
};