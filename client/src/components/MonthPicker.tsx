import React, { useState } from "react";
import {
  DatePicker,
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

// import Calendar from "react-calendar";

const MonthPicker = (props: any) => {
  const [selectedDate, setSelectedDate] = useState(props.date);

  const handleDateChange = (value: MaterialUiPickersDate) => {
    setSelectedDate(value);
    props.onClickMonth(value);
  };

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          variant="inline"
          openTo="month"
          views={["year", "month"]}
          value={selectedDate}
          onChange={handleDateChange}
          onMonthChange={handleDateChange}
          allowKeyboardControl={false}
        />
      </MuiPickersUtilsProvider>
    </>
  );
};

export default MonthPicker;
