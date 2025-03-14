"use client";

import React from "react";

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  language?: string;
  placeholder?: string;
  readOnly?: boolean;
}

/**
 * A simple code editor component
 * 
 * This is a basic implementation using a textarea with styling.
 * In a production app, you might want to use a more sophisticated editor
 * like Monaco Editor, CodeMirror, or Prism for syntax highlighting and
 * code editing features.
 */
export function CodeEditor({
  value,
  onChange,
  language = "javascript",
  placeholder = "Enter your code here...",
  readOnly = false
}: CodeEditorProps) {
  return (
    <div className="code-editor-wrapper border rounded h-full">
      <div className="code-editor-header bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs font-mono flex justify-between items-center border-b">
        <span>{language}</span>
        {!readOnly && <span className="text-gray-500">Press Tab to indent</span>}
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full h-[calc(100%-36px)] p-4 font-mono text-sm focus:outline-none resize-none bg-transparent"
        readOnly={readOnly}
        onKeyDown={(e) => {
          // Handle tab key to insert spaces instead of changing focus
          if (e.key === "Tab" && !readOnly) {
            e.preventDefault();
            const textarea = e.target as HTMLTextAreaElement;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            
            // Insert 2 spaces at cursor position
            const newValue = value.substring(0, start) + "  " + value.substring(end);
            onChange(newValue);
            
            // Move cursor after the inserted spaces
            setTimeout(() => {
              textarea.selectionStart = textarea.selectionEnd = start + 2;
            }, 0);
          }
        }}
      />
    </div>
  );
} 