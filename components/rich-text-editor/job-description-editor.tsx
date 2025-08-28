import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { MenubarForRichTextEditor } from "./menu-bar";
import TextAlign from "@tiptap/extension-text-align";
import Typography from "@tiptap/extension-typography";
import { ControllerRenderProps } from "react-hook-form";

interface Props {
  field: ControllerRenderProps;
}

export function JobDescriptionEditor({ field }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Typography,
    ],
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[300px] p-4 max-w-none focus:outline-none prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert",
      },
    },
    onUpdate: ({ editor }) => {
      field.onChange(JSON.stringify(editor.getJSON()));
    },
    content: field.value ? JSON.parse(field.value) : ""
  });

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-card">
      <MenubarForRichTextEditor editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
