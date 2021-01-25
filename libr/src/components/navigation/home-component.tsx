import React from "react"
import { makeStyles, Theme } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Typography from "@material-ui/core/Typography"
import Box from "@material-ui/core/Box"
import StateTextFields from "../registration/user-register"
import Rents from "../rents/rents"
import { Link } from "react-router-dom"
import { Button } from "@material-ui/core"
export default function HomeComponent() {
  return (
    <div>
      <p>Witamy na naszej stronie uzytkowniku</p>
      <p>Dostepne opcje to:</p>
      <p>
        <Button color="primary" variant="contained" to="/find" component={Link}>
          Wyszukaj Artykul
        </Button>
      </p>
      <p>
        <Button
          color="primary"
          variant="contained"
          to="/rents"
          component={Link}
        >
          Historia Wypozyczen
        </Button>
      </p>
      <p>
        <Button
          color="primary"
          variant="contained"
          to="/rents"
          component={Link}
        >
          Rezerwacje Sal
        </Button>
      </p>
      {/* <BookmarkComponent /> */}
    </div>
  )
}
