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

export default function AddRegal() {
  const methods = useForm()
  const { handleSubmit, control, errors: fieldsErrors } = methods

  const rulesObj = {
    rules: {
      required: true,
      pattern: {
        value: /^\d+$/,
        message: "Niepoprawne id",
      },
      maxLength: 2,
    },
  }
  const onSubmit = () => {
    console.log(fieldsErrors)
  }
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
          <Typography style={{ paddingBottom: "2vh" }}>Dodawanie:</Typography>
          <form noValidate autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth variant="outlined">
              <Grid container spacing={2}>
                <TextFeildComponent nameP="id" rulesObj={rulesObj} />
                <Button
                  onClick={() => console.log(fieldsErrors)}
                  color="primary"
                  type="submit"
                  variant="outlined"
                >
                  Dodaj
                </Button>
              </Grid>
            </FormControl>
          </form>
        </Paper>
      </div>
    </FormProvider>
  )
}
