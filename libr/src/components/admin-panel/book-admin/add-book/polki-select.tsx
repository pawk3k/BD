import React, { useEffect, useState, useRef } from "react"
import axios from "axios"
import SelectComponent from "../../../form-components/select-component"
import { config } from "process"
import { values } from "lodash"
import { useForm } from "react-hook-form"

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
  const [value, setValue] = useState<ValueLabel | null>()
  const inputEl = useRef(null)
  const { reset } = useForm()
  const [data1, setData1] = useState<ValueLabel[]>([])
  const { control, name, kodRegalu } = props
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
  // const clearValue = () => {
  //   inputEl.select.clearValue()
  // }

  useEffect(() => {
    fetchData()
    reset()
    console.log()
    return setValue(null)
    // setValue({ value: "0", label: "0" })
    // console.log({ value: 0, label: 0 })
    // clearValue()
    // forceUpdate()
  }, [kodRegalu])

  return (
    <div>
      <SelectComponent
        key={name}
        value={value}
        control={control}
        name={name}
        options={data as ValueLabel[]}
      />
    </div>
  )
}
export default React.forwardRef(PolkiSelect)
