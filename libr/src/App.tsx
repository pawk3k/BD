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
import Reservation from "./components/revervation/reservation"

interface ParamTypes {
  bid: string
}

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
    <div style={{backgroundColor:"gray"}}>
      <Router>
        <Switch>
          <div className="App">
            <Route path="/">
              <CenteredTabs />
            </Route>
            <Route exact path="/lol">
              <Reservation />
            </Route>
            <Route exact path="/book/:bid" component={Comp} />

            {/* <Form /> */}
          </div>
        </Switch>
      </Router>
    </div>
  )
}

export default App
