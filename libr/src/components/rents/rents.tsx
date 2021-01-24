import React, { useState } from "react"
import EnhancedTable from "./history-table"
import TextField from "@material-ui/core/TextField"
import { Typography, Paper, Grid, Button, FormControl } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"
import axios from "axios"

export default function Rents() {
  const [isLoggedin, setIsLoggedin] = useState(false)

  const { handleSubmit, control, errors: fieldsErrors, watch } = useForm()
  const onSubmit = (data: unknown) => {
    alert(data)
    setIsLoggedin(!isLoggedin)
  }

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
                  name="identification"
                  as={
                    <TextField
                      fullWidth
                      id="identification"
                      helperText={
                        fieldsErrors.identification
                          ? fieldsErrors.identification.message
                          : null
                      }
                      variant="outlined"
                      label="identification"
                      error={fieldsErrors.identification}
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
