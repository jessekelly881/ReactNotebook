import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { StyledH1, StyledP } from "ui/components/elements";
import "./index.scss";
import { createNotebook } from "services/firebase";
import initialVal from "./welcome.yml";

const Button = styled.button`
    background: #444;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    text-decoration: none;
    cursor: pointer;
`;

const createNotebookAndRedirect = history => _ => {
    createNotebook({ data: initialVal }).then(doc =>
        history.push(`/notebook/${doc.id}`),
    );
};

/**
 * WelcomePage
 */
const WelcomePage = withRouter(({ history, ...props }) => (
    <section className="welcomePage">
        <StyledH1>Welcome to React Notebook</StyledH1>
        <StyledP>
            React notebook is an interactive notebook for your react components.
            React notebook lets you share your react components to the world in
            the form of an interactive notebook.
        </StyledP>
        <br />
        <Button onClick={createNotebookAndRedirect(history)}>
            Create A Notebook!
        </Button>
    </section>
));

export default WelcomePage;
