const StrokeRow = ({
    dataTooltip,
    tooltip
}: {
    dataTooltip : string,
    tooltip : string
}) => {

    return(
        <button
        className= {`z-50 rounded-md w-6 h-6 flex items-center justify-center cursor-pointer bg-gray-600 hover:scale-[1.04] after:opacity-0 after:absolute after:p-1 after:bg-black after:rounded-md after:text-xs after:content-[attr(data-tooltip)] after:top-6 transition `}
        data-tooltip={dataTooltip}
        aria-label={tooltip}

        >
        </button>
    )
}

export default StrokeRow;