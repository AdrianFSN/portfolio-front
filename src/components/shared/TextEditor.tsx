import "./TextEditor.css";
import { Editor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  name?: string;
}

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [focusB, setFocusB] = useState(false);
  const [focusU, setFocusU] = useState(false);

  useEffect(() => {
    const newEditor = new Editor({
      extensions: [
        StarterKit.configure({
          underline: false,
          link: false,
        }),
        Underline,
      ],
      content: value,
      onUpdate: ({ editor }) => {
        onChange(editor.getHTML());
      },
    });

    setEditor(newEditor);
    return () => {
      newEditor.destroy();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(value, {
        emitUpdate: false,
        parseOptions: {
          preserveWhitespace: "full",
        },
      });
    }
  }, [value, editor]);

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const toggleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  return (
    <div>
      <div className="toolbar">
        <div className="toolbar__buttons__container">
          <button
            className={`toolbar__button ${focusB ? "focused" : ""}`}
            type="button"
            onClick={() => {
              setFocusB(!focusB);
              toggleBold();
            }}
          >
            B
          </button>
          <button
            className={`toolbar__button ${focusU ? "focused" : ""}`}
            type="button"
            onClick={() => {
              setFocusU(!focusU);
              toggleUnderline();
            }}
          >
            U
          </button>
        </div>
      </div>

      <EditorContent
        editor={editor}
        className="form__input"
      />
    </div>
  );
};

export default TextEditor;
