
import { createContext } from "react";

interface SideBarContextType {
    isSideBarOpen: boolean;
    toggleSideBar: () => void;
}

export const SideBarContext = createContext<SideBarContextType | null>(null);