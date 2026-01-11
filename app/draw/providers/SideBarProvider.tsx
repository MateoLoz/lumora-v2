import { useState } from "react";
import { SideBarContext } from "../context/SideBarContext";

export default function SideBarProvider({ children }: { children: React.ReactNode }) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const openSideBar = () => {
        setIsSideBarOpen(true);
    };
    const closeSideBar = () => {
        setIsSideBarOpen(false);
    }
    return (
        <SideBarContext.Provider value={{ isSideBarOpen, openSideBar, closeSideBar  }}>
            {children}
        </SideBarContext.Provider>
    );
}