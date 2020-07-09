import React, { useCallback, useMemo } from "react";
import { createEditor, Editor, Point, Range, Transforms } from "slate";
import { withHistory } from "slate-history";
import { Editable, Slate, withReact } from "slate-react";
import ComponentEditor from "ui/components/componentEditor";
import {
    PaddedComponent,
    StyledH1,
    StyledH2,
    StyledH3,
    StyledH4,
    StyledH5,
    StyledP,
} from "ui/components/elements";

const SHORTCUTS = {
    "*": "list-item",
    "-": "list-item",
    "+": "list-item",
    ">": "block-quote",
    "#": "heading-one",
    "##": "heading-two",
    "###": "heading-three",
    "####": "heading-four",
    "#####": "heading-five",
    "######": "heading-six",
    "`": "component-editor",
};

const withEditableVoids = editor => {
    const { isVoid } = editor;

    editor.isVoid = element => {
        return element.type === "component-editor" ? true : isVoid(element);
    };

    return editor;
};

const FullEditor = ({ value, setValue, ...props }) => {
    const editor = useMemo(
        () =>
            withEditableVoids(
                withShortcuts(withReact(withHistory(createEditor()))),
            ),
        [],
    );

    const renderElement = useCallback(props => <Element {...props} />, []);

    return (
        <Slate
            editor={editor}
            value={value}
            onChange={value => setValue(value)}
            {...props}>
            <Editable
                onKeyDown={key => console.log(key)}
                renderElement={renderElement}
                placeholder="Welcome to React Notebook!"
                spellCheck
                autoFocus
            />
        </Slate>
    );
};

const withShortcuts = editor => {
    const { deleteBackward, insertText } = editor;

    editor.insertText = text => {
        const { selection } = editor;

        if (text === " " && selection && Range.isCollapsed(selection)) {
            const { anchor } = selection;
            const block = Editor.above(editor, {
                match: n => Editor.isBlock(editor, n),
            });
            const path = block ? block[1] : [];
            const start = Editor.start(editor, path);
            const range = { anchor, focus: start };
            const beforeText = Editor.string(editor, range);
            const type = SHORTCUTS[beforeText];

            if (type) {
                Transforms.select(editor, range);
                Transforms.delete(editor);
                Transforms.setNodes(
                    editor,
                    { type },
                    { match: n => Editor.isBlock(editor, n) },
                );

                if (type === "list-item") {
                    const list = { type: "bulleted-list", children: [] };
                    Transforms.wrapNodes(editor, list, {
                        match: n => n.type === "list-item",
                    });
                }

                return;
            }
        }

        insertText(text);
    };

    editor.deleteBackward = (...args) => {
        const { selection } = editor;

        if (selection && Range.isCollapsed(selection)) {
            const match = Editor.above(editor, {
                match: n => Editor.isBlock(editor, n),
            });

            if (match) {
                const [block, path] = match;
                const start = Editor.start(editor, path);

                if (
                    block.type !== "paragraph" &&
                    Point.equals(selection.anchor, start)
                ) {
                    Transforms.setNodes(editor, { type: "paragraph" });

                    if (block.type === "list-item") {
                        Transforms.unwrapNodes(editor, {
                            match: n => n.type === "bulleted-list",
                            split: true,
                        });
                    }

                    return;
                }
            }

            deleteBackward(...args);
        }
    };

    return editor;
};

const Element = props => {
    const { attributes, children, element } = props;

    switch (element.type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return (
                <PaddedComponent>
                    <StyledH1 {...attributes}>{children}</StyledH1>
                </PaddedComponent>
            );
        case "heading-two":
            return (
                <PaddedComponent>
                    <StyledH2 {...attributes}>{children}</StyledH2>
                </PaddedComponent>
            );
        case "heading-three":
            return (
                <PaddedComponent>
                    <StyledH3 {...attributes}>{children}</StyledH3>
                </PaddedComponent>
            );
        case "heading-four":
            return (
                <PaddedComponent>
                    <StyledH4 {...attributes}>{children}</StyledH4>
                </PaddedComponent>
            );
        case "heading-five":
            return (
                <PaddedComponent>
                    <StyledH5 {...attributes}>{children}</StyledH5>
                </PaddedComponent>
            );
        case "heading-six":
            return (
                <PaddedComponent>
                    <StyledH5 {...attributes}>{children}</StyledH5>
                </PaddedComponent>
            );
        case "list-item":
            return <li {...attributes}>{children}</li>;

        case "component-editor":
            return <ComponentEditor {...props} />;

        default:
            return (
                <PaddedComponent>
                    <StyledP {...attributes}>{children}</StyledP>
                </PaddedComponent>
            );
    }
};

export default FullEditor;
