// Type definitions for Excalidraw clone

export enum ElementType {
  RECTANGLE = "rectangle",
  DIAMOND = "diamond",
  TRIANGLE = "triangle",
  CIRCLE = "circle",
  LINE = "line",
  ARROW = "arrow",
  TEXT = "text",
}

export enum Tool {
  SELECTION = "selection",
  RECTANGLE = "rectangle",
  DIAMOND = "diamond",
  TRIANGLE = "triangle",
  CIRCLE = "circle",
  LINE = "line",
  ARROW = "arrow",
  TEXT = "text",
}

export interface Point {
  x: number;
  y: number;
}

export interface Element {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  strokeWidth: number;
  // For line and arrow
  x2?: number;
  y2?: number;
  // For text
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  onClick?: () => void;
}

export interface AppState {
  elements: Element[];
  selectedTool: Tool;
  selectedElementIds: string[];
  zoom: number;
  panOffset: Point;
  isDragging: boolean;
  dragStartPoint: Point | null;
  currentElement: Element | null;
}

export interface Bounds {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
}
