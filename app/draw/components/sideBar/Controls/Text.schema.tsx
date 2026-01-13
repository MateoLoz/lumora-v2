import type { SideBarSchema } from "../sidebar.types";
import { ControlType } from "../sidebar.types";
import { Colors } from "../sidebar.types";
import type { TextItem } from "../sidebar.types";
import { Pencil, Baseline, FileType } from "lucide-react";
import fontSizeIcon from "@/ui/icons/custom/font-size/FontSize";

export const TextSideBarSchema: SideBarSchema<TextItem> = {
    title: "Text",
    controls: [
        {
            label: "FontSize",
            type: ControlType.Number,
            property: "fontSize",
            options: [
                {
                    label: "xs",
                    value: 12,
                    icon: fontSizeIcon().extraSmall,
                },
                {
                    label: "sm",
                    value: 14,
                    icon: fontSizeIcon().small,
                },
                {
                    label: "md",
                    value: 16,
                    icon: fontSizeIcon().medium,
                },
                {
                    label: "lg",
                    value: 18,
                    icon: fontSizeIcon().large,
                },
                {
                    label: "xl",
                    value: 20,
                    icon: fontSizeIcon().extraLarge,
                }
            ]
        }
    ]
} satisfies SideBarSchema<TextItem>