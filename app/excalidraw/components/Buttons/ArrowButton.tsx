import { Tool } from "../../types";

export const ArrowButton = ({
    selectedTool,
    onToolChange,
    tool,
    dataTooltip,
    tooltip,
}: {
    selectedTool: Tool;
    onToolChange: (tool: Tool) => void;
    tool: Tool;
    dataTooltip: string;
    tooltip: string;
}) => {
    return (
        <button
            className={`tool-button ${selectedTool === tool ? 'active' : ''}`}
            onClick={() => onToolChange(tool)}
            data-tooltip={dataTooltip}
            aria-label={tooltip}    
            >
            <svg className="tool-icon" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="18" y2="12" />
            <polyline points="11 7 19 12 11 19" />
            </svg>
            <small className='absolute top-6 left-7 text-[11px]'>{tooltip}</small>  
            </button>
    )
}   