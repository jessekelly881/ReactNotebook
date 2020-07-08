import React, { useState, useCallback, useMemo } from "react";
import { Slate, Editable, withReact } from "slate-react";
import { Editor, Transforms, Range, Point, createEditor } from "slate";
import { withHistory } from "slate-history";
import {
    StyledP,
    StyledH1,
    StyledH2,
    StyledH3,
    StyledH4,
    StyledH5,
    PaddedComponent,
} from "./components/elements";
import { cx, css } from "emotion";

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
};

const Menu = React.forwardRef(({ className, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        className={cx(
            className,
            css`
                & > * {
                    display: inline-block;
                }
                & > * + * {
                    margin-left: 15px;
                }
            `,
        )}
    />
));

export const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
    <Menu
        {...props}
        ref={ref}
        className={cx(
            className,
            css`
                position: relative;
                padding: 1px 18px 17px;
                margin: 0 -20px;
                border-bottom: 2px solid #eee;
                margin-bottom: 20px;
            `,
        )}
    />
));

const MarkdownShortcutsExample = () => {
    const [value, setValue] = useState(initialValue);
    const renderElement = useCallback(props => <Element {...props} />, []);
    const editor = useMemo(
        () => withShortcuts(withReact(withHistory(createEditor()))),
        [],
    );
    return (
        <Slate
            editor={editor}
            value={value}
            onChange={value => setValue(value)}>
            <Toolbar></Toolbar>
            <Editable
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

const Element = ({ attributes, children, element }) => {
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
        default:
            return (
                <PaddedComponent>
                    <StyledP {...attributes}>{children}</StyledP>
                </PaddedComponent>
            );
    }
};

const initialValue = [
    {
        type: "heading-one",
        children: [
            {
                text: "",
            },
        ],
    },
];

export default MarkdownShortcutsExample;
