import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
import BotAlignmentPieChart from "../components/BotAlignmentPieChart";
import CategoryTreeMapChart from "../components/CategoryTreeMapChart";
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

  return (
    <div id="main">
      <h1>Statistics</h1>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <BotAlignmentPieChart
              data={mockBotAlignmentData}
              title="Bot alignment by political beliefs"
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <BotAlignmentPieChart
              data={mockBotAlignmentData2}
              title="Bot alignment by age groups"
            />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            <CategoryTreeMapChart data={mockCategoryData} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Statistics;
