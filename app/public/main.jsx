import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

/* Components */
import RegisterComponent from "../components/authentication/registerComponent";
import LoginComponent from "../components/authentication/loginComponent";
import NavigationBarComponent from "../components/navigation/navigationBarComponent";
import PostComponent from "../components/post/postComponent";

/* Services */
import AuthenticationService from "../services/authenticationService";
import PostService from "../services/postService";

const routes = ()=> {
    return (
        <Router history={browserHistory}>
            <Route component={App}>
                <Route path="/register" component={RegisterComponent}/>
                <Route path="/login" component={LoginComponent}/>
                <Route path="/" component={PostComponent}/>
            </Route>
        </Router>
    );
};

/* Base api url */
const BASEURL = 'http://localhost:3000/api';

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.authenticationService = new AuthenticationService(BASEURL);
        this.postService = new PostService(BASEURL);
    }

    getChildContext() {
        return {
            authenticationService: this.authenticationService,
            postService: this.postService
        };
    }

    render() {
        return (
            <div className="wrapper">
                <NavigationBarComponent/>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}
App.propTypes = {
    children: React.PropTypes.node
};
App.contextTypes = {
    router: React.PropTypes.object
};
App.childContextTypes = {
    authenticationService: React.PropTypes.object,
    postService: React.PropTypes.object
};

ReactDOM.render(routes(), document.getElementById('app'));