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
import { useForm, Controller } from "react-hook-form"
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
import UserComponent from "../user-component/user-component"
import BookRents from "./book-rents"
import BookAdmin from "./book-admin/add-book/book-admin"
import AdminBookRouter from "./book-admin/admin-book-router"
import UsersAdminPanel from "./users-admin/users-admin-panel"
import RegalyAdmin from "./reagaly-admin/add-regal/add-regal"
import AdminPolkiRouter from "./polki-admin/admin-polki-router"
import AdminRegalyRouter from "./reagaly-admin/admin-regaly-roter"
interface dataType {
  identification: string
}

interface ParamTypes {
  topicId: string
}
function Topic() {
  const { topicId } = useParams<ParamTypes>()
  const history = useHistory()
  return (
    <div>
      <div>
        <button onClick={() => history.goBack()}>back</button>
      </div>
      <h3>Requested topic ID: {topicId}</h3>
    </div>
  )
}
export default function AdminWorskpace() {
  const location = useLocation()
  const match = useRouteMatch()
  const unmutable = useRef(false)
  const [option, setOption] = useState<string>("")
  const [linkHref, setLink] = useState<string>("")
  const { handleSubmit, control, errors: fieldsErrors, watch } = useForm({
    mode: "onChange",
  })
  const watchName = watch("identification")

  const watchIDU = watch("id_u")
  const watchIDE = watch("id_e")

  const onSubmit = (data: dataType) => {
    alert(option)
    option === "wypozycz"
      ? axios
          .get(
            `http://localhost:8081/api/Publikacje/rent/${watchName}/${watchIDE}/${watchIDU}/`
          )
          .catch((x) => {
            // alert(x)
            console.log(x)
          })
      : axios
          .get(
            `http://localhost:8081/api/Publikacje/unrent/${watchName}/${watchIDE}/${watchIDU}/`
          )
          .catch((x) => alert("blad serwera"))
  }
  return (
    <div style={{ maxWidth: 600, marginTop: "2vh", margin: "auto" }}>
      <ButtonGroup variant="contained" color="primary">
        <Button to={`${match.url}/adminRents`} component={Link}>
          Zarzadznie Wypozyczeniami
        </Button>
        <Button to={`${match.url}/bookAdmin`} component={Link}>
          Ksiazki
        </Button>
        <Button to={`${match.url}/usersAdmin`} component={Link}>
          Uzytkownicy
        </Button>
        <Button to={`${match.url}/polkiAdmin`} component={Link}>
          Polki
        </Button>
        <Button to={`${match.url}/regalyAdmin`} component={Link}>
          Regaly
        </Button>
      </ButtonGroup>

      <Switch>
        <Route path={`${match.path}/adminRents`}>
          <BookRents />
        </Route>
        <Route path={`${match.path}/bookAdmin`}>
          <AdminBookRouter />
        </Route>
        <Route path={`${match.path}/usersAdmin`}>
          <UsersAdminPanel />
        </Route>
        <Route path={`${match.path}/regalyAdmin`}>
          <AdminRegalyRouter />
        </Route>
        <Route path={`${match.path}/polkiAdmin`}>
          <AdminPolkiRouter />
        </Route>
      </Switch>
    </div>
  )
}
