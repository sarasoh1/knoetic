"use client";
import { Button } from "@/components/ui/button";
import {
  useEditor,
  type Editor,
  EditorContent,
  JSONContent,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export function TipTapEditor({
  setJson,
  json,
}: {
  setJson: any;
  json: JSONContent | null;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: json ?? "<p>Hello world :)</p>",
    editorProps: {
      attributes: {
        class: "prose",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON();
      setJson(json);
    },
  });
  return (
    <div>
      <EditorContent
        editor={editor}
        className="rounded-lg border p-2 min-h-[150px] mt-2"
      />
    </div>
  );
}