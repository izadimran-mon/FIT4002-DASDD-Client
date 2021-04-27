import { Grid, makeStyles, Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import AdCountLineChart from "../components/AdCountLineChart";
import BotAlignmentPieChart from "../components/BotAlignmentPieChart";
import CategoryTreeMapChart from "../components/CategoryTreeMapChart";
import Calendar, { YearView } from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MonthPicker from "../components/MonthPicker";

// TODO: replace with data from API call
const mockCategoryData = [
  {
    id: 1,
    name: "Technology",
    count: 349,
  },
  {
    id: 2,
    name: "Food",
    count: 1893,
  },
  {
    id: 3,
    name: "Entertainments",
    count: 600,
  },
  {
    id: "null",
    name: "Uncategorised",
    count: 6000,
  },
];

const mockBotAlignmentData = [
  {
    label: "right",
    count: 9,
  },
  {
    label: "left",
    count: 11,
  },
  {
    label: "neutral",
    count: 6,
  },
];

const mockBotAlignmentData2 = [
  {
    label: "15-25",
    count: 2,
  },
  {
    label: "25-35",
    count: 8,
  },
  {
    label: "35-45",
    count: 6,
  },
  {
    label: "45-55",
    count: 6,
  },
  {
    label: "55+",
    count: 2,
  },
];

const mockAdCountData = [
  {
    date: new Date("2021-04-27").getTime(),
    count: 30,
  },
  {
    date: new Date("2021-04-28").getTime(),
    count: 21,
  },
  {
    date: new Date("2021-04-29").getTime(),
    count: 36,
  },
  {
    date: new Date("2021-04-30").getTime(),
    count: 45,
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

const Statistics = () => {
  const classes = useStyles();
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const onClickMonth = (value: Date) => {
    setSelectedMonth(value);
    console.log(value);
  };
  const botPieChart1 = (
    <Paper className={classes.paper}>
      <BotAlignmentPieChart
        data={mockBotAlignmentData}
        title="Bot alignment by political beliefs"
      />
    </Paper>
  );

  const botPieChart2 = (
    <Paper className={classes.paper}>
      <BotAlignmentPieChart
        data={mockBotAlignmentData2}
        title="Bot alignment by age groups"
      />
    </Paper>
  );

  const categoryChart = (
    <Paper className={classes.paper}>
      <CategoryTreeMapChart data={mockCategoryData} />
    </Paper>
  );

  const adsScrapedChart = (
    <Paper className={classes.paper}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <MonthPicker onClickMonth={onClickMonth} date={selectedMonth} />
            <AdCountLineChart data={mockAdCountData} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper}></Paper>
        </Grid>
      </Grid>
    </Paper>
  );

  return (
    <div id="main">
      <h1>Statistics</h1>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          {botPieChart1}
        </Grid>
        <Grid item xs={3}>
          {botPieChart2}
        </Grid>
        <Grid item xs={6}>
          {categoryChart}
        </Grid>
        <Grid item xs={12}>
          {adsScrapedChart}
        </Grid>
      </Grid>
    </div>
  );
};

export default Statistics;
