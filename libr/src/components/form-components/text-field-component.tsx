import React from "react"
import { TextField } from "@material-ui/core"
import { useFormContext, Controller, useController } from "react-hook-form"

interface TextFieldComponentProps {
  nameP: string
}

function TextFeildComponent(props: TextFieldComponentProps) {
  const { control, errors: fieldsErrors } = useFormContext()
  const { nameP } = props
  const {
    field: { ref, ...inputProps },
  } = useController({
    name: nameP,
    control,
    rules: {
      required: true,
      pattern: {
        value: /^\d+$/,
        message: "Niepoprawne id",
      },
    },
    defaultValue: "",
  })
  return (
    <TextField
      {...inputProps}
      inputRef={ref}
      fullWidth
      id={nameP}
      helperText={fieldsErrors[nameP] ? fieldsErrors[nameP].message : null}
      variant="outlined"
      label={nameP}
      error={fieldsErrors[nameP]}
    />
  )
}
export default TextFeildComponent
