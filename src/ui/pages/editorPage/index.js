import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNotebook, updateNotebook } from "services/firebase";
import FullEditor from "ui/components/editor";

/**
 * EditorController
 */
export const EditorController = ({ dbValue, id, ...props }) => {
    const [value, setValue] = useState(dbValue);

    useEffect(
        _ => {
            updateNotebook(id, { data: value });
        },
        [value],
    );

    return <FullEditor value={value} setValue={setValue} {...props} />;
};

/**
 * EditorPage
 */
const EditorPage = props => {
    const { id } = useParams();
    const [editorValue, setEditorValue] = useState();

    useEffect(_ => {
        getNotebook(id).then(doc => {
            if (doc.exists) {
                setEditorValue(doc.data().data);
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        });
    }, []);

    if (editorValue) {
        return <EditorController id={id} dbValue={editorValue} />;
    } else {
        return <></>;
    }
};

export default EditorPage;
