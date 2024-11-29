import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TextEditorProps {
  value: string;
  name?: string;
}

const TextReader = ({ value }: TextEditorProps) => {
  const editor = new Editor({
    extensions: [StarterKit],
    content: value,
  });

  return <EditorContent editor={editor} />;
};

export default TextReader;
