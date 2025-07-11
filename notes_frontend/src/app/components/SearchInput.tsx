"use client";

// PUBLIC_INTERFACE
interface SearchInputProps {
  value: string;
  onChange: (text: string) => void;
}

// PUBLIC_INTERFACE
export default function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="text"
      className="w-full px-3 py-2 rounded border text-sm focus:outline-none focus:border-primary bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 caret-primary"
      placeholder="Search notes…"
      value={value}
      aria-label="Search notes"
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
}
