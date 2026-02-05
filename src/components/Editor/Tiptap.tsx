'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph'
const Tiptap = () => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class: "w-full h-[80%]"
      }
    },
    extensions: [
      Document,
      Paragraph,
      Heading.configure({
        levels:[1,2,3]
      }),
      Text
    ],
    content: '<p>Hello World! 🌎️</p>',
    // Don't render immediately on the server to avoid SSR issues
    immediatelyRender: false,
  })

  return <EditorContent editor={editor} />
}

export default Tiptap;