import { Grid, Button, TextField } from "@material-ui/core"
import React, { useState } from "react"
import SearchIcon from "@material-ui/icons/Search"
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
import { BookSearchTable } from "./book-search-table"
export default function FindBook() {
  const [isbn, setIsbn] = useState<string>("")
  const match = useRouteMatch()
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <Grid container justify="center" spacing={0}>
        <Grid item xs={9}>
          <TextField
            id="imie"
            fullWidth
            onChange={(e) => setIsbn(e.target.value)}
            // helperText={
            //   fieldsErrors.imie ? fieldsErrors.imie.message : null
            // }
            variant="outlined"
            label="nazwa"
            // error={fieldsErrors.imie}
          />
        </Grid>
        <Grid style={{ height: "inherit" }} item xs={3}>
          <Button
            style={{ height: "100%" }}
            startIcon={<SearchIcon />}
            variant="contained"
            color="primary"
            to={`${match.url}/${isbn}`}
            component={Link}
          >
            search
          </Button>
        </Grid>
      </Grid>

      <Switch>
        <Route path={`${match.path}/:userID`}>
          <BookSearchTable />
        </Route>

        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  )
}
