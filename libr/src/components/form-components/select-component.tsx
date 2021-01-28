import React from "react"
import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import Input from "@material-ui/core/Input"
interface SelectComponentProps {
  control: any
  name: string
  options: any[]
}

export const SelectComponent = (props: SelectComponentProps) => {
  // const { control, handleSubmit } = useForm()
  const { control, name, options } = props
  return (
    <div>
      <Controller
        name={name}
        placeholder={name}
        control={control}
        as={Select}
        options={options}
      />
    </div>
  )
}
