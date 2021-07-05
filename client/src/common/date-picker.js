import 'date-fns';
import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import ruLocale from "date-fns/locale/ru";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import {DATE_PICKER_TYPE} from "src/types/types"

const DatePicker = ({name, label='date', value, handleChange, variant='standard', ...rest}) => {

  const handleDateChange = (name) => (date) => {
    const event = {};
    event.target = {name, value: date, type: 'date'};
    handleChange(event)
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
      <KeyboardDatePicker
        // disableToolbar
        autoOk
        format="dd/MM/yyyy"
        id={`date-picker-inline-${name}`}
        label={label}
        value={value}
        onChange={handleDateChange(name)}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
        inputVariant={variant}
        {...rest}
        inputProps={{ readOnly: true, tabIndex:"-1" }}
        // TextFieldComponent={TextFieldComponent}
      />
    </MuiPickersUtilsProvider>
  );
}

DatePicker.propTypes = DATE_PICKER_TYPE
export default DatePicker;