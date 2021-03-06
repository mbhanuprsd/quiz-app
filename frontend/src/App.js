import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Activate from "./containers/Activate";
import Home from "./containers/Home";
import Login from "./containers/Login";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import SignUp from "./containers/SignUp";
import Layout from "./hocs/Layout";
import store from "./store";

const App = () => (
    <Provider store={store}>
        <Router>
        <Layout>
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/signup' component={SignUp} />
                <Route exact path='/reset-password' component={ResetPassword} />
                <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm} />
                <Route exact path='/activate/:uid/:token' component={Activate} />
            </Switch>
        </Layout>
    </Router>
    </Provider>
);

export default App;