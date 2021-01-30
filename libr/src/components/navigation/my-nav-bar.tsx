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
import AdminWorskpace from "../admin-panel/admin-workspace"
import HomeComponent from "./home-component"

interface TabPanelProps {
  children?: React.ReactNode
  index: any
  value: any
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,

    backgroundColor: theme.palette.background.paper,
  },
}))

export default function SimpleTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue)
  }
  return (
    <div className={classes.root}>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          color="secondary"
          aria-label="simple tabs example"
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab label="Main Page" {...a11yProps(0)} to="/" component={Link} />
          <Tab
            label="registration"
            {...a11yProps(1)}
            to="/register"
            component={Link}
          />
          <Tab
            label="Wypozyczenia"
            {...a11yProps(2)}
            to="/rents"
            component={Link}
          />
          <Tab label="Admin" {...a11yProps(3)} to="/admin" component={Link} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <HomeComponent />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StateTextFields />
      </TabPanel>
      <TabPanel value={value} index={2}>
        Aktualne Wypozyczone
        {/* <Rents /> */}
      </TabPanel>
      <TabPanel value={value} index={3}></TabPanel>
    </div>
  )
}
