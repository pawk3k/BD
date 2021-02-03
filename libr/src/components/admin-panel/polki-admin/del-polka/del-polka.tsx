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
import { values } from "lodash"
import { PolkiSelect } from "../../book-admin/add-book/polki-select"
import PolkaSelect from "./polka-select"

export default function DelPolka() {
  const methods = useForm()
  const { handleSubmit, control, errors: fieldsErrors, reset, watch } = methods
  const [, updateState] = React.useState<{}>()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const [changeS, setState] = useState<null>()
  const [endData, setEndData] = useState<{}>()
  const onSubmit = (data: any) => {
    console.log(data)
    axios.post(`http://localhost:8081/api/Polki/delete`, {
      nrPolki: +data.nrPolki.value,
      kodRegalu: data.kodRegalu.value,
    })
  }
  const watchRegal = watch("kodRegalu")
  const data = useFetchApi("http://localhost:8081/api/Regaly/list")?.map(
    (x: any) => ({
      value: x.kodRegalu,
      label: x.kodRegalu,
    })
  ) as any[]
  // let dataP = useFetchApi("http://localhost:8081/api/Polki/list") as any[]
  // useFetchApi("http://localhost:8081/api/Polki/list")
  //   .filter((x) => x.kodRegalu == watchRegal.value)
  //   .map((x: any) => ({
  //     value: x.nrPolki + "",
  //     label: x.nrPolki + "",
  //   }))
  // let dataP
  // useEffect(() => {
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   dataP = useFetchApi("http://localhost:8081/api/Polki/list")
  //     ?.filter((x: any) => x.kodRegalu == watchRegal.value)
  //     ?.map((x: any) => ({
  //       value: x.nrPolki + "",
  //       label: x.nrPolki + "",
  //     })) as any[]
  // }, [watchRegal])
  // const dataP = useFetchApi("http://localhost:8081/api/Polki/list") as any[]
  // dataP = dataP.filter((x) => x.kodRegalu == watchRegal)
  // useEffect(() => {
  //   console.log(watchRegal)
  //   dataP = dataP.filter((x) => x.kodRegalu == watchRegal.value)
  //   console.log(dataP)
  //   dataP = dataP.map((x: any) => ({
  //     value: x.nrPolki + "",
  //     label: x.nrPolki + "",
  //   }))
  //   console.log(dataP)
  // }, [watchRegal])
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
            Usuwanie Regalu:
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
                  {watchRegal && <PolkaSelect kodRegalu={watchRegal.value} />}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    onClick={() => setState(null)}
                    color="primary"
                    type="submit"
                    variant="outlined"
                  >
                    Usun
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
