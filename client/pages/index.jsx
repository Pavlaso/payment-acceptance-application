import { TextField, Button, Box, Grid } from "@material-ui/core"
import { MobileDatePicker } from "@mui/lab"
import { useReducer } from "react"
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import dateFormat from 'dateformat'
import axios from "axios";


const initialState = {
  CardNumber: "",
  ExpDate: null,
  Cvv: "",
  Amount: "",
}

const reducer = (state, action) => {
  if (action.type === "reset") {
    return initialState
  }
  const result = { ...state }
  result[action.type] = action.value
  return result
}

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
   const validation = useValidation(state)
   const setPayment = useAPI(state, dispatch)

  const isDisabled = Object.values(validation).indexOf(false) !== -1

  return (
    <Grid className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <Box className="mb-2">
            <TextField
              fullWidth
              type="number"
              label="Card Number"
              variant="outlined"
              value={state.CardNumber}
              onInput={(e) => {
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
            <MobileDatePicker
              views={["month", "year"]}
              inputFormat="MM/yyyy"
              label="Expiration Date"
              value={state.ExpDate}
              disableMaskedInput={true}
              onChange={(newValue) => {
                dispatch({ type: "ExpDate", value: newValue })
              }}
              renderInput={(params) => (
                <TextField fullWidth {...params} helperText={null} />
              )}
            />
          </Box>
          <Box className="mb-4">
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              mb={100}
            >
              <TextField
                type="number"
                label="Amount"
                variant="outlined"
                value={state.Amount}
                onInput={(e) => {
                  let value = e.target.value
                  dispatch({ type: "Amount", value: +value < 0 ? "0" : value })
                }}
              />
              <TextField
                type="number"
                label="CVV"
                variant="outlined"
                value={state.Cvv}
                onInput={(e) => {
                  let value = e.target.value
                  if (value.length <= 3)
                    dispatch({ type: "Cvv", value: +value < 0 ? "0" : value })
                }}
              />
            </Grid>
          </Box>
          <Box className="mb-4">
            <Button
              className={!isDisabled && "active-btn"}
              fullWidth
              style={{ fontSize: "20px" }}
              disabled={isDisabled}
              size="large"
              variant="contained"
              color="primary"
              onClick={setPayment}
            >
              <span className="button-text">Оплатить</span>
            </Button>
          </Box>
        </Box>
      </LocalizationProvider>
    </Grid>
  )
}

function useValidation(state) {
  const { CardNumber, ExpDate, Cvv, Amount } = state
  return {
    CardNumber: CardNumber.match(/^[0-9]{16,16}$/) ? true : false,
    ExpDate: ExpDate !== null,
    Cvv: Cvv.match(/^[0-9]{3,3}$/) ? true : false,
    Amount: Amount.match(/^[0-9]+$/) ? true : false,
  }
}

function useAPI(state, dispatch) {
  const { CardNumber, ExpDate, Cvv, Amount } = state
  const newPayment = {
    CardNumber,
    ExpDate: dateFormat(ExpDate, "mm/yyyy"),
    Cvv,
    Amount: +Amount,
  }
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

export default Home
