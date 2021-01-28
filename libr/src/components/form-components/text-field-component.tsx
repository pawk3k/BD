import React from "react"
import { useForm, Controller } from "react-hook-form"
import TextField from "@material-ui/core/TextField"
interface SelectComponentProps {
  control?: any
  fieldsErrors: any
  name: string
  errors?: any
  // errors?: any
}

const TextFieldComponent = (props: SelectComponentProps) => {
  // const { control, handleSubmit } = useForm()
  const { errors: fieldsErrors } = useForm({})

  const { name } = props
  // const errors = fieldsErrors
  return (
    <TextField
      fullWidth
      id={name}
      helperText={fieldsErrors.name ? fieldsErrors.name.message : null}
      variant="outlined"
      label={name}
      error={fieldsErrors.name}
    />
  )
}
export default TextFieldComponent
