import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import EnhancedTable from "./history-table"
import { Grid } from "@material-ui/core"
export default function Rents() {
  const [isLoggedin, setIsLoggedin] = useState(false)

  const handleClick = () => {
    setIsLoggedin(!isLoggedin)
  }

  return (
    <div>
      {!isLoggedin ? (
        <div>
          <Grid container>
            <Grid item xs={12}>
              <Controller
                name="nazwisko"
                as={
                  <TextField
                    fullWidth
                    id="nazwisko"
                    helperText={
                      fieldsErrors.surname ? fieldsErrors.surname.message : null
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
              <Button
                variant="contained"
                color="primary"
                onClick={() => setIsLoggedin(!isLoggedin)}
              >
                Log in
              </Button>
              <div>You have to log in to see content</div>
            </Grid>
          </Grid>
        </div>
      ) : (
        <div>
          <EnhancedTable />
        </div>
      )}
    </div>
  )
}
