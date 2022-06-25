import axios from "axios"
import { ActionType, StateType } from "../assets/types"
import dateFormat from 'dateformat'
import { Button } from "@material-ui/core"
import { FC } from "react"
import { useValidation } from "../assets/helpers/useValidation"



export const CustomButton: FC<CustomButtonType> = ({state, dispatch}) => {
    const validation = useValidation(state)
    const setPayment = useAPI(state, dispatch)

    const isDisabled = Object.values(validation).indexOf(false) !== -1

    return (
        <Button
            className={`${!isDisabled && "active-btn"}`}
            fullWidth
            style={{ fontSize: "20px" }}
            disabled={isDisabled}
            size="large"
            variant="contained"
            color="primary"
            onClick={setPayment}
        >
            <span className="button-text">
                Оплатить
            </span>
        </Button>
    )
}

type CustomButtonType = {
    state: StateType
    dispatch: (action: ActionType) => void
}



export function useAPI(state: StateType, dispatch: (action: ActionType) => void) {
    const { CardNumber, ExpDate, Cvv, Amount } = state
    const newPayment = {
      CardNumber,
      ExpDate: dateFormat(ExpDate, "mm/yyyy"),
      Cvv,
      Amount: +Amount,
    }
    console.log(JSON.stringify(ExpDate))
    return () => {
      axios.post("http://localhost:3001/api", newPayment).then(res => {
        dispatch({ type: "reset" })
  
        const id = res.data.RequestId
        const amount = res.data.Amount
        const str = `id: ${id} \namount: ${amount}`
        
        alert(str)
      })
    }
  }