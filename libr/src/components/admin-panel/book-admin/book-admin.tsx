import React, { useState, useRef, useEffect } from "react"
// import Select from "react-select"
import TextField from "@material-ui/core/TextField"
import {
  Typography,
  Paper,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core"
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
interface dataType {
  identification: string
  gatunek: string
}
export default function BookAdmin() {
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
  const { handleSubmit, control, errors: fieldsErrors, watch } = useForm({})
  const watchName = watch("identification")

  const watchTyp = watch("typ")
  console.log(watchTyp)
  const onSubmit = (data: any) => {
    console.log("kek")
    console.log(data)
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
                  name="ISBN"
                  as={
                    <TextField
                      fullWidth
                      id="ISBN"
                      helperText={
                        fieldsErrors.ISBN ? fieldsErrors.ISBN.message : null
                      }
                      variant="outlined"
                      label="ISBN"
                      error={fieldsErrors.ISBN}
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
              <Controller
                name="tytul"
                as={
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      console.log(e.target.value)
                    }}
                    id="tytul"
                    helperText={
                      fieldsErrors.tytul ? fieldsErrors.tytul.message : null
                    }
                    variant="outlined"
                    label="tytul"
                    error={fieldsErrors.tytul}
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
              {/* <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Typ publikacji:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Controller
                      name="typ"
                      as={
                        <Select
                          native
                          id="typ"
                          variant="outlined"
                          label="typ"
                          error={fieldsErrors.tytul}
                          value={state.age}
                          onChange={handleChange}
                          inputProps={{
                            name: "typ",
                            id: "typ",
                          }}
                        >
                          <option aria-label="None" value="" />
                          <option value={"K"}>Ksiazka</option>
                          <option value={"C"}>Czasopismo</option>
                          <option value={"A"}>Artykul</option>
                        </Select>
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
                </Grid>
              </Grid> */}
              {/* <Grid item xs={12}>
                {watchTyp && (
                  <Controller
                    name="gatunek"
                    as={
                      <TextField
                        fullWidth
                        onChange={(e) => {
                          console.log(e.target.value)
                        }}
                        id="gatunek"
                        helperText={
                          fieldsErrors.gatunek
                            ? fieldsErrors.gatunek.message
                            : null
                        }
                        variant="outlined"
                        label={
                          watchTyp === "A"
                            ? "IsbnCzasopisma"
                            : watchTyp === "K"
                            ? "Gatunek"
                            : "Temat"
                        }
                        error={fieldsErrors.gatunek}
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
                )}
              </Grid>{" "} */}
              <Grid item xs={12}>
                {every([!fieldsErrors.ISBN]) && (
                  <Button color="primary" type="submit" variant="outlined">
                    Oddaj
                  </Button>
                )}
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </Paper>
    </div>
  )
}
