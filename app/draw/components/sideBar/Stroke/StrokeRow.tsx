"use client";

import '../sidebar.css';
import type { StrokeItem } from '../sidebar.types';
const StrokeRow = ({
    color,
    dataTooltip,
    tooltip
}: StrokeItem) => {
    return (
        <button
            className={`stroke-row bg-${color}`}
            data-tooltip={dataTooltip}
            aria-label={tooltip}
        >
        </button>
    )
}

export default StrokeRow;