'use client';

import React from 'react';
import { Tool } from '../types';
import { ToolbarButton } from './ToolbarButton';

interface ToolbarProps {
  selectedTool: Tool;
  onToolChange: (tool: Tool) => void;
  onDelete: () => void;
  hasSelection: boolean;
}

export default function Toolbar({
  selectedTool,
  onToolChange,
  onDelete,
  hasSelection,
}: ToolbarProps) {
  return (
    <div className="excalidraw-toolbar">
      <button
        className={`tool-button ${selectedTool === Tool.SELECTION ? 'active' : ''}`}
        onClick={() => onToolChange(Tool.SELECTION)}
        data-tooltip="Selection (Q)"
        aria-label="Selection tool"
      >
        <svg className="tool-icon" viewBox="0 0 24 24">
          <path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" />
        </svg>
      </button>
      <div className="excalidraw-toolbar-divider" />
      {/* List of Tools */}
      <ToolbarButton selectedTool={selectedTool} onToolChange={onToolChange}/>
      <div className="excalidraw-toolbar-divider" />

      {/* Delete Button */}
       {/* TO-DO move to action ponel for every element */}
      <button
        className="tool-button delete"
        onClick={onDelete}
        disabled={!hasSelection}
        data-tooltip="Delete (Del)"
        aria-label="Delete selected elements"
      >
        <svg className="tool-icon" viewBox="0 0 24 24">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
        <small className='absolute top-6 left-7 text-xs'>6</small>  
      </button>
    </div>
  );
}
