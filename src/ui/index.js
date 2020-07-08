import { LiveProvider, LiveEditor, LiveError, LivePreview } from "react-live";
import styled, { css } from "styled-components";
import React from "react";
import "./index.scss";

export default () => (
    <section id="app">
        <LiveProvider code="<strong>Hello World!</strong>">
            <LiveEditor />
            <LiveError />
            <LivePreview />
        </LiveProvider>
    </section>
);