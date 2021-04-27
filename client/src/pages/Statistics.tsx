import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import { getBotAlignmentStats } from "../api/api";
import AdCountLineChart from "../components/AdCountLineChart";
import BotAlignmentPieChart from "../components/BotAlignmentPieChart";
import CategoryTreeMapChart from "../components/CategoryTreeMapChart";
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

const mockAdStat = [
  {
    header: "Total",
    content: 449,
  },
  {
    header: "Tagged",
    content: 426,
  },
  {
    header: "Average ads per bot",
    content: 33,
  },
  {
    header: "Total scraping uptime",
    content: "850h 8m",
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
  const [botPoliticalAlignmentData, setBotPoliticalAlignmentData] = useState(
    []
  );
  const [botGenderAlignmentData, setBotGenderAlignmentData] = useState([]);

  useEffect(() => {
    getBotAlignmentStats().then((res) => {
      for (const e of res) {
        const data = e.data.map((element: any) => ({
          count: parseFloat(element.count),
          label: element.label,
        }));
        // TODO: type checking and avoid hard-coded values?
        switch (e.type) {
          case "political ranking":
            setBotPoliticalAlignmentData(data);
            break;

          case "gender":
            setBotGenderAlignmentData(data);
            break;

          default:
            break;
        }
      }
    });
  }, []);

  const onClickMonth = (value: Date) => {
    console.log(value);
    // TODO: fetch new data based on the selected month
    setSelectedMonth(value);
  };
  const botPieChart1 = (
    <Paper className={classes.paper}>
      <BotAlignmentPieChart
        data={botPoliticalAlignmentData}
        title="Bot alignment by political beliefs"
      />
    </Paper>
  );

  const botPieChart2 = (
    <Paper className={classes.paper}>
      <BotAlignmentPieChart
        data={botGenderAlignmentData}
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
            <Box display="flex" justifyContent="flex-end" m={1} p={1}>
              <Box p={1}>
                <MonthPicker onClickMonth={onClickMonth} date={selectedMonth} />
              </Box>
            </Box>
            <AdCountLineChart data={mockAdCountData} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          {mockAdStat.map((e) => (
            <Box p={1}>
              <AdStatRow header={e.header} content={e.content} />
            </Box>
          ))}
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

type AdStatRowProp = {
  header: string;
  content: string | number;
};
const AdStatRow = (props: AdStatRowProp) => {
  return (
    <>
      <Paper>
        <Typography variant="h6">{props.header}</Typography>
        <Typography variant="h4">{props.content}</Typography>
      </Paper>
    </>
  );
};

export default Statistics;
