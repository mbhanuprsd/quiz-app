import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Layout from "./hocs/Layout";

const App = () => (
    <Router>
        <Layout>
            <Switch>
                <Route exact path='/' component={Home} />
            </Switch>
        </Layout>
    </Router>
);

export default App;