import { Tool } from '../../types';

export const RectangleButton = ({
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
              onClick={() => {onToolChange(tool)}}
              data-tooltip={dataTooltip}
              aria-label={tooltip}
            >
              <svg className="tool-icon" viewBox="0 0 24 24">
                <rect x="2" y="2" width="15" height="15" rx="2" />
              </svg>
              <small className='absolute top-6 left-7 text-[11px]'>{tooltip}</small>
            </button>
    )
}