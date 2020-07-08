import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
} from "react-router-dom";
import FullEditor from "ui/components/editor";

/**
 * EditorPage
 */
const EditorPage = props => {
    const { id } = useParams();

    return (
        <>
            <FullEditor />
        </>
    );
};

export default EditorPage;
