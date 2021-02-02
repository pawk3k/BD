import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import SelectComponent from "../../../form-components/select-component"
import { config } from "process"
import { values } from "lodash"
import { useForm, useFormContext } from "react-hook-form"

interface ValueLabel {
  value: string | null
  label: string | null
}

interface RegalSelectProps {
  control: any
  name: string
  kodRegalu: string
}

export function PolkiSelect(props: RegalSelectProps, ref: any) {
  const [data, setData] = useState<ValueLabel[]>()
  // const [value, setValue] = useState<ValueLabel | null>()
  const inputEl = useRef(null)
  const [data1, setData1] = useState<ValueLabel[]>([])
  const { control, name, kodRegalu } = props
  const { setValue, reset } = useFormContext()
  const fetchData = async () => {
    //Disbale
    const data = await axios.post(
      `http://localhost:8081/api/Polki/listByRegalyP`,
      {
        kodRegalu: kodRegalu,
      }
    )
    console.log(data)
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
    console.log()
    return setValue("polki", { value: null, placeholder: "polki" })
  }, [kodRegalu])

  return (
    <div>
      <SelectComponent
        key={name}
        control={control}
        name={name}
        options={data as ValueLabel[]}
      />
    </div>
  )
}
export default React.forwardRef(PolkiSelect)
