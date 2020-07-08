import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { getNotebook, updateNotebook } from "services/firebase";
import FullEditor from "ui/components/editor";

/**
 * EditorController
 */
export const EditorController = ({ dbValue, id, ...props }) => {
    const updateValue = val => {
        setValue(val);
        updateNotebook(id)({ data: val });
    };

    const [value, setValue] = useState(dbValue);
    return <FullEditor value={value} setValue={updateValue} {...props} />;
};

/**
 * EditorPage
 */
const EditorPage = props => {
    const { id } = useParams();
    const [editorValue, setEditorValue] = useState();

    getNotebook(id).then(doc => {
        if (doc.exists) {
            setEditorValue(doc.data().data);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    });

    if (editorValue) {
        return <EditorController id={id} dbValue={editorValue} />;
    } else {
        return <></>;
    }
};

export default EditorPage;
