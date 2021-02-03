import React, { useEffect, useState, useRef, RefObject } from "react"
import Select from "react-select"
import { useForm, useController, useFormContext } from "react-hook-form"
import Input from "@material-ui/core/Input"

interface SelectComponentProps {
  control?: any
  name: string
  options: any[]
  value?: any
}

export const SelectComponent = (props: SelectComponentProps) => {
  // const { control, handleSubmit } = useForm()
  const { name, options } = props
  const { control } = useFormContext()
  const {
    field: { ref, ...inputProps },
  } = useController({
    control,
    defaultValue: null,
    name: name,
  })
  // const { reset, setValue } = useForm()
  const { setValue, reset } = useFormContext()
  // const [value1, setValue] = useState<null>(null)
  useEffect(() => {
    // console.log("kek")
    // return reset()
    // return setValue(name, { value: null, label: null })
  }, [])
  return (
    <Select
      placeholder={name}
      {...inputProps}
      inputRef={ref}
      color="primary"
      options={options}
      ref={ref}
      key={`my_unique_select_key__${name}`}
      isClearable
      isSearchable={false}
      // defaultValue={null}
    />
  )
}

export default React.forwardRef(SelectComponent)
