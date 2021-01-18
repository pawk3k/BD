import React from "react";
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
} from "@material-ui/core";

export default function Reservation() {
  // const classes = useStyles();
  //   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  // setName(event.target.value);
  //   };
  const [age, setAge] = React.useState("");

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <Paper style={{ padding: "15px" }}>
        <Typography style={{ paddingBottom: "2vh" }}>Rejestracja</Typography>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Wybierz sale:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Sala</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>sala1</MenuItem>
                  <MenuItem value={20}>sala2</MenuItem>
                  <MenuItem value={30}>sala3</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>{" "}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Wybierz Godziny:</Typography>
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <InputLabel id="demo-simple-select-label">Godziny</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  onChange={handleChange}
                >
                  <MenuItem value={10}>10-12</MenuItem>
                  <MenuItem value={20}>12-14</MenuItem>
                  <MenuItem value={30}>14-16</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>{" "}
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Wybierz Date:</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="date"
                label="data"
                type="date"
                defaultValue="2017-05-24"
                // className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button>Rezerwuj</Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
}
