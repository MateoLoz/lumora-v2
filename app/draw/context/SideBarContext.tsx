
import { createContext } from "react";

interface SideBarContextType {
    isSideBarOpen: boolean;
    openSideBar: () => void;
    closeSideBar: () => void;
}

export const SideBarContext = createContext<SideBarContextType | null>(null);