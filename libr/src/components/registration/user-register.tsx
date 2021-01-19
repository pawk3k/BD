import React, { useRef } from "react"
import TextField from "@material-ui/core/TextField"
import { Typography, Paper, Grid, Button, FormControl } from "@material-ui/core"
import { useForm, Controller } from "react-hook-form"
export default function UserRegister() {
  const { handleSubmit, control, errors: fieldsErrors, watch } = useForm()
  const onSubmit = (data: any) => {
    console.log(data)
  }
  const password = useRef({})
  password.current = watch("password1", "")
  // <Controller
  //                 name="email"
  //                 as={
  //                   <TextField
  //                     id="email"
  //                     helperText={
  //                       fieldsErrors.email ? fieldsErrors.email.message : null
  //                     }
  //                     variant="outlined"
  //                     label="Email"
  //                     error={fieldsErrors.email}
  //                   />
  //                 }
  //                 control={control}
  //                 defaultValue=""
  //                 rules={{
  //                   required: "Required",
  //                   pattern: {
  //                     value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  //                     message: "invalid email address",
  //                   },
  //                 }}
  //               />

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
                  name="name"
                  as={
                    <TextField
                      fullWidth
                      id="name"
                      helperText={
                        fieldsErrors.name ? fieldsErrors.name.message : null
                      }
                      variant="outlined"
                      label="Imie"
                      error={fieldsErrors.name}
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
                  name="surname"
                  as={
                    <TextField
                      fullWidth
                      id="surname"
                      helperText={
                        fieldsErrors.surname
                          ? fieldsErrors.surname.message
                          : null
                      }
                      variant="outlined"
                      label="Nazwisko"
                      error={fieldsErrors.surname}
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
                <Controller
                  name="email"
                  as={
                    <TextField
                      fullWidth
                      id="email"
                      helperText={
                        fieldsErrors.email ? fieldsErrors.email.message : null
                      }
                      variant="outlined"
                      label="email"
                      error={fieldsErrors.email}
                    />
                  }
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "invalid email",
                    },
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="password1"
                  as={
                    <TextField
                      fullWidth
                      id="password1"
                      helperText={
                        fieldsErrors.password1
                          ? fieldsErrors.password1.message
                          : null
                      }
                      variant="outlined"
                      label="Haslo"
                      error={fieldsErrors.password1}
                    />
                  }
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                    minLength: 8,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Controller
                  name="password2"
                  as={
                    <TextField
                      fullWidth
                      id="password2"
                      helperText={
                        fieldsErrors.password2
                          ? fieldsErrors.password2.message
                          : null
                      }
                      variant="outlined"
                      label="Powtorz haslo"
                      error={fieldsErrors.password2}
                    />
                  }
                  control={control}
                  defaultValue=""
                  rules={{
                    required: "Required",
                    minLength: 8,
                    validate: (value) =>
                      value === password.current ||
                      "The passwords do not match",
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
