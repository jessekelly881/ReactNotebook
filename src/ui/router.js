import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditorPage from "ui/pages/editorPage";

/**
 * AppRouter
 */
const AppRouter = props => (
    <Router {...props}>
        <Switch>
            <Route path="/notebook/:id">
                <EditorPage />
            </Route>
            <Route path="/">
                <span>Welcome!</span>
            </Route>
        </Switch>
    </Router>
);

export default AppRouter;
