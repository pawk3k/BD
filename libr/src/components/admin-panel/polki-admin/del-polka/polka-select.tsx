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

interface PolkaProps {
  kodRegalu: string
}
export default function PolkaSelect(props: PolkaProps) {
  const { kodRegalu } = props
  // const { handleSubmit, control, errors: fieldsErrors, reset, watch } = methods
  const [, updateState] = React.useState<{}>()
  const forceUpdate = React.useCallback(() => updateState({}), [])
  const [changeS, setState] = useState<null>()
  const [endData, setEndData] = useState<{}>()
  const onSubmit = (data: any) => {
    console.log(data)
    forceUpdate()
  }

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
  const dataP = useFetchApi("http://localhost:8081/api/Polki/list", kodRegalu)
    ?.filter((x: any) => x.kodRegalu == kodRegalu)
    ?.map((x: any) => ({
      value: x.nrPolki + "",
      label: x.nrPolki + "",
    })) as any[]

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
  return <SelectComponent name="nrPolki" options={dataP as any[]} />
}
