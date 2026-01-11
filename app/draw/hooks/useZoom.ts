import { useState, useCallback } from 'react';

/**
 * Custom hook to manage zoom and pan functionality
 */
export function useZoom() {
  const [zoom, setZoom] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });

  /**
   * Zoom in by 10%
   */
  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.1, 3));
  }, []);

  /**
   * Zoom out by 10%
   */
  const zoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.1, 0.1));
  }, []);

  /**
   * Reset zoom to 100%
   */
  const resetZoom = useCallback(() => {
    setZoom(1);
  }, []);

  /**
   * Set zoom to a specific value
   */
  const setZoomLevel = useCallback((level: number) => {
    setZoom(Math.max(0.1, Math.min(3, level)));
  }, []);

  /**
   * Update pan offset
   */
  const updatePanOffset = useCallback((x: number, y: number) => {
    setPanOffset({ x, y });
  }, []);

  /**
   * Handle wheel event for zooming with Ctrl+Scroll
   */
  const handleWheel = useCallback((e: React.WheelEvent<HTMLCanvasElement>) => {
    // Only zoom when Ctrl key is pressed
    if (e.ctrlKey) {
      e.preventDefault();
      
      const delta = -e.deltaY;
      const zoomFactor = delta > 0 ? 1.1 : 0.9;
      const newZoom = Math.max(0.1, Math.min(3, zoom * zoomFactor));
      
      // Get mouse position relative to canvas
      const canvas = e.currentTarget;
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Calculate new pan offset to zoom towards mouse position
      const newPanX = mouseX - (mouseX - panOffset.x) * (newZoom / zoom);
      const newPanY = mouseY - (mouseY - panOffset.y) * (newZoom / zoom);
      
      setZoom(newZoom);
      setPanOffset({ x: newPanX, y: newPanY });
    }
  }, [zoom, panOffset]);

  return {
    zoom,
    panOffset,
    zoomIn,
    zoomOut,
    resetZoom,
    setZoomLevel,
    updatePanOffset,
    handleWheel,
  };
}
