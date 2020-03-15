import React, { FC, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import FnsUtils from '@date-io/date-fns';

export const Form: FC<{}> = () => {
  // TODO: Setup Redux for date handling
  const [selectedDate, handleDateChange] = useState<Date>(new Date());
  return (
    <form noValidate autoComplete="off" onSubmit={() => console.log('SUBMITED!')}>
      <TextField id="name" label="Name" />
      <TextField id="surname" label="Surname" />
      <TextField id="email" label="Email" type="email" />
      <MuiPickersUtilsProvider utils={FnsUtils}>
        <DatePicker onChange={handleDateChange} value={selectedDate} />
      </MuiPickersUtilsProvider>
      <Button type="submit" color="primary" variant="contained">
        Create Event
      </Button>
    </form>
  );
};
