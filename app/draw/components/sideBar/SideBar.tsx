import { useSideBar } from "../../hooks/useSideBar"

export const SideBar = () => {  
    const ctx = useSideBar();

    return (
        <div style={{ 
            display: ctx.isOpen ? "block" : "none",
            opacity: ctx.isOpen ? 1 : 0 }} 
        className="absolute z-10 left-4 top-20 p-4 rounded-md shadow-md"
        onClick={ctx.toggleSideBar}
        >
            <h1>SideBar</h1>
        </div>
    )
}