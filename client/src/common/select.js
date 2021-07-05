import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import { SELECT_TYPE } from 'src/types/types'

const Select = ({
  name,
  label,
  options,
  option_label,
  option_value,
  value,
  placeholder,
  required = false,
  handleChange,
  ...rest
}) => {
  const handleSelectChange = (name) => (_, value) => {
    const event = {}
    event.target = { name, value, type: 'autocomplete' }
    handleChange(event, value)
  }

  return (
    <Autocomplete
      {...rest}
      id={`combo-box-${name}`}
      name={name}
      value={value}
      options={options}
      getOptionLabel={(option) => option[option_label]}
      getOptionSelected={(option, value) =>
        option[option_value] === value[option_value]
      }
      onChange={handleSelectChange(name)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          placeholder={placeholder}
        />
      )}
      autoHighlight
    />
  )
}

Select.propTypes = SELECT_TYPE
export default Select
