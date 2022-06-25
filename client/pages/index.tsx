import { Grid } from "@material-ui/core"
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Index = () => {
  return (
    <Grid className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        
      </LocalizationProvider>
    </Grid>
  )
}

export default Index