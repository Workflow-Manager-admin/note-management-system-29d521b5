"use client";

import React, { useEffect, useState } from "react";
import { Note } from "./NoteList";

// PUBLIC_INTERFACE
interface NoteDetailProps {
  note?: Note;
  onEdit: (title: string, content: string) => void;
  onSave: () => void;
  onDelete: () => void;
  isEditing: boolean;
  setIsEditing: (edit: boolean) => void;
}

// PUBLIC_INTERFACE
export default function NoteDetail({
  note,
  onEdit,
  onSave,
  onDelete,
  isEditing,
  setIsEditing,
}: NoteDetailProps) {
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
  }, [note?.id, note?.title, note?.content]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(title, content);
    onSave();
    setIsEditing(false);
  };

  if (!note) {
    return (
      <section className="flex flex-col h-full p-8 items-center justify-center text-gray-400">
        <span className="italic">Select a note or create one to get started.</span>
      </section>
    );
  }

  return (
    <section className="flex flex-col h-full w-full overflow-y-auto">
      <div className="flex items-center justify-between gap-4 px-6 pt-8 pb-4 border-b border-gray-100">
        {isEditing ? (
          <input
            className="w-full font-semibold text-2xl bg-transparent border-b border-primary outline-none focus:outline-none px-1 py-1"
            aria-label="Note title"
            value={title}
            onChange={e => setTitle(e.target.value)}
            autoFocus
          />
        ) : (
          <h2 className="text-xl sm:text-2xl font-semibold break-words">{title || <span className="text-gray-400 italic">Untitled</span>}</h2>
        )}
        <div className="flex gap-2">
          {isEditing ? (
            <button
              className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 text-sm transition"
              onClick={handleSave}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-accent text-white px-4 py-2 rounded hover:bg-orange-600 text-sm transition"
              onClick={handleEdit}
            >
              Edit
            </button>
          )}
          <button
            className="bg-gray-100 dark:bg-gray-900 text-secondary px-3 py-2 rounded hover:bg-red-500 hover:text-white transition text-sm"
            onClick={() => {
              if (
                window.confirm("Are you sure you want to delete this note?")
              ) {
                onDelete();
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <main className="flex-1 px-6 py-4">
        {isEditing ? (
          <textarea
            className="w-full h-60 min-h-[150px] font-mono text-base border border-primary resize-vertical rounded py-2 px-3 focus:outline-none focus:ring focus:border-primary"
            value={content}
            onChange={e => setContent(e.target.value)}
            aria-label="Note content"
          />
        ) : (
          <div className="whitespace-pre-line font-mono text-base">
            {content || <span className="text-gray-400 italic">No content yet.</span>}
          </div>
        )}
      </main>
    </section>
  );
}
