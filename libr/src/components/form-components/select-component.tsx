import React from "react"
import Select from "react-select"
import { useForm, Controller } from "react-hook-form"
import Input from "@material-ui/core/Input"

export const SelectComponent = () => {
  const { control, handleSubmit } = useForm()

  const onSubmit = (data: unknown) => {
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="firstName"
        control={control}
        defaultValue=""
        render={({ onChange, value }) => (
          <input onChange={onChange} value={value} />
        )}
      />
      <Controller
        name="iceCreamType"
        control={control}
        options={[
          { value: "chocolate", label: "Chocolate" },
          { value: "strawberry", label: "Strawberry" },
          { value: "vanilla", label: "Vanilla" },
        ]}
        as={Select}
      />
      <input type="submit" />
    </form>
  )
}
