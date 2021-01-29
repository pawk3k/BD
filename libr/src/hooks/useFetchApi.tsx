import React, { useEffect, useState } from "react"
import axios from "axios"
export function useFetchApi<T>(apiUrl: string): [] | null {
  const [data, setData] = useState<[]>([])
  const fetchDataUsersRents = async () => {
    const data = await axios.get(
      `http://localhost:8081/api/Uzytkownicy/rentList/102`
    )
    setData(data.data)
  }
  useEffect(() => {
    fetchDataUsersRents()
  }, [])

  return data
}
