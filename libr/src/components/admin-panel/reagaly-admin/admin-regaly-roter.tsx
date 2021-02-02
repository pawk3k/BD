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
  ButtonGroup,
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
import { SelectDataType } from "../../../types/types"
import AddRegal from "./add-regal/add-regal"
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
export default function AdminRegalyRouter() {
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
  const watchRegal = watch("regal")
  const watchTyp = watch("typ")
  console.log(watchTyp)
  const onSubmit = (data: any) => {
    const sumbitDataPublication: formSubmitType = {
      isbn: data.ISBN,
      typ: data.typ.value,
      tytul: data.tytul,
      gatunek: data.gatunek !== undefined ? data.gatunek : null,
      temat: data.temat !== undefined ? data.temat : null,
      publikacjeByIdCzasopisma:
        data.publikacjeByIdCzasopisma !== undefined
          ? data.publikacjeByIdCzasopisma
          : null,
    }
    const sumbitDataEgzemplarz: egzemplarzDataType = {
      isbn: data.ISBN,
      idEgzemplarza: null,
      czyWypozyczony: false,
      pozycja: data.polki.value + data.regal.value,
    }

    axios
      .post("http://localhost:8081/api/Publikacje/save", sumbitDataPublication)
      .then((resp) => console.log(resp))
      .catch((m) => alert(m))
    axios
      .post("http://localhost:8081/api/Egzemplarze/save", sumbitDataEgzemplarz)
      .then((resp) => console.log(resp))
      .catch((m) => alert(m))

    console.log("kek")
    console.log(sumbitDataEgzemplarz)
  }

  return (
    <div style={{ paddingTop: "5vh  " }}>
      <ButtonGroup variant="contained" color="primary">
        <Button to={`${match.url}/add`} component={Link}>
          Dodaj
        </Button>
        <Button to={`${match.url}/del`} component={Link}>
          Usun
        </Button>
      </ButtonGroup>

      <Switch>
        <Route path={`${match.path}/add`}>
          <AddRegal />
        </Route>
        <Route path={`${match.path}/del`}></Route>
      </Switch>
    </div>
  )
}
