import React, { useState, useRef, useEffect } from "react"
import EnhancedTable from "./history-table"
import TextField from "@material-ui/core/TextField"
import { Typography, Paper, Grid, Button, FormControl } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
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
import { getByLabelText } from "@testing-library/react"
import UserComponent from "../user-component/user-component"
interface dataType {
  identification: string
}

interface ParamTypes {
  topicId: string
}
function Topic() {
  const { topicId } = useParams<ParamTypes>()
  const history = useHistory()
  return (
    <div>
      <div>
        <button onClick={() => history.goBack()}>back</button>
      </div>
      <h3>Requested topic ID: {topicId}</h3>
    </div>
  )
}
export default function Rents() {
  const location = useLocation()

  const [isLoggedin, setIsLoggedin] = useState(false)
  const { topicId } = useParams<ParamTypes>()
  const match = useRouteMatch()
  const unmutable = useRef(false)

  const [linkHref, setLink] = useState<string>("")
  const { handleSubmit, control, errors: fieldsErrors, watch } = useForm({
    mode: "onChange",
  })

  const watchName = watch("identification")

  useEffect(() => {
    if (location.pathname !== "/rents" && location.pathname !== "/rents/")
      unmutable.current = true
    else unmutable.current = false
    console.log(location)
    setIsLoggedin(!isLoggedin)
  }, [location])

  const onSubmit = (data: dataType) => {
    alert(data.identification)
    // unmutable.current = true
    console.log(unmutable.current)
    // setIsLoggedin()
  }
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      {!unmutable.current ? (
        <Paper
          style={{
            padding: "15px",
            marginTop: "10vh",
            borderRadius: "50px",
            boxShadow: "2vh 2vh 2vh  blue",
            border: "1vh",
          }}
        >
          <Typography style={{ paddingBottom: "2vh" }}>Logowanie:</Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth variant="outlined">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name="identification"
                    as={
                      <TextField
                        fullWidth
                        onChange={(e) => {
                          console.log(e.target.value)
                        }}
                        id="identification"
                        helperText={
                          fieldsErrors.identification
                            ? fieldsErrors.identification.message
                            : null
                        }
                        variant="outlined"
                        label="identification"
                        error={fieldsErrors.identification}
                      />
                    }
                    control={control}
                    defaultValue=""
                    rules={{
                      required: "Required",
                      pattern: {
                        value: /^\d+$/,
                        message: "Niepoprawne id",
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  {!fieldsErrors.identification && (
                    <Link to={`${match.url}/${watchName}`}>
                      <Button variant="contained" color="primary" type="submit">
                        Log in
                      </Button>
                    </Link>
                  )}
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Paper>
      ) : (
        <div>kek</div>
      )}
      <Switch>
        <Route path={`${match.path}/:userID`}>
          <UserComponent />
        </Route>
        <Route path={match.path}>
          <h3>Please select a topic.</h3>
        </Route>
      </Switch>
    </div>
  )
}
