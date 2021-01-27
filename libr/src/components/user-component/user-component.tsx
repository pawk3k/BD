import React from "react"
import EnhancedTable from "../rents/history-table"
import {
  Route,
  Switch,
  Redirect,
  Link,
  useParams,
  useLocation,
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import Button from "@material-ui/core/Button"
import Reservation from "../revervation/reservation"

interface TableProps {
  userID: string
}

export default function UserComponent() {
  const match = useRouteMatch()
  return (
    <div>
      <div>
        <ButtonGroup variant="contained" color="primary">
          <Button to={`${match.url}/rooms`} component={Link}>
            Sale
          </Button>
          <Button to={`${match.url}/books`} component={Link}>
            Ksiazki
          </Button>
        </ButtonGroup>
      </div>
      <Switch>
        <Route path={`${match.path}/books`}>
          <EnhancedTable />
        </Route>
        <Route path={`${match.path}/rooms`}>
          <Reservation />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  )
}
