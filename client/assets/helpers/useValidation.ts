import { StateType } from "../types"

export function useValidation(state: StateType) {
    const { CardNumber, ExpDate, Cvv, Amount } = state
    return {
      CardNumber: CardNumber.match(/^[0-9]{16,16}$/) ? true : false,
      ExpDate: ExpDate !== null,
      Cvv: Cvv.match(/^[0-9]{3,3}$/) ? true : false,
      Amount: Amount.match(/^[0-9]+$/) ? true : false,
    }
  }