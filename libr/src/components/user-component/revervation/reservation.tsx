import React, { useEffect, useState } from "react"
import {
  Typography,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Button,
} from "@material-ui/core"
import { SelectComponent } from "../../form-components/select-component"
import { useForm, FormProvider, useFormContext } from "react-hook-form"
import { useFetchApi } from "../../../hooks/useFetchApi"
import { values, every } from "lodash"

import DataPickerComponent from "../../form-components/data-picker-component"
import { useParams } from "react-router-dom"
import axios from "axios"
import AvailableHours from "./available-hours"
interface userTableProps {
  userID: string
}
export default function Reservation() {
  const { userID } = useParams<userTableProps>()
  // const classes = useStyles();
  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // setName(event.target.value);
  //   };
  const [age, setAge] = React.useState("")
  const [day, setDay] = useState<any>()
  const methods = useForm()
  const { handleSubmit, control, errors: fieldsErrors, reset, watch } = methods
  const data = useFetchApi("http://localhost:8081/api/Sale/list")

  const watchSala = watch("sala")
  const watchData = watch("data")
  const watchGodzina = watch("godzina")
  useEffect(() => {
    console.log(watchData)
    const splited = watchData && (watchData.split("-") as any)
    splited && console.log(splited[2])
    splited && setDay(splited[2])
    // console.log(splited[2] as any)
  }, [watchData])
  // console.log(watchData)
  // console.log(watchSala.value as any)
  const splited = watchData?.split("-") as any[]
  // console.log(splited[2])
  // console.log(splited[2] as any)
  const filteredData =
    watchSala && data?.filter((x: any) => x.idSali == watchSala.value)
  const dataOptions = data?.map((x: any) => ({
    value: x.idSali,
    label: "sala" + x.idSali,
  }))
  // console.log(filteredData)
  // console.log(dataOptions)
  // console.log(watchSala)
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string)
  }
  const onSubmit = (data: any) => {
    console.log(data)
    const splited = data.godzina.value.split("-")
    const endData = {
      data: data.data,
      godzRozpoczecia: splited[0],
      deadline: splited[1],
      godzZakonczenia: splited[1],
      idUzytkownika: userID,
      idSali: data.sala.value,
    }
    // console.log(data)
    // console.log(endData)
    axios
      .post("http://localhost:8081/api/Wynajem/save", endData)
      .then((data) => alert("Zarezerwowano sale"))
      .catch((data) => alert("nie udalo sie"))
  }

  return (
    <FormProvider {...methods}>
      <div style={{ maxWidth: 600, margin: "auto" }}>
        <Paper style={{ padding: "15px" }}>
          <Typography style={{ paddingBottom: "2vh" }}>Rejestracja</Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Grid container spacing={4}>
                <Grid style={{ marginBottom: "2vh" }} container spacing={6}>
                  <Grid item xs={6}>
                    <Typography>Wybierz sale:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <SelectComponent
                      name="sala"
                      options={dataOptions as any[]}
                    />
                  </Grid>
                </Grid>{" "}
                {watchSala && (
                  <Grid style={{ marginBottom: "2vh" }} container>
                    <Grid item xs={6}>
                      Liczba miejsc: {filteredData[0].liczbaMiejsc}
                      {/* {data &&
                      data.filter((x: any) => x.idSali == watchSala.value)} */}
                    </Grid>
                    <Grid item xs={6}>
                      Czy jest tablica :{" "}
                      {filteredData[0].jestTablica ? "tak" : "nie"}
                    </Grid>
                  </Grid>
                )}
                <Grid style={{ marginBottom: "2vh" }} container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>Wybierz Date:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <DataPickerComponent nameP="data" />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography>Wybierz Godziny:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    {watchData && watchSala && (
                      <AvailableHours
                        idSali={watchSala.value}
                        day={watchData.slice(-2)}
                      />
                    )}
                  </Grid>
                </Grid>{" "}
                <Grid container spacing={2}>
                  {watchData && watchSala && watchGodzina && (
                    <Grid item xs={12}>
                      <Button type="submit">Rezerwuj</Button>
                    </Grid>
                  )}
                </Grid>
              </Grid>{" "}
            </FormControl>
          </form>
        </Paper>
      </div>
    </FormProvider>
  )
}
