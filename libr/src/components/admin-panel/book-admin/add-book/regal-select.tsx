import React, { useEffect, useState } from "react"
import axios from "axios"
import { SelectComponent } from "../../../form-components/select-component"

interface ValueLabel {
  value: string
  label: string
}

interface RegalSelectProps {
  control: any
  name: string
}
export default function RegalSelect(props: RegalSelectProps) {
  const [data, setData] = useState<ValueLabel[]>([])
  const { control, name } = props
  const fetchData = async () => {
    const data = await axios.get("http://localhost:8081/api/Regaly/list")
    console.log(data.data)
    const regaly: ValueLabel[] = data.data.map((x: any) => ({
      value: x.kodRegalu,
      label: x.kodRegalu,
    }))
    console.log(regaly)
    // setData(data.data)
    setData(regaly)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <SelectComponent control={control} name={name} options={data} />
    </div>
  )
}
