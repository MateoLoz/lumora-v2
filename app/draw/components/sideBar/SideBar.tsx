"use client"

import './sidebar.css';
import { useSideBar } from "../../hooks/useSideBar"
import StrokeRow from "./Stroke/StrokeRow";

export const SideBar = () => {
    const { isOpen } = useSideBar();

    return (
        <div style={{
            display: isOpen ? "block" : "none",
            opacity: isOpen ? 1 : 0
        }}
            className="sidebar"
        >
            <StrokeRow dataTooltip="#2221" tooltip="#2221" />
        </div>
    )
}