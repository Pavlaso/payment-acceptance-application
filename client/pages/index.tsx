import { Grid } from "@material-ui/core"
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Content } from "../components/content";

const Index = () => {
  return (
    <Grid className="App">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Content />
      </LocalizationProvider>
    </Grid>
  )
}

export default Index