'use client';

import React, { useRef, useEffect } from 'react';
import { Element, ElementType, Point } from '../types';
import { getElementBounds, drawArrowHead } from '../utils';

interface CanvasProps {
  elements: Element[];
  selectedElementIds: string[];
  currentElement: Element | null;
  zoom: number;
  panOffset: Point;
  onMouseDown: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseMove: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  onMouseUp: (e: React.MouseEvent<HTMLCanvasElement>) => void;
  isSelectionTool: boolean;
  isSideBarOpen: boolean;
  toggleSideBar: () => void;
}

export default function Canvas({
  elements,
  selectedElementIds,
  currentElement,
  zoom,
  panOffset,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  isSelectionTool,
  isSideBarOpen,
  toggleSideBar,
}: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Setup canvas with proper DPI
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    ctx.scale(dpr, dpr);

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;
  }, []);

  // Render all elements
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);

    // Apply transformations
    ctx.save();
    ctx.translate(panOffset.x, panOffset.y);
    ctx.scale(zoom, zoom);

    // Draw all elements
    [...elements, currentElement].forEach((element) => {
      if (!element) return;
      drawElement(ctx, element);
    });

    // Draw selection highlights
    selectedElementIds.forEach((id) => {
      const element = elements.find((el) => el.id === id);
      if (element) {
        drawSelectionBox(ctx, element);
      }
    });

    ctx.restore();
  }, [elements, selectedElementIds, currentElement, zoom, panOffset]);

  return (
    <canvas
      ref={canvasRef}
      className={`excalidraw-canvas ${isSelectionTool ? 'selection-tool' : ''}`}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onClick={()=> !isSideBarOpen ? toggleSideBar() : null}
    />
  );
}

/**
 * Draw a single element on the canvas
 */
function drawElement(ctx: CanvasRenderingContext2D, element: Element) {
  ctx.strokeStyle = element.color;
  ctx.lineWidth = element.strokeWidth;
  ctx.fillStyle = element.color;

  switch (element.type) {
    case ElementType.RECTANGLE:
      ctx.strokeRect(element.x, element.y, element.width, element.height);
      break;

    case ElementType.CIRCLE:
      ctx.beginPath();
      ctx.ellipse(
        element.x + element.width / 2,
        element.y + element.height / 2,
        Math.abs(element.width / 2),
        Math.abs(element.height / 2),
        0,
        0,
        2 * Math.PI
      );
      ctx.stroke();
      break;

    case ElementType.LINE:
      ctx.beginPath();
      ctx.moveTo(element.x, element.y);
      ctx.lineTo(element.x2 || element.x, element.y2 || element.y);
      ctx.stroke();
      break;

    case ElementType.ARROW:
      ctx.beginPath();
      ctx.moveTo(element.x, element.y);
      const endX = element.x2 || element.x;
      const endY = element.y2 || element.y;
      ctx.lineTo(endX, endY);
      ctx.stroke();
      drawArrowHead(ctx, element.x, element.y, endX, endY);
      break;

    case ElementType.TEXT:
      ctx.font = `${element.fontSize || 16}px sans-serif`;
      ctx.fillText(element.text || '', element.x, element.y);
      break;
  }
}

/**
 * Draw selection box around an element
 */
function drawSelectionBox(ctx: CanvasRenderingContext2D, element: Element) {
  const bounds = getElementBounds(element);
  const padding = 8;

  ctx.strokeStyle = '#7d6dd6ff';
  ctx.lineWidth = 2;
  ctx.setLineDash([5, 5]);

  ctx.strokeRect(
    bounds.minX - padding,
    bounds.minY - padding,
    bounds.width + padding * 2,
    bounds.height + padding * 2
  );

  ctx.setLineDash([]);

  // Draw resize handles
  const handleSize = 8;
  const handles = [
    { x: bounds.minX - padding, y: bounds.minY - padding }, // top-left
    { x: bounds.maxX + padding, y: bounds.minY - padding }, // top-right
    { x: bounds.minX - padding, y: bounds.maxY + padding }, // bottom-left
    { x: bounds.maxX + padding, y: bounds.maxY + padding }, // bottom-right
  ];

  ctx.fillStyle = '#7567c4ff';
  handles.forEach((handle) => {
    ctx.fillRect(
      handle.x - handleSize / 2,
      handle.y - handleSize / 2,
      handleSize,
      handleSize
    );
  });
}
