import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import { Slate, Editable, withReact } from "slate-react";
import styled, { css } from "styled-components";
import React from "react";
import "./index.scss";

const StyledPreview = styled(LivePreview)`
    position: relative;
    padding: 0.5rem;
    background: #fafafa;
    color: black;
    height: auto;
    overflow: hidden;
`;

export default () => (
    <section id="app">
        <LiveProvider code="<strong>Hello World!</strong>">
            <LiveEditor />
            <LiveError />
            <StyledPreview />
        </LiveProvider>
    </section>
);
