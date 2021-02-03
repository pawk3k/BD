import React from "react"
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
import { values } from "lodash"
import DataPickerComponent from "../../form-components/data-picker-component"
export default function Reservation() {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, "0")
  const mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  const yyyy = today.getFullYear()
  // const classes = useStyles();
  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // setName(event.target.value);
  //   };
  const [age, setAge] = React.useState("")
  const methods = useForm()
  const { handleSubmit, control, errors: fieldsErrors, reset, watch } = methods
  const data = useFetchApi("http://localhost:8081/api/Sale/list")

  const watchSala = watch("sala")
  const filteredData =
    watchSala && data?.filter((x: any) => x.idSali == watchSala.value)
  const dataOptions = data?.map((x: any) => ({
    value: x.idSali,
    label: "sala" + x.idSali,
  }))
  console.log(filteredData)
  console.log(dataOptions)
  console.log(watchSala)
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string)
  }
  const onSubmit = (data: any) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <div style={{ maxWidth: 600, margin: "auto" }}>
        <Paper style={{ padding: "15px" }}>
          <Typography style={{ paddingBottom: "2vh" }}>Rejestracja</Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormControl>
              <Grid container spacing={6}>
                <Grid item xs={6}>
                  <Typography>Wybierz sale:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <SelectComponent name="sala" options={dataOptions as any[]} />
                </Grid>
              </Grid>{" "}
              {watchSala && (
                <Grid container>
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
              <Grid container spacing={2}>
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
                  <SelectComponent
                    name="godzina"
                    options={[
                      { value: "10-12", label: "10-12" },
                      { value: "12-14", label: "12-14" },
                    ]}
                  />
                </Grid>
              </Grid>{" "}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button type="submit">Rezerwuj</Button>
                </Grid>
              </Grid>
            </FormControl>
          </form>
        </Paper>
      </div>
    </FormProvider>
  )
}
