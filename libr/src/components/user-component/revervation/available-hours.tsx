import React from "react"
import { SelectComponent } from "../../form-components/select-component"
import { useFetchApi } from "../../../hooks/useFetchApi"
import { values } from "lodash"

interface HoursProps {
  idSali: number
  day: number
}

export default function AvailableHours(props: HoursProps) {
  const { idSali, day } = props
  let allArr = [
    [10, 12],
    [12, 14],
    [14, 16],
    [16, 18],
  ]
  let dataG =
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useFetchApi(
      `http://localhost:8081/api/Wynajem/list/${idSali}/${day}`
    ) as any[]
  dataG = dataG.flat()
  console.log(dataG)
  allArr = allArr.filter(
    (el) => !dataG.includes(el[0]) || !dataG.includes(el[1])
  )
  const options = allArr.map((el) => ({
    value: el[0] + "-" + el[1],
    label: el[0] + "-" + el[1],
  }))
  console.log(allArr)
  return (
    <div>
      <SelectComponent name="godzina" options={options} />
    </div>
  )
}
