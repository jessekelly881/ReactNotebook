import React from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import styled from "styled-components";
import theme from "./theme";

console.log(theme);

const StyledPreview = styled(LivePreview)`
    position: relative;
    padding: 2rem;
    color: black;
    background: #fafafa;
    height: auto;
    overflow: hidden;
`;

const EditorWrapper = styled.div`
    font-family: "Source Code Pro", monospace;
    font-size: 0.9rem;
    padding: 1rem;
    background: #fafafa;
    overflow: auto;
    * > textarea:focus {
        outline: none;
    }
`;

const StyledEditor = _ => (
    <EditorWrapper>
        <LiveEditor />
    </EditorWrapper>
);

const StyledError = styled(LiveError)`
    display: block;
    padding: 1rem;
    background: #ff7f7f;
    color: black;
    white-space: pre-wrap;
    text-align: left;
    font-size: 0.9em;
    font-family: "Source Code Pro", monospace;
`;

const StyledProvider = styled(LiveProvider)`
    overflow: hidden;
`;

export default () => (
    <section className="componentEditor">
        <StyledProvider code="<strong>Hello World!</strong>" theme={theme}>
            <StyledEditor />
            <StyledPreview />
            <StyledError />
        </StyledProvider>
    </section>
);
