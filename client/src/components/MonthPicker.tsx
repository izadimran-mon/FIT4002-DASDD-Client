import React, { useState } from "react";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";

// import Calendar from "react-calendar";

const MonthPicker = (props: any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedDate, setSelectedDate] = useState(props.date);

  const handleDateChange = (value: MaterialUiPickersDate) => {
    setSelectedDate(value);
    console.log(value);
    props.onClickMonth(value);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
          variant="inline"
          openTo="month"
          views={["year", "month"]}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </MuiPickersUtilsProvider>
      {/* <Button aria-describedby={id} variant="contained" onClick={handleClick}>
        Open Popover
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Calendar
          maxDetail={"year"}
          onClickMonth={handleClickMonth}
          value={date}
        />
      </Popover> */}
    </>
  );
};

export default MonthPicker;
