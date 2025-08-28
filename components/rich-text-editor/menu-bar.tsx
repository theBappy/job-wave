import { Editor } from "@tiptap/react";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/tooltip";
import { Toggle } from "../ui/toggle";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  ListIcon,
  ListOrdered,
  Redo,
  Strikethrough,
  Undo,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface Props {
  editor: Editor | null;
}

export function MenubarForRichTextEditor({ editor }: Props) {
  if (!editor) return null;

  const toggleButtons = [
    {
      name: "bold",
      icon: Bold,
      command: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
      label: "Bold",
    },
    {
      name: "italic",
      icon: Italic,
      command: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      label: "Italic",
    },
    {
      name: "strike",
      icon: Strikethrough,
      command: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      label: "Strikethrough",
    },
  ];

  const headingButtons = [1, 2, 3, 4, 5, 6].map((level) => ({
    name: `heading-${level}`,
    icon: [Heading1, Heading2, Heading3, Heading4, Heading5, Heading6][
      level - 1
    ],
    command: () =>
      editor.chain().focus().toggleHeading({ level: level as any }).run(),
    isActive: editor.isActive("heading", { level }),
    label: `Heading ${level}`,
  }));

  const listButtons = [
    {
      name: "bulletList",
      icon: ListIcon,
      command: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
      label: "Bullet List",
    },
    {
      name: "orderedList",
      icon: ListOrdered,
      command: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      label: "Ordered List",
    },
  ];

  const alignButtons = [
    {
      name: "left",
      icon: AlignLeft,
      command: () => editor.chain().focus().setTextAlign("left").run(),
      isActive: editor.isActive({ textAlign: "left" }),
      label: "Align Left",
    },
    {
      name: "center",
      icon: AlignCenter,
      command: () => editor.chain().focus().setTextAlign("center").run(),
      isActive: editor.isActive({ textAlign: "center" }),
      label: "Align Center",
    },
    {
      name: "right",
      icon: AlignRight,
      command: () => editor.chain().focus().setTextAlign("right").run(),
      isActive: editor.isActive({ textAlign: "right" }),
      label: "Align Right",
    },
  ];

  return (
    <div className="border rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
      <TooltipProvider>
        <div className="flex flex-wrap gap-1">
          {[...toggleButtons, ...headingButtons, ...listButtons].map(
            ({ name, icon: Icon, command, isActive, label }) => (
              <Tooltip key={name}>
                <TooltipTrigger asChild>
                  <Toggle
                    size="sm"
                    pressed={isActive}
                    onPressedChange={command}
                    className={cn(
                      isActive && "bg-muted text-muted-foreground"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </Toggle>
                </TooltipTrigger>
                <TooltipContent>{label}</TooltipContent>
              </Tooltip>
            )
          )}
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex flex-wrap gap-1">
          {alignButtons.map(({ name, icon: Icon, command, isActive, label }) => (
            <Tooltip key={name}>
              <TooltipTrigger asChild>
                <Toggle
                  size="sm"
                  pressed={isActive}
                  onPressedChange={command}
                  className={cn(
                    isActive && "bg-muted text-muted-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                </Toggle>
              </TooltipTrigger>
              <TooltipContent>{label}</TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="w-px h-6 bg-border mx-2" />

        <div className="flex flex-wrap gap-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
              >
                <Undo className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="ghost"
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
              >
                <Redo className="w-4 h-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Redo</TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}
