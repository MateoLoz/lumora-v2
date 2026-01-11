// Utility functions for Excalidraw clone

import { Element, ElementType, Point, Bounds } from './types';

let idCounter = 0;

/**
 * Generate a unique ID for elements
 */
export function generateId(): string {
  return `element-${Date.now()}-${idCounter++}`;
}

/**
 * Get the bounding box for any element type
 */
export function getElementBounds(element: Element): Bounds {
  if (element.type === ElementType.LINE || element.type === ElementType.ARROW) {
    const minX = Math.min(element.x, element.x2 || element.x);
    const maxX = Math.max(element.x, element.x2 || element.x);
    const minY = Math.min(element.y, element.y2 || element.y);
    const maxY = Math.max(element.y, element.y2 || element.y);
    
    return {
      minX,
      minY,
      maxX,
      maxY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }
  
  return {
    minX: element.x,
    minY: element.y,
    maxX: element.x + element.width,
    maxY: element.y + element.height,
    width: element.width,
    height: element.height,
  };
}

/**
 * Check if a point is inside an element
 */
export function isPointInElement(point: Point, element: Element): boolean {
  const bounds = getElementBounds(element);
  const padding = 5; // Add some padding for easier selection
  
  if (element.type === ElementType.LINE || element.type === ElementType.ARROW) {
    // For lines, check if point is near the line
    return isPointNearLine(
      point,
      { x: element.x, y: element.y },
      { x: element.x2 || element.x, y: element.y2 || element.y },
      padding + element.strokeWidth
    );
  }
  
  if (element.type === ElementType.CIRCLE) {
    // For circles, check if point is inside the ellipse
    const centerX = element.x + element.width / 2;
    const centerY = element.y + element.height / 2;
    const radiusX = element.width / 2;
    const radiusY = element.height / 2;
    
    const normalizedX = (point.x - centerX) / radiusX;
    const normalizedY = (point.y - centerY) / radiusY;
    
    return normalizedX * normalizedX + normalizedY * normalizedY <= 1;
  }
  
  // For rectangles and text
  return (
    point.x >= bounds.minX - padding &&
    point.x <= bounds.maxX + padding &&
    point.y >= bounds.minY - padding &&
    point.y <= bounds.maxY + padding
  );
}

/**
 * Check if a point is near a line segment
 */
function isPointNearLine(
  point: Point,
  lineStart: Point,
  lineEnd: Point,
  threshold: number
): boolean {
  const dx = lineEnd.x - lineStart.x;
  const dy = lineEnd.y - lineStart.y;
  const length = Math.sqrt(dx * dx + dy * dy);
  
  if (length === 0) {
    const distance = Math.sqrt(
      (point.x - lineStart.x) ** 2 + (point.y - lineStart.y) ** 2
    );
    return distance <= threshold;
  }
  
  const t = Math.max(
    0,
    Math.min(
      1,
      ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) / (length * length)
    )
  );
  
  const projectionX = lineStart.x + t * dx;
  const projectionY = lineStart.y + t * dy;
  
  const distance = Math.sqrt(
    (point.x - projectionX) ** 2 + (point.y - projectionY) ** 2
  );
  
  return distance <= threshold;
}

/**
 * Hit test to find which element was clicked
 */
export function hitTest(point: Point, elements: Element[]): Element | null {
  // Check elements in reverse order (top to bottom)
  for (let i = elements.length - 1; i >= 0; i--) {
    if (isPointInElement(point, elements[i])) {
      return elements[i];
    }
  }
  return null;
}

/**
 * Draw an arrow head at the end of a line
 */
export function drawArrowHead(
  ctx: CanvasRenderingContext2D,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  headLength: number = 15
): void {
  const angle = Math.atan2(toY - fromY, toX - fromX);
  
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle - Math.PI / 6),
    toY - headLength * Math.sin(angle - Math.PI / 6)
  );
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headLength * Math.cos(angle + Math.PI / 6),
    toY - headLength * Math.sin(angle + Math.PI / 6)
  );
  ctx.stroke();
}
