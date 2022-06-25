import { TextField, Box, Grid } from "@material-ui/core"
import { ChangeEvent, useReducer } from "react"
import { StateType, ActionType } from "../assets/types";
import { CustomButton } from "./customButton";
import { CustomDataInput } from "./customDataInput";

export const Content = () => {
    const initialState: StateType = {
        CardNumber: "",
        ExpDate: null,
        Cvv: "",
        Amount: "",
    }

    const reducer = (state: StateType, action: ActionType) => {
        if (action.type === "reset") {
          return initialState
        }
        const result: any = { ...state }
        result[action.type] = action.value
        return result
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    

    return (
        <Box>
            <Box className="mb-2">
                <TextField
                    fullWidth
                    type="number"
                    label="Card Number"
                    variant="outlined"
                    value={state.CardNumber}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => {
                        let value = e.target.value
                        if (value.length <= 16)
                        dispatch({
                            type: "CardNumber",
                            value: +value < 0 ? "0" : value,
                        })
                    }}
                />
            </Box>
            <Box className="mb-4">
                <CustomDataInput state={state} dispatch={dispatch}/>
            </Box>
            <Box className="mb-4">
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                >
                <TextField
                    type="number"
                    label="Amount"
                    variant="outlined"
                    value={state.Amount}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => {
                        let value = e.target.value
                        dispatch({ type: "Amount", value: +value < 0 ? "0" : value })
                    }}
                />
                <TextField
                    type="number"
                    label="CVV"
                    variant="outlined"
                    value={state.Cvv}
                    onInput={(e: ChangeEvent<HTMLInputElement>) => {
                        let value = e.target.value
                        if (value.length <= 3) 
                            dispatch({ type: "Cvv", value: +value < 0 ? "0" : value })
                    }}
                />
                </Grid>
            </Box>
            <Box className="mb-4">
               <CustomButton state={state} dispatch={dispatch} />
            </Box>
        </Box>
    ) 
   
}

