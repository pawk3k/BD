import React from "react";
import TextField from "@material-ui/core/TextField";
import {
  Typography,
  Paper,
  Grid,
  Button,
} from "@material-ui/core";

export default function StateTextFields() {
  // const classes = useStyles();
  const [name, setName] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <Paper style={{ padding: "15px" }}>
        <Typography style={{ paddingBottom: "2vh" }}>Rejestracja</Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="filled-name"
                label="Imie"
                value={name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="filled-name"
                label="Nazwisko"
                value={name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="filled-name"
                label="email"
                value={name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="filled-name"
                label="haslo"
                value={name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id="filled-name"
                label="Powtorz haslo"
                value={name}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
