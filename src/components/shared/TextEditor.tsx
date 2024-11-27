import { Editor, EditorContent } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import StarterKit from "@tiptap/starter-kit";
import { useEffect, useState } from "react";

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const TextEditor = ({ value, onChange }: TextEditorProps) => {
  const [editor, setEditor] = useState<Editor | null>(null);

  useEffect(() => {
    const newEditor = new Editor({
      extensions: [StarterKit, Underline],
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
      editor.commands.setContent(value, false, {
        preserveWhitespace: "full",
      });
    }
  }, [value, editor]);

  const toggleBold = () => {
    editor?.chain().focus().toggleBold().run();
  };

  const toggleItalic = () => {
    editor?.chain().focus().toggleItalic().run();
  };

  const toggleUnderline = () => {
    editor?.chain().focus().toggleUnderline().run();
  };

  return (
    <div>
      <div className="toolbar">
        <button
          type="button"
          onClick={toggleBold}
        >
          B
        </button>
        <button
          type="button"
          onClick={toggleItalic}
        >
          I
        </button>
        <button
          type="button"
          onClick={toggleUnderline}
        >
          U
        </button>
      </div>

      <EditorContent
        editor={editor}
        className="form__input"
      />
    </div>
  );
};

export default TextEditor;
