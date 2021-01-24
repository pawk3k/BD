import React, { useRef } from "react"
import TextField from "@material-ui/core/TextField"
import { Typography, Paper, Grid, Button, FormControl } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"

export default function UserRegister() {
  const { handleSubmit, control, errors: fieldsErrors, watch } = useForm()
  const onSubmit = async (data: any) => {
    await axios
      .post("http://localhost:8081/api/Uzytkownicy/save", data)
      .then((resp) => console.log(resp))
      .catch((m) => alert(m))

    const data2 = await axios
      .get("http://localhost:8081/api/Uzytkownicy/max")
      .then((resp) => alert("Your 📚 id is :" + resp.data))
      .catch((message) => alert(message))
  }
  const password = useRef({})
  password.current = watch("password1", "")
  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <Paper
        style={{
          padding: "15px",
          marginTop: "10vh",
          borderRadius: "50px",
          boxShadow: "2vh 2vh 2vh  blue",
          border: "1vh",
        }}
      >
        <Typography style={{ paddingBottom: "2vh" }}>Rejestracja</Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth variant="outlined">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Controller
                  name="imie"
                  as={
                    <TextField
                      fullWidth
                      id="imie"
                      helperText={
                        fieldsErrors.imie ? fieldsErrors.imie.message : null
                      }
                      variant="outlined"
                      label="Imie"
                      error={fieldsErrors.imie}
                    />
                  }
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                    pattern: {
                      value: /^[A-Z]{1}[a-z]{1,}$/,
                      message: "Niepoprawne imie",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="nazwisko"
                  as={
                    <TextField
                      fullWidth
                      id="nazwisko"
                      helperText={
                        fieldsErrors.nazwisko
                          ? fieldsErrors.nazwisko.message
                          : null
                      }
                      variant="outlined"
                      label="Nazwisko"
                      error={fieldsErrors.nazwisko}
                    />
                  }
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                    pattern: {
                      value: /^[A-Z]{1}[a-z]{1,}$/,
                      message: "Niepoprawne nazwisko",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" color="primary" type="submit">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </FormControl>
        </form>
      </Paper>
    </div>
  )
}
