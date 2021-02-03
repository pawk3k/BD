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
  const dataP = useFetchApi("http://localhost:8081/api/Polki/list", kodRegalu)
    ?.filter((x: any) => x.kodRegalu == kodRegalu)
    ?.map((x: any) => ({
      value: x.nrPolki + "",
      label: x.nrPolki + "",
    })) as any[]

  return <SelectComponent name="nrPolki" options={dataP as any[]} />
}
