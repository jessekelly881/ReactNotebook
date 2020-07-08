import React, { useState } from "react";
import { LiveEditor, LiveError, LivePreview, LiveProvider } from "react-live";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import styled from "styled-components";
import "./index.scss";

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

const StyledHeader = styled.div`
    height: 20px;
    padding: 1rem;
    background: #fafafa;
`;

const StyledEditor = _ => (
    <EditorWrapper>
        <LiveEditor />
    </EditorWrapper>
);

const StyledError = styled(LiveError)`
    display: block;
    padding: 1rem;
    margin: 0;
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

export default () => {
    const [code, setCode] = useState("<strong>Hello World!</strong>");
    return (
        <section className="componentEditor">
            <StyledProvider code={code}>
                <StyledHeader></StyledHeader>
                <AceEditor
                    style={{
                        height: "200px",
                        width: "100%",
                        background: "#fafafa",
                    }}
                    mode="javascript"
                    value={code}
                    theme="github"
                    onChange={val => setCode(val)}
                    name="UNIQUE_ID_OF_DIV"
                    fontSize={16}
                    editorProps={{ $blockScrolling: true }}
                    showPrintMargin={false}
                />
                <StyledError />
                <StyledPreview />
            </StyledProvider>
        </section>
    );
};
