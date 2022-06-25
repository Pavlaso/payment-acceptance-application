import { MobileDatePicker } from "@mui/lab"
import { TextField } from "@material-ui/core"
import { FC } from "react"
import { ActionType, StateType } from "../assets/types"

export const CustomDataInput: FC<CustomDataInputType> = ({state, dispatch}) => {
    return (
        <MobileDatePicker
            views={["month", "year"]}
            inputFormat="MM/yyyy"
            label="Expiration Date"
            value={state.ExpDate}
            disableMaskedInput={true}
            onChange={(newValue) => {
                dispatch({ type: "ExpDate", value: newValue })
            }}
            renderInput={(params: any) => {
                return <TextField fullWidth {...params} helperText={null} /> 
            }}
        />
    )
}

type CustomDataInputType = {
    state: StateType
    dispatch: (action: ActionType) => void
}