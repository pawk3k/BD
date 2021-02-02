import React, { useEffect, useState } from "react"
import axios from "axios"
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
import { Grid } from "@material-ui/core"
interface BookSearchProps {
  userID: string
}
export interface Publikacja {
  isbn: string
  typ: string
  tytul: string
  gatunek?: any
  temat?: any
  publikacjeByIdCzasopisma?: any
}

export const BookSearchTable = () => {
  const { userID } = useParams<BookSearchProps>()
  const [books, setBooks] = useState([])
  // const match = useRouteMatch()
  // eslint-disable-next-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    const data = await axios.get(
      `http://localhost:8081/api/Publikacje/list/${userID}`
    )
    console.log(data.data)
    setBooks(data.data)
  }
  useEffect(() => {
    fetchData()
  }, [userID])

  return (
    <div>
      <Grid container direction="column" style={{ marginTop: "10vh" }}>
        <Grid item direction="column" xs={12}>
          {books.map((x: Publikacja) => (
            <Grid container key={x.isbn}>
              <Grid item xs={2}>
                {x.isbn}
              </Grid>
              <Grid item xs={2}>
                {x.typ}
              </Grid>
              <Grid item xs={2}>
                {x.gatunek}
              </Grid>
              <Grid item xs={2}>
                {x.tytul}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  )
}
