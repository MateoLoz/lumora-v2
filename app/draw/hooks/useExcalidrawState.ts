"use client"

import { useEffect, useState, useCallback } from 'react';
import { Element, ElementType, Tool } from '../types';
import { generateId } from '../utils';

/**
 * Custom hook to manage Excalidraw application state
 */
export function useExcalidrawState() {
  const [elements, setElements] = useState<Element[]>(() => {
  if (typeof window === "undefined") return [];
  const stored = window.localStorage.getItem("elements");
  return stored ? JSON.parse(stored) : [];
});
  const [selectedTool, setSelectedTool] = useState<Tool>(Tool.SELECTION);
  const [selectedElementIds, setSelectedElementIds] = useState<string[]>([]);

  /**
   * Add a new element to the canvas
   * TO-DO, Open side bar after a new element is created.
   */
  const addElement = useCallback((element: Element) => {
    setElements((prev) => [...prev, element]);
  }, []);

  /**
   * Update an existing element
   * TO-DO Close side-bar after the element is updated.
   */
  const updateElement = useCallback((id: string, updates: Partial<Element>) => {
    setElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, ...updates } : el))
    );
  }, []);

  /**
   * Delete elements by IDs
   * TO-DO: Close side-bar after the element is deleted.
   */
  const deleteElements = useCallback((ids: string[]) => {
    setElements((prev) => prev.filter((el) => !ids.includes(el.id)));
    setSelectedElementIds([]);
  }, []);

  
  useEffect(() => {
  window.localStorage.setItem('elements', JSON.stringify(elements));
}, [elements]);


  /**
   * Delete currently selected elements
   */
  const deleteSelectedElements = useCallback(() => {
    deleteElements(selectedElementIds);
  }, [selectedElementIds, deleteElements]);

  /**
   * Select elements by IDs
   */
  const selectElements = useCallback((ids: string[]) => {
    setSelectedElementIds(ids);
  }, []);

  /**
   * Clear selection
   */
  const clearSelection = useCallback(() => {
    setSelectedElementIds([]);
  }, []);

  /**
   * Create a new element based on the selected tool
   */
  const createElementFromTool = useCallback(
    (tool: Tool, x: number, y: number): Element | null => {
      const baseElement = {
        id: generateId(),
        x,
        y,
        width: 0,
        height: 0,
        color: '#1e1e1e',
        strokeWidth: 2,
      };

      switch (tool) {
        case Tool.RECTANGLE:
          return { ...baseElement, type: ElementType.RECTANGLE };
        case Tool.CIRCLE:
          return { ...baseElement, type: ElementType.CIRCLE };
        case Tool.LINE:
          return { ...baseElement, type: ElementType.LINE, x2: x, y2: y };
        case Tool.ARROW:
          return { ...baseElement, type: ElementType.ARROW, x2: x, y2: y };
        case Tool.TEXT:
          return {
            ...baseElement,
            type: ElementType.TEXT,
            text: 'Text',
            fontSize: 18,
            width: 50,
            height: 20,
          };
        default:
          return null;
      }
    },
    []
  );

  return {
    // State
    elements,
    selectedTool,
    selectedElementIds,
    // Actions
    setSelectedTool,
    addElement,
    updateElement,
    deleteElements,
    deleteSelectedElements,
    selectElements,
    clearSelection,
    createElementFromTool,
  };
}
