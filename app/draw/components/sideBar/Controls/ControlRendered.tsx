import { ControlSchema } from "../sidebar.types";
import { ControlLabel } from "./ControlLabel";

export const ControlRendered = ({ control, values, onChange }: { control: ControlSchema<any>, values: any, onChange: (value: any) => void }) => {
    return (
        <div>
            <ControlLabel label={control.label} />
            <ControlRendered control={control} values={values} onChange={onChange} />
        </div>
    )
}