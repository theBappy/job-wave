import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function JobDescriptionEditor() {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: false,
  });

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-card">
      <EditorContent editor={editor} />
    </div>
  );
}
