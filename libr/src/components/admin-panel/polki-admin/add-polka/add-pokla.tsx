import React, { useState, useRef, useEffect } from "react"
import TextField from "@material-ui/core/TextField"
import {
  Typography,
  Paper,
  Grid,
  Button,
  FormControl,
  ButtonGroup,
} from "@material-ui/core"
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
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import TextFeildComponent from "../../../form-components/text-field-component"
import { SelectComponent } from "../../../form-components/select-component"
import { useFetchApi } from "../../../../hooks/useFetchApi"

const rulesObj = {
  rules: {
    required: true,
    pattern: {
      value: /^\d{1}$/,
      message: "Niepoprawny kod Regalu",
    },
  },
}

export default function AddPolka() {
  const methods = useForm()
  const { handleSubmit, control, errors: fieldsErrors, reset } = methods
  const [, updateState] = React.useState<{}>()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const [changeS, setState] = useState<null>()
  const [endData, setEndData] = useState<{}>()
  const onSubmit = (data: any) => {
    console.log(data)
    axios.post(`http://localhost:8081/api/Polki/save`, {
      nrPolki: data.numerPolki,
      kodRegalu: data.kodRegalu.value,
    })
    // axios
    //   .delete(`http://localhost:8081/api/Regaly/delete/${data.kodRegalu.value}`)
    //   .then((resp) => alert("usunieto regal"))
    //   .catch((m) => alert(m))
    reset()
    forceUpdate()
  }
  const data = useFetchApi("http://localhost:8081/api/Regaly/list")?.map(
    (x: any) => ({
      value: x.kodRegalu,
      label: x.kodRegalu,
    })
  ) as any[]
  // setEndData(data)
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
          <Typography style={{ paddingBottom: "2vh" }}>
            Dodawanie Polki:
          </Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth variant="outlined">
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <SelectComponent
                    control={control}
                    name="kodRegalu"
                    options={data as any[]}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextFeildComponent nameP="numerPolki" rulesObj={rulesObj} />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={() => setState(null)}
                    color="primary"
                    type="submit"
                    variant="outlined"
                  >
                    Dodaj
                  </Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Paper>
      </div>
    </FormProvider>
  )
}
