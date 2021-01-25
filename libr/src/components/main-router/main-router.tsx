import React from "react"
import CenteredTabs from "../navigation/my-nav-bar"
import Button from "@material-ui/core/Button"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom"
// import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles"

import Reservation from "../revervation/reservation"
import Login from "../login/login"
import Rents from "../rents/rents"

const Comp = () => {
  return (
    <div>
      <p>tytyl: Norwegian wood</p>
      <Button variant="contained" color="primary">
        Ile dni zostalo?
      </Button>
    </div>
  )
}

export default function MainRouter() {
  return (
    <div>
      <Router>
        <Switch>
          <div className="App">
            <Route path="/">
              <CenteredTabs />
            </Route>
            <Route path="/rents">
              <Rents />
            </Route>
            <Route exact path="/lol">
              <Reservation />
            </Route>
            <Route exact path="/book/:bid" component={Comp} />
            <Route path="/login">
              <Login />
            </Route>
          </div>
        </Switch>
      </Router>
    </div>
  )
}
