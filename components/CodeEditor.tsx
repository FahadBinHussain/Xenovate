"use client";

import React, { useState, useEffect } from 'react'
import { Textarea } from './ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Button } from './ui/button'
import { ArrowDown, Copy, Play } from 'lucide-react'

interface CodeEditorProps {
  value: string
  onChange: (code: string) => void
  language: string
  setLanguage?: (language: string) => void
  onSubmit?: () => void
  isProcessing?: boolean
  placeholder?: string
  hideLanguageDisplay?: boolean
}

const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  language,
  setLanguage,
  onSubmit,
  isProcessing = false,
  placeholder = "// Enter your code here...",
  hideLanguageDisplay = false
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const languages = [
    { value: 'python', label: 'Python' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'java', label: 'Java' },
    { value: 'c', label: 'C' },
    { value: 'cpp', label: 'C++' }
  ]

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {setLanguage ? (
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            !hideLanguageDisplay && <div className="text-sm font-medium">{language}</div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={copyToClipboard}
            title="Copy code"
          >
            <Copy className="h-4 w-4 mr-1" />
            {copied ? 'Copied!' : 'Copy'}
          </Button>
          {onSubmit && (
            <Button 
              onClick={onSubmit} 
              disabled={isProcessing || !value.trim()}
              size="sm"
              title="Process code"
            >
              {isProcessing ? (
                <>Processing</>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-1" />
                  Run
                </>
              )}
            </Button>
          )}
        </div>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="font-mono resize-none flex-grow min-h-[400px] p-4"
        placeholder={placeholder}
      />

      {onSubmit && (
        <div className="flex justify-center mt-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onSubmit}
            disabled={isProcessing || !value.trim()}
            className="w-full"
          >
            <ArrowDown className="h-4 w-4 mr-1" />
            Process Code
          </Button>
        </div>
      )}
    </div>
  )
}

export default CodeEditor 