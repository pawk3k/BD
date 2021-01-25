import React from "react"
import "./App.css"
import CenteredTabs from "./components/navigation/my-nav-bar"
import Button from "@material-ui/core/Button"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom"
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import Reservation from "./components/revervation/reservation"
import Login from "./components/login/login"
import Rents from "./components/rents/rents"
import MainRouter from "./components/main-router/main-router"
interface ParamTypes {
  bid: string
}
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#630360",
    },
    secondary: {
      main: "#E3E",
    },
  },
})
const Comp = () => {
  const { bid } = useParams<ParamTypes>()
  return (
    <div>
      <p>id ksiazki {bid}</p>
      <p>tytyl: Norwegian wood</p>
      <Button variant="contained" color="primary">
        Ile dni zostalo?
      </Button>
    </div>
  )
}
function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <MainRouter />
    </MuiThemeProvider>
  )
}

export default App
