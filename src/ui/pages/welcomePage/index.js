import React from "react";
import styled from "styled-components";
import { StyledH1, StyledP } from "ui/components/elements";
import "./index.scss";

const Button = styled.a`
    background: #444;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    text-decoration: none;
`;

/**
 * WelcomePage
 */
const WelcomePage = props => (
    <section className="welcomePage">
        <StyledH1>Welcome to React Notebook</StyledH1>
        <StyledP>
            React notebook is an interactive notebook for your react components.
            React notebook lets you share your react components to the world in
            the form of an interactive notebook.
        </StyledP>
        <br />
        <Button href="/notebook/1">Create A Notebook!</Button>
    </section>
);

export default WelcomePage;
