import { useSideBar } from "../../hooks/useSideBar"
import StrokeRow from "./Rows/StrokeRow";

export const SideBar = () => {  
    const ctx = useSideBar();

    return (
        <div style={{ 
            display: ctx.isOpen ? "block" : "none",
            opacity: ctx.isOpen ? 1 : 0 }} 
        className="absolute z-20 left-4 top-20 p-4 rounded-md shadow-md"
        >
            <StrokeRow dataTooltip="#2221" tooltip="#2221"/>
        </div>
    )
}