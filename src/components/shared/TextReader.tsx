import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

interface TextEditorProps {
  value: string;
  name?: string;
}

const TextReader = ({ value }: TextEditorProps) => {
  const editor = new Editor({
    extensions: [StarterKit, Underline],
    content: value,
  });

  return <EditorContent editor={editor} />;
};

export default TextReader;
