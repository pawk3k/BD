import React from "react"
import { TextField } from "@material-ui/core"
import { useFormContext, Controller, useController } from "react-hook-form"

interface TextFieldComponentProps {
  nameP: string
}

function DataPickerComponent(props: TextFieldComponentProps) {
  const { control, errors: fieldsErrors } = useFormContext()
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, "0")
  const mm = String(today.getMonth() + 1).padStart(2, "0") //January is 0!
  const yyyy = today.getFullYear()

  const endDay = today

  endDay.setDate(endDay.getDate() + parseInt("7"))
  const dd1 = String(endDay.getDate()).padStart(2, "0")
  const mm1 = String(endDay.getMonth() + 1).padStart(2, "0") //January is 0!
  const yyyy1 = endDay.getFullYear()
  const todayFormated = yyyy + "-" + mm + "-" + dd
  const endDayFormated = yyyy1 + "-" + mm1 + "-" + dd1

  const { nameP } = props
  const {
    field: { ref, ...inputProps },
  } = useController({
    name: nameP,
    control,
    defaultValue: "",
  })
  return (
    <TextField
      {...inputProps}
      inputRef={ref}
      defaultValue={yyyy + "-" + mm + "-" + dd}
      id={nameP}
      type="date"
      InputProps={{ inputProps: { min: todayFormated, max: endDayFormated } }}
      variant="outlined"
      label={nameP}
      InputLabelProps={{
        shrink: true,
      }}
      error={fieldsErrors[nameP]}
    />
  )
}
export default DataPickerComponent
