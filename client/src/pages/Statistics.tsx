import { Grid, makeStyles, Paper } from "@material-ui/core";
import React from "react";
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
        <Grid item xs={3}></Grid>
        <Grid item xs={3}></Grid>
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
