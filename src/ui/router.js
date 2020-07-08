import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

/**
 * AppRouter
 */
const AppRouter = props => (
    <Router {...props}>
        <Switch>
            <Route path="/notebook/:id">
                <span>Notebook</span>
            </Route>
            <Route path="/">
                <span>Welcome!</span>
            </Route>
        </Switch>
    </Router>
);

export default AppRouter;
