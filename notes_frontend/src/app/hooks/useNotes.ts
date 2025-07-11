"use client";

import { useEffect, useState } from "react";
import { Note } from "../components/NoteList";

// Helper to simulate localStorage persistence with backward compatibility/load
const NOTES_KEY = "notes";

// PUBLIC_INTERFACE
export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // On initial load
  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem(NOTES_KEY) : null;
    if (stored) {
      try {
        const parsed: Note[] = JSON.parse(stored);
        setNotes(parsed);
        if (parsed.length) setSelectedId(parsed[0].id);
      } catch {
        setNotes([]);
      }
    }
  }, []);

  // Persist notes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
    }
  }, [notes]);

  function createNote() {
    const note = {
      id: Date.now().toString(36) + "-" + Math.random().toString(36).slice(2,8),
      title: "",
      content: "",
      lastEdited: Date.now(),
    };
    setNotes((prev) => [note, ...prev]);
    setSelectedId(note.id);
  }

  function updateNote(id: string, fields: Partial<Note>) {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...fields, lastEdited: Date.now() }
          : note
      )
    );
  }

  function deleteNote(id: string) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    if (selectedId === id) {
      // Select first remaining note or undefined
      const other = notes.find((n) => n.id !== id);
      setSelectedId(other?.id ?? undefined);
    }
  }

  const filteredNotes = searchQuery
    ? notes.filter(
        (note) =>
          note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : notes;

  return {
    notes: filteredNotes,
    allNotes: notes,
    selectedId,
    setSelectedId,
    createNote,
    updateNote,
    deleteNote,
    searchQuery,
    setSearchQuery,
  };
}
