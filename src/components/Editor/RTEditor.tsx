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
import { useEffect, useRef, useState } from "react";
import { IoAddCircle, IoEllipsisHorizontal, IoExpand, IoRefresh, IoSparkles, IoSparklesSharp } from "react-icons/io5";
import axios from "axios";
import { BubbleMenu } from "@tiptap/react/menus";
import { FaPencil } from 'react-icons/fa6';

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
 
function BubbleButton({
  onClick,
  label,
  disabled,
  pending,
}: {
  onClick: () => void;
  label: string;
  disabled?: boolean;
  pending?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap
        transition-colors duration-150 font-bold focus:outline-none focus-visible:ring-2
        focus-visible:ring-indigo-400 disabled:cursor-not-allowed
        ${
          pending
            ? "bg-indigo-100 text-[#2f54a5]"
            : "text-[#2f54a5] hover:bg-indigo-50 disabled:opacity-40"
        }`}
    >
      {pending ? `${label}…` : label}
    </button>
  );
}

type QuickAction = "improve" | "shorten" | "expand" | "grammar";
type Tone = "professional" | "casual" | "confident" | "plain";
 
const QUICK_ACTIONS: { id: QuickAction; label: string }[] = [
  { id: "improve", label: "Improve" },
  { id: "shorten", label: "Shorten" },
  { id: "expand", label: "Expand" },
  { id: "grammar", label: "Fix grammar" },
];

 
const TONES: { id: Tone; label: string }[] = [
  { id: "professional", label: "Professional" },
  { id: "casual", label: "Casual" },
  { id: "confident", label: "Confident" },
  { id: "plain", label: "Plain" },
];

const CONTEXT_CHARS = 4000;
 

const RTEditor = ({onSave} :{onSave: (title: string, content: string) => Promise<boolean>}) => {
  const [saveState, setSaveState] = useState({ saving: false, error: "" })
  
  const getSuggestionFunc = () => {
    const text = editor?.getText();
    getSuggestions(text)
  }
  
  const getSuggestions = async (text:string | undefined) => {
    try {
      setSuggestionState({
        loading: true, 
        
        suggestionList: [],
        error: ""
      });
      
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
  const getExpantion = async (text:string | undefined, suggestion: string | undefined) => {
    try {
      setExpantionState({
        loading: true, 
        error: "",
        expandedText:""
      });
      
      if(text != undefined && text.trim().length < 1) {
        return setExpantionState({
          loading:false,
          expandedText:"",
          error: "Enter Text to get suggestions"
        })
      }

      const res = await axios.post('/api/ai/expand', {post: text, suggestion: suggestion});
      setExpantionState({loading: false, expandedText: res.data.expanded_text, error:""});
    } catch (err) {
      setExpantionState({loading: false, expandedText:"",  error: "Try Again Later"});
    }
  }
  const transformSelection = async (
    action: QuickAction | "tone",
    tone?: Tone
  ) => {
    if (!editor) return; 
    const { from, to, empty } = editor.state.selection;
    if (empty) return;

    const selected = editor.state.doc.textBetween(from, to, " ").trim();
    if (!selected) return;

    transformAbort.current?.abort();
    const controller = new AbortController();
    transformAbort.current = controller;

    setTransformState({ pending: tone ?? (action as QuickAction), error: "" });
    setToneOpen(false);

        try {
      const full = editor.getText();
      const res = await axios.post(
        "/api/ai/transform",
        {
          text: selected,
          action,
          tone,
          context: full.slice(0, CONTEXT_CHARS),
        },
        { signal: controller.signal }
      );
 
      const result: string = res.data?.result ?? "";
      if (!result.trim()) {
        throw new Error("empty result");
      }
 
      // One chained transaction, so a single Ctrl+Z puts the original back
      // and the rewritten text stays selected for a follow-up action.
      editor
        .chain()
        .focus()
        .insertContentAt({ from, to }, result)
        .setTextSelection({ from, to: from + result.length })
        .run();
 
      setTransformState({ pending: null, error: "" });
    } catch (err) {
      if (axios.isCancel(err)) return;
      setTransformState({
        pending: null,
        error: "That edit didn't go through. Try again.",
      });
      setTimeout(
        () => setTransformState((s) => ({ ...s, error: "" })),
        3000
      );
    }
  }

  const [title, setTitle] = useState("");
  const [fontSize, setFontSize] = useState(24);
  const [suggestionState, setSuggestionState] = useState({
    loading: false,
    suggestionList: [],
    error:""
  });
  const [expantionState, setExpantionState] = useState({
    loading: false,
    expandedText:"",
    error:""
  });
  const [transformState, setTransformState] = useState<{
    pending: QuickAction | Tone | null;
    error: string;
  }>({ pending: null, error: "" });
 
  const [toneOpen, setToneOpen] = useState(false);
 
  const transformAbort = useRef<AbortController | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading:{levels: [1,2]},
        link: {openOnClick: true}
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
  
  useEffect(() => () => transformAbort.current?.abort(), []);
  
  if(!editor) return null;

  
  const hanldeSave = async () => {
    if(saveState.saving) return;
    setSaveState({saving: true, error: ""});
    const ok = await onSave(title, editor.getHTML());
    if(ok) {
      editor.commands.setContent("");
      setTitle("");
      setSaveState({saving:false, error: ""});
    } else {
      setSaveState({
        saving:false,
        error: `Couldn't save, try again in a bit`
      });
    }
  }

  const addSuggestionToText = (st: string) => {
    editor.chain().focus().insertContentAt(editor.state.doc.content.size,  " " + st).run()
  }
  const busy = transformState.pending !== null;
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
      <BubbleMenu
        editor={editor}
        options={{ offset: 8, placement: "top" }}
        shouldShow={({ editor, from, to }) =>
          editor.isEditable &&
          to - from > 2 &&
          !editor.isActive("codeBlock") &&
          !editor.isActive("image")
        }
      >
        {/* preventDefault keeps the ProseMirror selection intact on click */}
        <div
          onMouseDown={(e) => e.preventDefault()}
          className="flex flex-col gap-1 rounded-xl border border-slate-400/30 bg-white p-1 shadow-lg"
        >
          <div className="flex items-center gap-1">
            <FaPencil className="ml-2 mr-1 text-[#2f54a5]" size={16} />
            {QUICK_ACTIONS.map((a) => (
              <BubbleButton
                key={a.id}
                label={a.label}
                disabled={busy}
                pending={transformState.pending === a.id}
                onClick={() => transformSelection(a.id)}
              />
            ))}
 
            <span className="w-px h-5 bg-slate-300/70 mx-1" />
 
            <BubbleButton
              label={toneOpen ? "Tone ▴" : "Tone ▾"}
              disabled={busy}
              onClick={() => setToneOpen((v) => !v)}
            />
          </div>
 
          {toneOpen && (
            <div className="flex items-center gap-1 border-t font-bold border-slate-200 pt-1">
              {TONES.map((t) => (
                <BubbleButton
                  key={t.id}
                  label={t.label}
                  disabled={busy}
                  pending={transformState.pending === t.id}
                  onClick={() => transformSelection("tone", t.id)}
                />
              ))}
            </div>
          )}
 
          {transformState.error && (
            <p className="px-3 py-1 text-xs text-red-600">
              {transformState.error}
            </p>
          )}
        </div>
      </BubbleMenu>

      <EditorContent editor={editor} />
      <div className="w-full flex flex-col items-start p-1 gap-2">
        <button
          className="flex items-center gap-2 border border-slate-400/40 text-[#2f54a5] font-bold! 
            hover:bg-slate-100 px-6 py-3 mt-4 rounded-xl cursor-pointer
            transition-all duration-500 shadow-md hover:shadow-lg"
          onClick={getSuggestionFunc}
        >
          <p>Get Suggestions</p>
          <IoSparkles />
        </button>
        {suggestionState.loading && <div className="flex flex-col w-full items-center gap-5 justify-between shadow-md p-5 border border-slate-400/20 mb-2 rounded-xl bg-white">
          <OrbitProgress color="#666" size="medium" text="" textColor="" />  
        </div>}
        {!suggestionState.loading && suggestionState.suggestionList?.length > 0 && 
          <div className="flex flex-col w-full items-center gap-5 justify-between shadow-md p-5 border border-slate-400/20 mb-2 rounded-xl bg-white">
            {suggestionState.suggestionList.map(st => <div className='flex items-center justify-between p-2 w-full border 
              border-slate-500/20 mb-1 rounded-lg shadow-md'>
              <p className='font-semibold text-md'>{st}</p>
              <div className='flex p-1 gap-2'>
                <button 
                  className='p-1 shadow-md border rounded-xl border-[#888] text-[#2f54a5] cursor-pointer'
                  onClick={() => {
                    addSuggestionToText(st)
                  }}
                >
                  <IoAddCircle  size={25}/>
                </button>
                {/* Hiding this until I can fix the api or put up something better altogether */}
                {/* <button 
                  className='p-1 shadow-md border rounded-xl border-[#888] text-[#2f54a5] cursor-pointer'
                  onClick={() => {
                    const text = editor?.getText()
                    getExpantion(text,st);
                  }}
                >
                  <IoEllipsisHorizontal  size={25}/>
                </button> */}
                
                <button 
                  className='p-1 shadow-md border rounded-xl border-[#888] text-[#2f54a5] cursor-pointer'
                  onClick={() => {
                    getSuggestions(editor.getText());
                  }}
                >
                  <IoRefresh  size={25}/>
                </button>

              </div>
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

        {expantionState.loading && <div className="flex flex-col w-full items-center gap-5 justify-between shadow-md p-5 border border-slate-400/20 mb-2 rounded-xl bg-white">
          <OrbitProgress color="#666" size="medium" text="" textColor="" />          
        </div>}
        {!expantionState.loading && expantionState.expandedText != "" && <div 
          className='flex items-center justify-between p-2 w-full border border-slate-500/20 mb-1 rounded-lg shadow-md'
        >
          <p className='font-semibold text-md'>{expantionState.expandedText}</p>
        </div>}
        {!expantionState.loading && expantionState.error && 
          <div className="flex flex-col w-full items-center gap-5 justify-between shadow-md p-5 border
              border-slate-400/20 mb-2 rounded-xl bg-white">
            <p>
              {expantionState.error}
            </p>
          </div>
        }
      </div>
      <div className="w-full flex items-center p-2 mt-6">
        <button
          disabled={saveState.saving}
          className="flex items-center gap-2 border border-slate-400/40 text-[#2f54a5] 
            hover:bg-slate-100  font-semibold px-6 py-3 mt-4 rounded-xl cursor-pointer
            transition-all duration-500 shadow-md hover:shadow-lg active:scale-95"
          onClick={hanldeSave}
        >
          <div className="bg-indigo-100 p-2 rounded-xl">
            <BiSave size={20}/>
          </div>
          <span className="mt-1">{saveState.saving ? "Saving..." : "Save Post"}</span>
        </button>
        {saveState.error && (
          <p className='text-red-600 text-sm mt-2 px-2'>{saveState.error}</p>
        )}
      </div>
    </div>
  )
}

export default RTEditor