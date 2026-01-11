'use client';

import React from 'react';

interface ZoomControlsProps {
  zoom: number;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onResetZoom: () => void;
}

export default function ZoomControls({
  zoom,
  onZoomIn,
  onZoomOut,
  onResetZoom,
}: ZoomControlsProps) {
  const zoomPercentage = Math.round(zoom * 100);

  return (
    <div className="zoom-controls">
      {/* Zoom Out */}
      <button
        className="zoom-button"
        onClick={onZoomOut}
        aria-label="Zoom out"
        disabled={zoom <= 0.1}
      >
        −
      </button>

      {/* Zoom Display */}
      <button
        className="zoom-display"
        onClick={onResetZoom}
        aria-label="Reset zoom"
        title="Click to reset zoom to 100%"
      >
        {zoomPercentage}%
      </button>

      {/* Zoom In */}
      <button
        className="zoom-button"
        onClick={onZoomIn}
        aria-label="Zoom in"
        disabled={zoom >= 3}
      >
        +
      </button>
    </div>
  );
}
