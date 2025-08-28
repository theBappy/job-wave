import {Editor} from '@tiptap/react'


interface Props {
    editor: Editor | null;

}

export function MenubarForRichTextEditor({editor}:Props){
    if(!editor) return null;

    return (
        <div className="border rounded-t-lg p-2 bg-card flex flex-wrap gap-1 items-center">
            
        </div>
    )
}