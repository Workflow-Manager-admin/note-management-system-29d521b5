"use client";

import React from "react";

// PUBLIC_INTERFACE
export interface Note {
  id: string;
  title: string;
  content: string;
  lastEdited: number; // timestamp
}

// PUBLIC_INTERFACE
interface NoteListProps {
  notes: Note[];
  selectedId?: string;
  searchQuery: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onSearchChange?: (query: string) => void;
}

export function truncate(str: string, n: number) {
  return str.length > n ? str.substr(0, n - 1) + "…" : str;
}

// PUBLIC_INTERFACE
export default function NoteList({
  notes,
  selectedId,
  searchQuery,
  onSelect,
  onAdd,
  onDelete,
  onSearchChange,
}: NoteListProps) {
  const empty = notes.length === 0;

  return (
    <aside className="flex flex-col h-full min-w-0 bg-[var(--background)] shadow-lg border-r border-gray-200 dark:border-gray-800">
      <div className="flex items-center gap-2 p-2 bg-[var(--background)] border-b border-gray-200 dark:border-gray-800">
        <input
          type="text"
          className="w-full px-3 py-2 rounded border text-sm focus:outline-none focus:border-primary bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 caret-primary"
          placeholder="Search notes…"
          autoCorrect="off"
          value={searchQuery}
          aria-label="Search notes"
          onChange={onSearchChange ? (e) => onSearchChange(e.target.value) : undefined}
        />
        <button
          className="bg-primary text-white hover:bg-blue-700 rounded-full px-4 py-2 ml-2 transition text-sm"
          title="New note"
          onClick={onAdd}
        >
          +
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto" aria-label="Note list">
        {empty ? (
          <li className="py-8 text-center text-gray-400 select-none">
            No notes found.
          </li>
        ) : (
          notes.map((note) => (
            <li key={note.id} className="border-b border-dashed border-gray-100 last:border-b-0">
              <button
                className={
                  "block w-full text-left px-4 py-3 transition focus:outline-none rounded-none " +
                  (selectedId === note.id
                    ? "bg-primary/10 border-r-[4px] border-primary text-primary"
                    : "hover:bg-gray-100 dark:hover:bg-gray-900")
                }
                onClick={() => onSelect(note.id)}
                aria-current={selectedId === note.id}
              >
                <div className="flex justify-between items-center">
                  <div className="font-semibold text-sm truncate">{truncate(note.title, 40) || <span className="text-gray-400 italic">Untitled</span>}</div>
                  <button
                    title="Delete note"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(note.id);
                    }}
                    className="text-secondary hover:text-red-500 px-1 ml-2 rounded transition"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} className="inline" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M19 7 5 21M5 7l14 14" /></svg>
                  </button>
                </div>
                <div className="text-xs text-gray-500">{truncate(note.content.replace(/\n/g, " "), 50)}</div>
                <div className="text-xs text-gray-400 mt-1">
                  {new Date(note.lastEdited).toLocaleString()}
                </div>
              </button>
            </li>
          ))
        )}
      </ul>
    </aside>
  );
}
