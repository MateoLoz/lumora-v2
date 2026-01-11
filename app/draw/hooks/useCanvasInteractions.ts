import { useState, useCallback } from 'react';
import { Element, ElementType, Tool, Point } from '../types';
import { hitTest } from '../utils';


interface UseCanvasInteractionsProps {
  selectedTool: Tool;
  elements: Element[];
  selectedElementIds: string[];
  zoom: number;
  panOffset: Point;
  createElementFromTool: (tool: Tool, x: number, y: number) => Element | null;
  addElement: (element: Element) => void;
  updateElement: (id: string, updates: Partial<Element>) => void;
  selectElements: (ids: string[]) => void;
  clearSelection: () => void;
  setSelectedTool: (tool: Tool) => void;
}

/**
 * Custom hook to handle canvas mouse interactions
 */
export function useCanvasInteractions({
  selectedTool,
  elements,
  selectedElementIds,
  zoom,
  panOffset,
  createElementFromTool,
  addElement,
  updateElement,
  selectElements,
  clearSelection,
  setSelectedTool,
}: UseCanvasInteractionsProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPoint, setDragStartPoint] = useState<Point | null>(null);
  const [currentElement, setCurrentElement] = useState<Element | null>(null);
  const [draggedElement, setDraggedElement] = useState<Element | null>(null);
  const [dragOffset, setDragOffset] = useState<Point>({ x: 0, y: 0 });



  /**
   * Update sidebar state
   */
  /**
   * Convert mouse event coordinates to canvas coordinates
   */
  const getCanvasCoordinates = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>): Point => {
      const canvas = e.currentTarget;
      const rect = canvas.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left - panOffset.x) / zoom,
        y: (e.clientY - rect.top - panOffset.y) / zoom,
      };
    },
    [zoom, panOffset]
  );

  /**
   * Update element being drawn based on drag
   */
  const updateCurrentElement = useCallback(
    (element: Element, start: Point, end: Point) => {
      if (element.type === ElementType.LINE || element.type === ElementType.ARROW) {
        setCurrentElement({
          ...element,
          x2:end.x,
          y2:end.y
        });
      } else {
        const width = end.x - start.x;
        const height = end.y - start.y;
        setCurrentElement({
          ...element,
          width,
          height,
        });
      }
    },
    []
  );

  /**
   * Handle mouse down event
   */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      const point = getCanvasCoordinates(e);
      setDragStartPoint(point);
      setIsDragging(true);

      if (selectedTool === Tool.SELECTION) {
        const clickedElement = hitTest(point, elements);

        if (clickedElement && selectedElementIds.includes(clickedElement.id)) {
          // Start dragging the element
          setDraggedElement(clickedElement);
          setDragOffset({
            x: point.x - clickedElement.x,
            y: point.y - clickedElement.y,
          });
        } else if (clickedElement) {
          // Select the clicked element
          selectElements([clickedElement.id]);
        } else {
          // Clear selection
          clearSelection();
        }
      } else {
        // Start creating a new element
        const newElement = createElementFromTool(selectedTool, point.x, point.y);
        if (newElement) {
          setCurrentElement(newElement);
          clearSelection();
        }
      }
    },
    [
      selectedTool,
      elements,
      selectedElementIds,
      getCanvasCoordinates,
      createElementFromTool,
      selectElements,
      clearSelection,
    ]
  );

  /**
   * Handle mouse move event
   */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLCanvasElement>) => {
      if (!isDragging || !dragStartPoint) return;

      const point = getCanvasCoordinates(e);

      if (draggedElement) {
        // Move the dragged element
        const newX = point.x - dragOffset.x;
        const newY = point.y - dragOffset.y;
        updateElement(draggedElement.id, { x: newX, y: newY });
      } else if (currentElement) {
        // Update the element being drawn
        updateCurrentElement(currentElement, dragStartPoint, point);
      }
    },
    [
      isDragging,
      dragStartPoint,
      currentElement,
      draggedElement,
      dragOffset,
      getCanvasCoordinates,
      updateElement,
      updateCurrentElement,
    ]
  );

  /**
   * Handle mouse up event
   */
  const handleMouseUp = useCallback(() => {
    if (currentElement) {
      // Finalize the element
      addElement(currentElement);
      setCurrentElement(null);
      // Switch back to selection tool after creating an element
      setSelectedTool(Tool.SELECTION);
    }

    setIsDragging(false);
    setDragStartPoint(null);
    setDraggedElement(null);
  }, [currentElement, addElement, setSelectedTool]);

  return {
    currentElement,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
  };
}
