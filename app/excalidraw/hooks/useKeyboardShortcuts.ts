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
      // Delete key
      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (selectedElementIds.length > 0) {
          e.preventDefault();
          deleteSelectedElements();
        }
      }

      // Tool shortcuts
      if (e.key === 'v' || e.key === 'V') {
        setSelectedTool(Tool.SELECTION);
      } else if (e.key === '2' || e.key === '2') {
        setSelectedTool(Tool.RECTANGLE);
      } else if (e.key === '3' || e.key === '3') {
        setSelectedTool(Tool.CIRCLE);
      } else if (e.key === '4' || e.key === '4') {
        setSelectedTool(Tool.LINE);
      } else if (e.key === '5' || e.key === '5') {
        setSelectedTool(Tool.ARROW);
      } else if (e.key === '6' || e.key === '6') {
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
