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
import { useForm, Controller, FormProvider } from "react-hook-form"
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
import { SelectComponent } from "../../../form-components/select-component"
import RegalSelect from "./regal-select"
import PolkiSelect from "./polki-select"
import { useFetchApi } from "../../../../hooks/useFetchApi"
import { SelectDataType } from "../../../../types/types"
import PolkaSelect from "../../polki-admin/del-polka/polka-select"
import { values } from "lodash"
import TextFeildComponent from "../../../form-components/text-field-component"
interface dataType {
  identification: string
  gatunek: string
}

interface egzemplarzDataType {
  isbn: number
  idEgzemplarza: number | null
  czyWypozyczony: boolean
  pozycja: string
}

interface formSubmitType {
  isbn: number
  typ: string
  tytul: string
  gatunek?: string
  temat?: string
  publikacjeByIdCzasopisma: number
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
  const fetchedData = useFetchApi("http://localhost:8081/api/Regaly/list")
  const options = fetchedData?.map(
    (x: any): SelectDataType => ({
      value: x.kodRegalu,
      label: x.kodRegalu,
    })
  )
  console.log(options)
  const location = useLocation()
  const [isLoggedin, setIsLoggedin] = useState(false)
  const match = useRouteMatch()
  const unmutable = useRef(false)
  const [option, setOption] = useState<string>("")
  const [linkHref, setLink] = useState<string>("")

  const methods = useForm()
  const {
    handleSubmit,
    control,
    errors: fieldsErrors,
    watch,
    setValue,
  } = methods
  const watchRegal = watch("regal")
  const watchTyp = watch("typ")
  const watchPolka = watch("nrPolki")

  const watchGatunek = watch("gatunek")
  const watchArtukul = watch("artykul")
  const watchCzasopismo = watch("czasopismo")

  console.log(watchTyp)
  const onSubmit = (data: any) => {
    console.log(data)
    // const sumbitDataPublication: formSubmitType = {
    //   isbn: data.ISBN,
    //   typ: data.typ.value,
    //   tytul: data.tytul,
    //   gatunek: data.gatunek !== undefined ? data.gatunek : null,
    //   temat: data.temat !== undefined ? data.temat : null,
    //   publikacjeByIdCzasopisma:
    //     data.publikacjeByIdCzasopisma !== undefined
    //       ? data.publikacjeByIdCzasopisma
    //       : null,
    // }
    // const sumbitDataEgzemplarz: egzemplarzDataType = {
    //   isbn: data.ISBN,
    //   idEgzemplarza: null,
    //   czyWypozyczony: false,
    //   pozycja: data.polki.value + data.regal.value,
    // }

    // axios
    //   .post("http://localhost:8081/api/Publikacje/save", sumbitDataPublication)
    //   .then((resp) => console.log(resp))
    //   .catch((m) => alert(m))
    // axios
    //   .post("http://localhost:8081/api/Egzemplarze/save", sumbitDataEgzemplarz)
    //   .then((resp) => console.log(resp))
    //   .catch((m) => alert(m))

    // console.log("kek")
    // console.log(sumbitDataEgzemplarz)
  }

  return (
    <FormProvider {...methods}>
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
          <Typography style={{ paddingBottom: "2vh" }}>Dodawanie:</Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth variant="outlined">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextFeildComponent
                    nameP="ISBN"
                    rulesObj={{
                      rules: {
                        required: "Required",
                        pattern: {
                          value: /^\d+$/,
                          message: "Niepoprawne id",
                        },
                      },
                    }}
                  />
                  {/* <Controller
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
                  /> */}
                </Grid>
                <Grid item xs={12}>
                  <TextFeildComponent
                    nameP="tytul"
                    rulesObj={{
                      rules: {
                        required: "Required",
                        pattern: {
                          value: /^.+$/,
                          message: "Niepoprawne tytul",
                        },
                      },
                    }}
                  />
                  {/* <Controller
                    name="tytul"
                    as={
                      <TextField
                        fullWidth
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
                    rules={}
                  /> */}
                </Grid>
                <Grid item xs={12}>
                  <SelectComponent
                    control={control}
                    name="typ"
                    options={[
                      { value: "K", label: "Ksiazka" },
                      { value: "A", label: "Artukul" },
                      { value: "C", label: "Czasopismo" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <RegalSelect name="regal" control={control} />
                </Grid>
                <Grid item xs={12}>
                  {watchRegal && (
                    <div>
                      <PolkaSelect kodRegalu={watchRegal.value} />
                      {/* <PolkiSelect
                        name="polki"
                        control={control}
                        kodRegalu={watchRegal.value}
                      /> */}
                    </div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  {watchTyp && (
                    <TextFeildComponent
                      nameP={
                        watchTyp.value === "A"
                          ? "artykul"
                          : watchTyp.value === "K"
                          ? "gatunek"
                          : "czasopismo"
                      }
                      rulesObj={{
                        rules: {
                          required: "Required",
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message: "Niepoprawne tytul",
                          },
                        },
                      }}
                    />
                    // <Controller
                    //   name={
                    //     watchTyp.value === "A"
                    //       ? "artykul"
                    //       : watchTyp.value === "K"
                    //       ? "gatunek"
                    //       : "czasopismo"
                    //   }
                    //   as={
                    //     <TextField
                    //       fullWidth
                    //       onChange={(e) => {
                    //         console.log(e.target.value)
                    //       }}
                    //       id={
                    //         watchTyp.value === "A"
                    //           ? "artykul"
                    //           : watchTyp.value === "K"
                    //           ? "gatunek"
                    //           : "czasopismo"
                    //       }
                    //       helperText={
                    //         fieldsErrors.gatunek
                    //           ? fieldsErrors.gatunek.message
                    //           : null
                    //       }
                    //       variant="outlined"
                    //       label={
                    //         watchTyp.value === "A"
                    //           ? "IsbnCzasopisma"
                    //           : watchTyp.value === "K"
                    //           ? "Gatunek"
                    //           : "Temat"
                    //       }
                    //       error={fieldsErrors.gatunek}
                    //     />
                    //   }
                    //   control={control}
                    //   defaultValue=""
                    //   rules={{
                    //     required: "Required",
                    //     pattern: {
                    //       value: /^\d+$/,
                    //       message: "Blad",
                    //     },
                    //   }}
                    // />
                  )}
                </Grid>
                <Grid item xs={12}>
                  {every([
                    !fieldsErrors.ISBN,
                    !fieldsErrors.tytul,
                    !fieldsErrors.gatunek,
                    !fieldsErrors.czasopismo,
                    !fieldsErrors.artykul,
                    watchTyp,
                    watchPolka,
                    watchRegal,
                  ]) &&
                    (watchArtukul || watchCzasopismo || watchGatunek) && (
                      <Button color="primary" type="submit" variant="outlined">
                        Dodaj
                      </Button>
                    )}
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Paper>
      </div>
    </FormProvider>
  )
}
