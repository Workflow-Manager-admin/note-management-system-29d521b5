"use client";

import React, { useState } from "react";
import NoteList from "./components/NoteList";
import NoteDetail from "./components/NoteDetail";
import SearchInput from "./components/SearchInput";
import { useNotes } from "./hooks/useNotes";

export default function Home() {
  const {
    notes,
    allNotes,
    selectedId,
    setSelectedId,
    createNote,
    updateNote,
    deleteNote,
    searchQuery,
    setSearchQuery,
  } = useNotes();

  const selectedNote = allNotes.find((n) => n.id === selectedId);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      <header className="w-full flex gap-4 items-center justify-between px-4 py-5 border-b border-gray-200 dark:border-gray-800 bg-[var(--background)] z-10">
        <h1 className="text-lg font-semibold text-primary tracking-wide">Notes</h1>
        <div className="max-w-xs w-full hidden md:block">
          <SearchInput value={searchQuery} onChange={setSearchQuery} />
        </div>
        <a href="#" className="text-secondary text-sm hover:text-primary">by NoteApp</a>
      </header>
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex w-[340px] min-w-[250px] max-w-sm border-r border-gray-200 dark:border-gray-800 flex-col">
          <div className="p-3">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
          </div>
          <NoteList
            notes={notes}
            selectedId={selectedId}
            searchQuery={searchQuery}
            onSelect={setSelectedId}
            onAdd={createNote}
            onDelete={deleteNote}
          />
        </div>
        {/* Mobile sticky sidebar */}
        <div className="flex md:hidden flex-col w-full max-w-full bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-2 items-center p-2">
            <SearchInput value={searchQuery} onChange={setSearchQuery} />
            <button
              className="bg-primary text-white hover:bg-blue-700 rounded-full px-4 py-2 ml-2 transition text-sm"
              title="New note"
              onClick={createNote}
            >
              +
            </button>
          </div>
          <div className="h-44 overflow-y-auto">
            <NoteList
              notes={notes}
              selectedId={selectedId}
              searchQuery={searchQuery}
              onSelect={setSelectedId}
              onAdd={createNote}
              onDelete={deleteNote}
            />
          </div>
        </div>
        {/* Main (note detail/editor) */}
        <main className="flex-1 h-full min-w-0">
          <NoteDetail
            note={selectedNote}
            onEdit={(title, content) => {
              if (selectedNote)
                updateNote(selectedNote.id, { title, content });
            }}
            onSave={() => {}}
            onDelete={() => {
              if (selectedNote) {
                deleteNote(selectedNote.id);
                setIsEditing(false);
              }
            }}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </main>
      </div>
      <footer className="text-center py-4 px-2 text-xs text-secondary bg-gray-50 dark:bg-black border-t border-gray-200 dark:border-gray-800">
        &copy; {new Date().getFullYear()} NoteApp. All rights reserved.
      </footer>
      <style jsx global>{`
        :root {
          --primary: #3B82F6;
          --secondary: #6B7280;
          --accent: #F59E42;
        }
        .text-primary { color: var(--primary); }
        .bg-primary { background: var(--primary); }
        .text-secondary { color: var(--secondary); }
        .bg-accent { background: var(--accent); }
      `}</style>
    </div>
  );
}
