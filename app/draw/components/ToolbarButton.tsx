import { RectangleButton } from "./Buttons/RectangleButton";
import { CircleButton } from "./Buttons/CircleButton";
import { LineButton } from "./Buttons/LineButton";
import { ArrowButton } from "./Buttons/ArrowButton";
import { TextButton } from "./Buttons/TextButton";
import { Tool } from "../types";

export const ToolbarButton = ({
    selectedTool,
    onToolChange,
}: {
    selectedTool: Tool;
    onToolChange: (tool: Tool) => void;
}) => {
    return (
       <>
       <RectangleButton selectedTool={selectedTool} onToolChange={onToolChange} tool={Tool.RECTANGLE} dataTooltip="Rectangle (1)" tooltip={"1"}/>
       <CircleButton selectedTool={selectedTool} onToolChange={onToolChange} tool={Tool.CIRCLE} dataTooltip="Circle (2)" tooltip={"2"}/>
       <LineButton selectedTool={selectedTool} onToolChange={onToolChange} tool={Tool.LINE} dataTooltip="Line (3)" tooltip={"3"}/>
       <ArrowButton selectedTool={selectedTool} onToolChange={onToolChange} tool={Tool.ARROW} dataTooltip="Arrow (4)" tooltip={"4"}/>
       <TextButton selectedTool={selectedTool} onToolChange={onToolChange} tool={Tool.TEXT} dataTooltip="Text (5)" tooltip={"5"}/>
       </>
    )
}