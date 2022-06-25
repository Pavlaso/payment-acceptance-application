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