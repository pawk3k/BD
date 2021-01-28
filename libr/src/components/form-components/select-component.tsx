import React from "react"
import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import Input from "@material-ui/core/Input"
interface SelectComponentProps {
  control: any
  name: string
}

export const SelectComponent = (props: SelectComponentProps) => {
  // const { control, handleSubmit } = useForm()
  const { control, name } = props
  return (
    <div>
      <Controller
        name={name}
        placeholder={name}
        control={control}
        options={[
          { value: "K", label: "Ksiazka" },
          { value: "A", label: "Artukul" },
          { value: "C", label: "Czasopismo" },
        ]}
        as={Select}
      />
    </div>
  )
}
