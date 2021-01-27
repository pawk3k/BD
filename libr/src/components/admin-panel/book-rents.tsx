import React, { useState, useRef, useEffect } from "react"
import TextField from "@material-ui/core/TextField"
import { Typography, Paper, Grid, Button, FormControl } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"
import every from "lodash/every"
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
export default function BookRents() {
  const [state, setState] = React.useState<{
    age: string | number
    name: string
  }>({
    age: "",
    name: "hai",
  })

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state
    setState({
      ...state,
      [name]: event.target.value,
    })
  }

  const location = useLocation()
  const [isLoggedin, setIsLoggedin] = useState(false)
  const match = useRouteMatch()
  const unmutable = useRef(false)
  const [option, setOption] = useState<string>("")
  const [linkHref, setLink] = useState<string>("")
  const { handleSubmit, control, errors: fieldsErrors, watch } = useForm({
    mode: "onChange",
  })
  const watchName = watch("identification")

  const watchIDU = watch("id_u")
  const watchIDE = watch("id_e")

  const onSubmit = (data: dataType) => {
    alert(option)
    option === "wypozycz"
      ? axios
          .get(
            `http://localhost:8081/api/Publikacje/rent/${watchName}/${watchIDE}/${watchIDU}/`
          )
          .catch((x) => {
            // alert(x)
            console.log(x)
          })
      : axios
          .get(
            `http://localhost:8081/api/Publikacje/unrent/${watchName}/${watchIDE}/${watchIDU}/`
          )
          .catch((x) => alert("blad serwera"))
  }

  return (
    <div style={{ margin: "auto" }}>
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
                      label="ISBN"
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
                <Controller
                  name="id_e"
                  as={
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        console.log(e.target.value)
                      }}
                      id="identification"
                      helperText={
                        fieldsErrors.id_e ? fieldsErrors.id_e.message : null
                      }
                      variant="outlined"
                      label="ID egzemplarza"
                      error={fieldsErrors.id_e}
                    />
                  }
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                    pattern: {
                      value: /^\d+$/,
                      message: "Niepoprawne id egzemplarza",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="id_u"
                  as={
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        console.log(e.target.value)
                      }}
                      id="identification"
                      helperText={
                        fieldsErrors.id_u ? fieldsErrors.id_u.message : null
                      }
                      variant="outlined"
                      label="ID uzytkownika"
                      error={fieldsErrors.id_u}
                    />
                  }
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                    pattern: {
                      value: /^\d+$/,
                      message: "Niepoprawne id uzytkownika",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                {every([
                  !fieldsErrors.identification,
                  !fieldsErrors.id_e,
                  !fieldsErrors.id_u,
                  watchName,
                  watchIDE,
                  watchIDU,
                ]) && (
                  <Grid container>
                    <Grid item xs={6}>
                      <Button
                        onClick={() => setOption("wypozycz")}
                        variant="contained"
                        color="primary"
                        type="submit"
                      >
                        Wypozycz
                      </Button>
                    </Grid>
                    <Grid item xs={6}>
                      <Button
                        onClick={() => setOption("oddaj")}
                        color="primary"
                        type="submit"
                      >
                        Oddaj
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </Paper>
    </div>
  )
}
