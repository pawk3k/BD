import React from "react"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import Modal from "@material-ui/core/Modal"
import Grid from "@material-ui/core/Grid"
import { Paper } from "@material-ui/core"
function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
)

const useStylesGrid = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      margin: theme.spacing(3),
      height: "100%",
      textAlign: "center",
      alignContent: "center",
      textJustify: "revert",
      backgroundColor: "#eeeeee",
    },
  })
)
interface LibraryStateProps {
  open: boolean
  handleClose?: () => void
}
export default function LibraryState(props: LibraryStateProps) {
  const { open, handleClose } = props
  const classes = useStylesGrid()
  const modalClasse = useStyles()
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)

  const body = (
    <div style={modalStyle} className={modalClasse.paper}>
      <div className={classes.root}>
        <Grid item xs={12}>
          Nr polki/ numer regalu
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>A</Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>B</Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}>C</Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>1</Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item xs>
            <Paper
              style={{ backgroundColor: "green" }}
              className={classes.paper}
            ></Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>2</Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs>
            <Paper className={classes.paper}>3</Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}></Paper>
          </Grid>
          <Grid item xs>
            <Paper className={classes.paper}></Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item>Wynnik : C1</Grid>
        </Grid>
      </div>
    </div>
  )

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  )
}
