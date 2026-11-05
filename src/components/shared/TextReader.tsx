import { Editor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";

interface TextReaderProps {
  value: string;
  name?: string;
  className?: string;
}

const TextReader = ({ value, className = "" }: TextReaderProps) => {
  const editor = new Editor({
    extensions: [
      StarterKit.configure({
        underline: false,
        link: false,
      }),
      Underline,
    ],
    content: value,
  });

  return (
    <EditorContent
      className={className}
      editor={editor}
    />
  );
};

export default TextReader;
