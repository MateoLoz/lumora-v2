import { useState } from "react";
import { SideBarContext } from "../context/SideBarContext";

export default function SideBarProvider({ children }: { children: React.ReactNode }) {
    const [isSideBarOpen, setIsSideBarOpen] = useState(false);

    const toggleSideBar = () => {
        setIsSideBarOpen(!isSideBarOpen);
    };

    return (
        <SideBarContext.Provider value={{ isSideBarOpen, toggleSideBar }}>
            {children}
        </SideBarContext.Provider>
    );
}