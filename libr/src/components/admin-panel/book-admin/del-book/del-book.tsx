import React, { useState, useRef, useEffect } from "react"
import TextField from "@material-ui/core/TextField"
import { Typography, Paper, Grid, Button, FormControl } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import CheckCircleIcon from "@material-ui/icons/CheckCircle"
import CheckIcon from "@material-ui/icons/Check"
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
interface dataType {
  idEgzemplarza: string
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
export default function DelBook() {
  const location = useLocation()

  const [okStatus, setStatus] = useState(false)
  const { topicId } = useParams<ParamTypes>()
  const unmutable = useRef(false)

  const { handleSubmit, control, errors: fieldsErrors, watch } = useForm({
    mode: "onChange",
  })

  const watchName = watch("idEgzemplarza")

  const onSubmit = (data: dataType) => {
    // unmutable.current = true
    axios
      .delete(
        `http://localhost:8081/api/Egzemplarze/delete/${data.idEgzemplarza}`
      )
      .then((response) => {
        setStatus(true)
      })
      .catch((error) => {
        if (error.response) {
          alert(error.response.data) // => the response payload
        }
      })
    console.log(unmutable.current)
    // setIsLoggedin()
  }
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <Paper
        style={{
          padding: "15px",
          marginTop: "10vh",
          borderRadius: "50px",
          boxShadow: "2vh 2vh 2vh  blue",
          border: "1vh",
        }}
      >
        <Typography style={{ paddingBottom: "2vh" }}>Usuwanieя</Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth variant="outlined">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Controller
                  name="idEgzemplarza"
                  as={
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        console.log(e.target.value)
                      }}
                      id="idEgzemplarza"
                      helperText={
                        fieldsErrors.idEgzemplarza
                          ? fieldsErrors.idEgzemplarza.message
                          : null
                      }
                      variant="outlined"
                      label="idEgzemplarza"
                      error={fieldsErrors.idEgzemplarza}
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
                {[!fieldsErrors.idEgzemplarza, watchName].every(
                  (x) => x != false
                ) && (
                  <div>
                    <Button variant="contained" color="primary" type="submit">
                      Usun
                    </Button>
                    {okStatus && <CheckCircleIcon color="primary" />}
                  </div>
                )}
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </Paper>
    </div>
  )
}
