import React, { useEffect, useState, useRef, RefObject } from "react"
import Select from "react-select"
import {
  useForm,
  Controller,
  useController,
  useFormContext,
} from "react-hook-form"
import Input from "@material-ui/core/Input"

interface SelectComponentProps {
  control: any
  name: string
  options: any[]
  value?: any
}

export const SelectComponent = (props: SelectComponentProps, ref: any) => {
  // const { control, handleSubmit } = useForm()
  const { control, name, options, value } = props
  // const { reset, setValue } = useForm()
  const { setValue, reset } = useFormContext()
  // const [value1, setValue] = useState<null>(null)
  useEffect(() => {
    // console.log("kek")
    // return reset()
    // return setValue(name, { value: null, label: null })
  }, [])
  return (
    <div>
      <Controller
        name={name}
        placeholder={name}
        control={control}
        defaultValue={null}
        as={
          <Select
            ref={ref}
            key={`my_unique_select_key__${name}`}
            isClearable
            isSearchable={false}
            // defaultValue={null}
          />
        }
        // value={null}
        options={options}
      />
    </div>
  )
}

export default React.forwardRef(SelectComponent)
