import React, { useEffect, useState } from "react"
import axios from "axios"
export function useFetchApi(apiUrl: string): [] | null {
  const [data, setData] = useState<[]>([])
  const fetchDataUsersRents = async () => {
    const data = await axios.get(apiUrl)
    setData(data.data)
  }
  useEffect(() => {
    fetchDataUsersRents()
  }, [apiUrl])

  return data
}
