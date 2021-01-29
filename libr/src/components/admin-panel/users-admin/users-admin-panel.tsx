import React from "react"
import DelUser from "./del-user/del-user"
import ButtonGroup from "@material-ui/core/ButtonGroup"
import { Button } from "@material-ui/core"
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
export default function UsersAdminPanel() {
  const match = useRouteMatch()
  return (
    <div style={{ maxWidth: 600, paddingTop: "6vh", margin: "auto" }}>
      <ButtonGroup variant="contained" color="primary">
        <Button to={`${match.url}/del`} component={Link}>
          Usun
        </Button>
      </ButtonGroup>
      <Switch>
        <Route path={`${match.path}/del`}>
          <DelUser />
        </Route>
      </Switch>
    </div>
  )
}
