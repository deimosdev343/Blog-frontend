"use client";
import {OrbitProgress} from 'react-loading-indicators';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import { BiSave } from "react-icons/bi";
import TextAlign from '@tiptap/extension-text-align';
import {FontSize, TextStyle} from "@tiptap/extension-text-style";
import { useState } from "react";
import { IoSparkles } from "react-icons/io5";
import axios from "axios";

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
      className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 border ${
        active
          ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
          : "bg-white text-gray-700 border-gray-200 hover:bg-indigo-50 hover:border-indigo-300"
      }`}
    >
      {label}
    </button>
  );
}

const RTEditor = ({onSave} :{onSave: (title: string, content: string) => Promise<void>}) => {

  const getSuggestions = async () => {
    try {
      setSuggestionState({
        loading: true, 
        
        suggestionList: [],
        error: ""
      });
      const text = editor?.getText();
      
      if(text != undefined && text.trim().length < 1) {
        return setSuggestionState({
          loading:false,
          suggestionList: [],
          
          error: "Enter Text to get suggestions"
        })
      }
      const res = await axios.post('/api/ai/suggestions/v2', {post: text});
      console.log(res);
      setSuggestionState({loading: false, suggestionList: res.data.suggestions, error:""});
    } catch (err) {
      setSuggestionState({loading: false, suggestionList:[],  error: "Try Again Later"});

    }
  }
  const [title, setTitle] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [suggestionState, setSuggestionState] = useState({
    loading: false,
    suggestionList: [],
    error:""
  });
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
      }),
      FontSize,
      TextStyle
    ],
    content:"",
    immediatelyRender: false,

    editorProps: {
      attributes:{
        class:"max-w-none focus:outline-none border-2 border-gray-200 rounded-2xl min-h-[14rem] p-4 bg-white/80 backdrop-blur-sm shadow-sm focus:shadow-md focus:border-indigo-300 transition-all duration-200 text-gray-900"
      }
    }
  })

  if(!editor) return null;

  return (
    <div className="w-full h-screen px-4 py-6 bg-gradient-to-b from-indigo-50/50 to-white">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full text-5xl font-bold placeholder:text-gray-400 focus:outline-none mb-8 bg-transparent text-gray-900 border-b border-slate-500/25"
      />
      <div className="flex w-full items-center gap-5 justify-between shadow-md p-5 border border-slate-400/20 mb-2 rounded-xl bg-white">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center font-bold mb-3 ">
            <h2 className="font-bold text-lg text-gray-800">Text Styling</h2>
          </div>

          <div className="flex gap-2 mb-6 text-sm">
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
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">

          <div className="flex items-center font-bold mb-3">
            <h2 className="font-bold text-lg text-gray-800">Text Alignment</h2>
          </div>
          <div className="flex gap-2 mb-6 text-sm">
            <ToolbarButton
              active={editor.isActive({ textAlign: "left" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("left").run()
              }
              label="Left"
            />
            <ToolbarButton
              active={editor.isActive({ textAlign: "center" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("center").run()
              }
              label="Center"
            />
            <ToolbarButton
              active={editor.isActive({ textAlign: "right" })}
              onClick={() =>
                editor.chain().focus().setTextAlign("right").run()
              }
              label="right"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">

          <div className="flex items-center font-bold mb-3">
            <h2 className="font-bold text-lg text-gray-800">Text Size</h2>
          </div>
          <div className="flex gap-4 mb-6 items-center">
            <div className="flex-1">
              <input
                type="range"
                min="1"
                max="250"
                defaultValue={fontSize}
                onChange={(e) => {
                }}
                onMouseUp={(e: React.MouseEvent<HTMLInputElement>) => {
                  const size = parseInt(e.currentTarget.value);
                  setFontSize(size);
                  editor.chain().focus().setFontSize(`${size}px`).run();
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-auto cursor-pointer accent-[#2f54a5]"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={fontSize}
                onChange={(e) => {
                  const size = Math.max(1, Math.min(250, parseInt(e.target.value) || 1));
                  setFontSize(size);
                  editor.chain().focus().setFontSize(`${size}px`).run();
                }}
                min="1"
                max="250"
                className="w-16  p-1 border border-gray-200 rounded-lg focus:outline-none focus:border-indigo-300 transition-all text-gray-700 font-medium text-center"
              />
              <span className="text-gray-600 font-medium">px</span>
            </div>
        </div>
      </div>
      </div>
      <EditorContent editor={editor} />
      <div className="w-full flex flex-col items-start p-1 gap-2">
        <button
          className="flex items-center gap-2 border border-slate-400/40 text-[#2f54a5] 
            hover:bg-slate-100  font-semibold px-6 py-3 mt-4 rounded-xl cursor-pointer
            transition-all duration-500 shadow-md hover:shadow-lg"
          onClick={getSuggestions}
        >
          <p>Get Suggestions</p>
          <IoSparkles />
        </button>
        {suggestionState.loading && <div className="flex flex-col w-full items-center gap-5 justify-between shadow-md p-5 border border-slate-400/20 mb-2 rounded-xl bg-white">
          <OrbitProgress color="#666" size="medium" text="" textColor="" />          
          
        </div>}
        {!suggestionState.loading && suggestionState.suggestionList?.length > 1 && 
          <div className="flex flex-col w-full items-center gap-5 justify-between shadow-md p-5 border border-slate-400/20 mb-2 rounded-xl bg-white">
            {suggestionState.suggestionList.map(st => <div className='flex items-center justify-between p-2 w-full border 
              border-slate-500/20 mb-1 rounded-lg shadow-md'>
              <p className='font-semibold text-md'>{st}</p>
            </div>)}
          </div>
        }
         {!suggestionState.loading && suggestionState.error && 
          <div className="flex flex-col w-full items-center gap-5 justify-between shadow-md p-5 border
             border-slate-400/20 mb-2 rounded-xl bg-white">
            <p>
              {suggestionState.error}
            </p>
          </div>
        }
      </div>
      <div className="w-full flex items-center p-2 mt-6">
        <button
          className="flex items-center gap-2 border border-slate-400/40 text-[#2f54a5] 
            hover:bg-slate-100  font-semibold px-6 py-3 mt-4 rounded-xl cursor-pointer
            transition-all duration-500 shadow-md hover:shadow-lg active:scale-95"
          onClick={() => {
            onSave(title, editor.getHTML());
            editor.commands.setContent("");
            setTitle("");
            
          }}
        >
          <div className="bg-indigo-100 p-2 rounded-xl">
            <BiSave size={20}/>
          </div>
          <span className="mt-1">Save Post</span>
        </button>

      </div>
    </div>
  )
}

export default RTEditor