'use client';

import React from 'react';
import  SideBarProvider  from './providers/SideBarProvider';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';
import ZoomControls from './components/ZoomControls';
import { useExcalidrawState } from './hooks/useExcalidrawState';
import { useZoom } from './hooks/useZoom';
import { useCanvasInteractions } from './hooks/useCanvasInteractions';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { Tool } from './types';
import './excalidraw.css';
import { SideBar } from './components/sideBar/SideBar';

export default function ExcalidrawPage() {
  // State management
  const {
    elements,
    selectedTool,
    selectedElementIds,
    setSelectedTool,
    addElement,
    updateElement,
    deleteSelectedElements,
    selectElements,
    clearSelection,
    createElementFromTool,
  } = useExcalidrawState();

  // Zoom and pan
  const { zoom, panOffset, zoomIn, zoomOut, resetZoom } = useZoom();

  // Canvas interactions
  const { currentElement, handleMouseDown, handleMouseMove, handleMouseUp, toggleSideBar, isSideBarOpen } =
    useCanvasInteractions({
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
      setSelectedTool
    });

  // Keyboard shortcuts
  useKeyboardShortcuts({
    selectedElementIds,
    setSelectedTool,
    deleteSelectedElements,
    clearSelection,
  });

  return (
    <SideBarProvider>
    <div className="excalidraw-container">
      <Toolbar
        selectedTool={selectedTool}
        onToolChange={setSelectedTool}
        onDelete={deleteSelectedElements}
        hasSelection={selectedElementIds.length > 0}
      />
       <SideBar/>
      <Canvas
        elements={elements}
        toggleSideBar={toggleSideBar}
        isSideBarOpen={isSideBarOpen}
        selectedElementIds={selectedElementIds}
        currentElement={currentElement}
        zoom={zoom}
        panOffset={panOffset}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        isSelectionTool={selectedTool === Tool.SELECTION}
      />

      <ZoomControls
        zoom={zoom}
        onZoomIn={zoomIn}
        onZoomOut={zoomOut}
        onResetZoom={resetZoom}
      />
    </div>
    </SideBarProvider>
  );
}
