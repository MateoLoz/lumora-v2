import { TextSideBarSchema } from "./Controls/Text.schema";

export type SideBarElement = {
    title: string,
    children: React.ReactNode
}

export enum ItemsType {
    Text = 'text',
    Figures = 'figures',
    Opacity = 'Opacity',
    Lines = 'lines',
    Images = 'images'
}

type BaseItem = {
    id: string,
    type: ItemsType
}

export interface TextItem extends BaseItem {
    type: ItemsType.Text,
    Color: Colors,
    fontFamily: string,
    fontSize: number,
    opacity: number,
    layer: number,
    actions: string[]
}

export interface FiguresItem extends BaseItem {
    type: ItemsType.Figures,
    Color: Colors,
    Background: Colors,
    Border: string,
    Opacity: number,
    Style: string,
    Thickness: number,
    Layer: number,
    Actions: string[]
}

export interface LinesItem extends BaseItem {
    type: ItemsType.Lines,
    Color: Colors,
    Opacity: number,
    Thickness: number,
    Layer: number,
    Actions: string[]
}

export interface ImagesItem extends BaseItem {
    type: ItemsType.Images,
    Border: string,
    Opacity: number,
    Layer: number,
    Actions: string[]
}

export enum ControlType {
    Select = 'select',
    Text = 'text',
    toggle = 'toggle',
    Number = 'number',
    Color = 'color',
}

export type ControlSchema<T> = {
    label: string,
    icon?: React.ReactNode,
    type: ControlType,
    property: keyof T

    options?: { label: string; value: any; icon?: React.ReactNode }[]
}

export type SideBarSchema<T> = {
    title: string,
    controls: ControlSchema<T>[]
}

export enum Colors {
    Black = '#0F172A',
    Gray = '#334155',
    Blue = '#1E3A8A',
    DarkGreen = '#065F46',
    Burgundy = '#7F1D1D',
}

export const SideBarRegistry = {
    text: TextSideBarSchema,
}