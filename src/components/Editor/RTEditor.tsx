"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { BiSave } from "react-icons/bi";
import TextAlign from '@tiptap/extension-text-align';

function ToolbarButton({
  onClick,
  active,
  label,
}: {
  onClick: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-2 py-1 rounded border ${
        active
          ? "bg-black text-white"
          : "bg-white text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  );
}

const RTEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading:{levels: [1,2]},
      }),
      Link.configure({
        openOnClick: true
      }),
      Image,
      Placeholder.configure({
        placeholder:"Share your thoughts..."
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      })
    ],
    content:"",
    immediatelyRender: false,

    editorProps: {
      attributes:{
        class:"max-w-none focus:outline-none border-1 border-dotted rounded-xl min-h-[14rem] p-1"
      }
    }
  })

  if(!editor) return null;

  return (
    <div className="mx-auto max-w-full h-screen px-2 py-4">
      <input
        type="text"
        placeholder="Title"
        className="w-full text-5xl font-bold placeholder:text-gray-300 focus:outline-none mb-8"
      />

      
      <h2 className="font-bold text-xl">Text styling</h2>

      <div className="flex gap-2 mb-4 text-sm text-gray-600">
        <ToolbarButton
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
          label="B"
        />
        <ToolbarButton
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          label="I"
        />
        <ToolbarButton
          active={editor.isActive("blockQuote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          label={`"`}
        />
        <ToolbarButton
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          label="</>"
        />
         <ToolbarButton
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
          label="🔗"
        />
        <ToolbarButton
          active={editor.isActive({ textAlign: "center" })}
          onClick={() =>
            editor.chain().focus().setTextAlign("center").run()
          }
          label="Center"
        />
      </div>
      <h2 className="font-bold text-xl">Text Aligment</h2>
      <div className="">

      </div>
      <EditorContent editor={editor} />
      <div className="w-full flex items-center p-1">
        <button
          className="border border-gray-600 p-1 mt-2 rounded-lg cursor-pointer"
          onClick={() => {
            console.log(editor.getHTML());
          }}
        >
          <BiSave size={35} color={"#4a5666"}/>
        </button>

      </div>
    </div>
  )
}

export default RTEditor