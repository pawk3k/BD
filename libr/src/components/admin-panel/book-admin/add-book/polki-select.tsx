import React, { useEffect, useState } from "react"
import axios from "axios"
import { SelectComponent } from "../../../form-components/select-component"
import { config } from "process"
import { values } from "lodash"

interface ValueLabel {
  value: string
  label: string
}

interface RegalSelectProps {
  control: any
  name: string
  kodRegalu: string
}
export default function PolkiSelect(props: RegalSelectProps) {
  const [data, setData] = useState<ValueLabel[]>([])
  const { control, name, kodRegalu } = props
  const fetchData = async () => {
    //Disbale
    const data = await axios.post(
      `http://localhost:8081/api/Polki/listByRegalyP`,
      {
        kodRegalu: kodRegalu,
      }
    )

    setData(
      data.data.map((x: any) => ({
        value: x.nrPolki,
        label: x.nrPolki,
      }))
    )
    console.log(data)
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
