import { Button } from "@material-ui/core"
import { FC } from "react"
import { useAPI } from "../api/postData"
import { useValidation } from "../assets/helpers/useValidation"
import { ActionType, StateType } from "../assets/types"


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