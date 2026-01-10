import { useEffect } from 'react';
import { Tool } from '../types';

interface UseKeyboardShortcutsProps {
  selectedElementIds: string[];
  setSelectedTool: (tool: Tool) => void;
  deleteSelectedElements: () => void;
  clearSelection: () => void;
}

/**
 * Custom hook to handle keyboard shortcuts
 */
export function useKeyboardShortcuts({
  selectedElementIds,
  setSelectedTool,
  deleteSelectedElements,
  clearSelection,
}: UseKeyboardShortcutsProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log(e.key, e.ctrlKey);
      // Delete key
      if (e.ctrlKey && e.key.toLocaleUpperCase() === 'X') {
        if (selectedElementIds.length > 0) {
          e.preventDefault();
          deleteSelectedElements();
        }
      }

      // Tool shortcuts
      if ( e.ctrlKey && e.key.toLocaleUpperCase() === 'Q') {
        setSelectedTool(Tool.SELECTION);
      } else if (e.ctrlKey && e.key === '1') {
        setSelectedTool(Tool.RECTANGLE);
      } else if (e.ctrlKey && e.key === '2' ) {
        setSelectedTool(Tool.CIRCLE);
      } else if (e.ctrlKey && e.key === '3') {
        setSelectedTool(Tool.LINE);
      } else if (e.ctrlKey && e.key === '4') {
        setSelectedTool(Tool.ARROW);
      } else if (e.ctrlKey && e.key === '5') {
        setSelectedTool(Tool.TEXT);
      }

      // Escape to clear selection
      if (e.key === 'Escape') {
        clearSelection();
        setSelectedTool(Tool.SELECTION);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedElementIds, setSelectedTool, deleteSelectedElements, clearSelection]);
}
