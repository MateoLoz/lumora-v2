import { Tool } from '../../types';

export const TextButton = ({
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
    return(
         <button
                className={`tool-button ${selectedTool === tool ? 'active' : ''}`}
                onClick={() => onToolChange(tool)}
                data-tooltip={dataTooltip}
                aria-label={tooltip}
              >
                <svg className="tool-icon" viewBox="0 0 24 24">
                  <polyline points="4 8 5 5 20 5 20 8" />
                  <line x1="9" y1="20" x2="15" y2="20" />
                  <line x1="12" y1="8" x2="12" y2="20" /> 
                </svg>  
                <small className='absolute top-6 left-7 text-[11px]'>{tooltip}</small>  
              </button>
    )
}