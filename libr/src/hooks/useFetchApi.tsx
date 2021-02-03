import React, { useEffect, useState } from "react"
import axios from "axios"

interface useFetchApiDeps {
  apiUrl: string
  watchValue?: string
}
export function useFetchApi(apiUrl: string, watchValue?: any): [] | null {
  const [data, setData] = useState<[]>([])
  // const { apiUrl, watchValue } = props
  const fetchDataUsersRents = async () => {
    const data = await axios.get(apiUrl)
    setData(data.data)
  }
  useEffect(() => {
    fetchDataUsersRents()
  }, [apiUrl, watchValue])

  return data
}
