import React from 'react'
import { TextField } from '@mui/material'
import { IMaskInput } from 'react-imask'

interface CustomProps {
  onChange: (event: { target: { name: string, value: string } }) => void
  name: string
  value: any
  mask: string | RegExp
}

const TextMaskCustom = React.forwardRef<HTMLElement, CustomProps>(
  function TextMaskCustom (props, ref) {
    const { onChange, mask, value, ...other } = props

    return (
      <IMaskInput
        {...other}
        mask={mask}
        maskChar=""
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        value={value}
        overwrite
      />
    )
  }
)

interface TextFieldMaskProps {
  label: string
  placeholder?: string
  name: string
  value: string
  margin?: 'none' | 'normal' | 'dense'
  id: string
  autoComplete?: string
  fullWidth: boolean
  sx?: any
  mask: string | RegExp
  required?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
  shrink?: boolean
  helperText?: string
  error?: boolean
  inputProps?: object
}

const TextFieldMask: React.FC<TextFieldMaskProps> = ({
  sx,
  id,
  mask,
  label,
  name,
  value,
  margin = 'none',
  fullWidth,
  autoComplete,
  required,
  placeholder,
  onChange,
  shrink,
  inputProps,
  ...rest
}) => {
  return (
    <TextField
      variant="outlined"
      margin={margin}
      fullWidth={fullWidth}
      sx={sx}
      value={value}
      onChange={onChange}
      name={name}
      id={`${id}-input`}
      autoComplete={autoComplete}
      label={label}
      required={required}
      placeholder={placeholder}
      InputProps={{
        inputComponent: TextMaskCustom as any,
        inputProps: { mask: mask, ...inputProps }
      }}
      InputLabelProps={{ shrink: shrink }}
      {...rest}
    />
  )
}

export default TextFieldMask
