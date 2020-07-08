import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import EditorPage from "ui/pages/editorPage";
import WelcomePage from "ui/pages/welcomePage";

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
                <WelcomePage />
            </Route>
        </Switch>
    </Router>
);

export default AppRouter;
