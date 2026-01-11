import { useContext } from "react";
import { SideBarContext } from "../context/SideBarContext";

export function useSideBar() {
    const context = useContext(SideBarContext);
    if (!context) {
        throw new Error("useSideBar must be used within a SideBarProvider");
    }
    return {
        isOpen: context.isSideBarOpen,
        OpenSideBar: context.openSideBar,
        CloseSideBar: context.closeSideBar
    };
}