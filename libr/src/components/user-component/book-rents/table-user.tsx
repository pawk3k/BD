import MUIDataTable from "mui-datatables"
import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { useFetchApi } from "../../../hooks/useFetchApi"
const columns = [
  {
    name: "tytul",
    label: "Tytul",
    options: {
      filter: true,
      sort: true,
    },
  },

  {
    name: "pozycja",
    label: "pozycja",
    options: {
      filter: true,
      sort: false,
    },
  },
  {
    name: "czas_konca",
    label: "czas_konca",
    options: {
      filter: true,
      sort: false,
    },
  },
]

const data = [
  { name: "Joe James", company: "Test Corp", city: "Yonkers", state: "NY" },
  { name: "John Walsh", company: "Test Corp", city: "Hartford", state: "CT" },
  { name: "Bob Herm", company: "Test Corp", city: "Tampa", state: "FL" },
  { name: "James Houston", company: "Test Corp", city: "Dallas", state: "TX" },
]

interface RowTypeProps {
  czas_konca: string
  tytul: string
  pozycja: string
}

const options = {
  filterType: '"checkbox"',
}

interface userTableProps {
  userID: string
}

export default function TableUser() {
  const { userID } = useParams<userTableProps>()
  // const [dataRents, setDataRents] = useState<RowTypeProps[]>([])
  // const fetchDataUsersRents = async () => {
  //   const data = await axios.get(
  //     `http://localhost:8081/api/Uzytkownicy/rentList/102`
  //   )
  //   // const reformatedData = data.map((x)=>{({tytul:x[0], "pozycja":[1],czas_konca:[2]})})
  //   const reformatedData = data.data.map((x: any) => ({
  //     tytul: x[0],
  //     pozycja: x[1],
  //     czas_konca: x[2],
  //   }))
  //   // const { tytul, pozycja, czas_konca }: RowTypeProps = data.data
  //   // setDataRents(data  )
  //   console.log(data.data)
  //   setDataRents(reformatedData)
  //   // console.log(reformatedData)
  // }
  // useEffect(() => {
  //   fetchDataUsersRents()
  // }, [])
  const data: [] | null = useFetchApi(
    "http://localhost:8081/api/Uzytkownicy/rentList/102"
  )
  console.log(data)
  const reformatedData =
    data &&
    data.map(
      (x): RowTypeProps => ({
        tytul: x[0],
        pozycja: x[1],
        czas_konca: x[2],
      })
    )
  return (
    <div>
      <MUIDataTable
        title={`Lista wypozyczonych ksiazek dla uzytkownika ${userID}`}
        data={reformatedData as RowTypeProps[]}
        columns={columns}
        options={options as Partial<unknown>}
      />
    </div>
  )
}
