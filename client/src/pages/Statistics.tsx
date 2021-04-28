import { Box, Grid, makeStyles, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import "react-calendar/dist/Calendar.css";
import {
  getAdCategoryStats,
  getAdCountStats,
  getAdStats,
  getBotAlignmentStats,
} from "../api/api";
import AdCountLineChart from "../components/AdCountLineChart";
import BotAlignmentPieChart from "../components/BotAlignmentPieChart";
import CategoryTreeMapChart from "../components/CategoryTreeMapChart";
import MonthPicker from "../components/MonthPicker";

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
  const [botPoliticalAlignmentData, setBotPoliticalAlignmentData] = useState<
    any[]
  >([]);
  const [botGenderAlignmentData, setBotGenderAlignmentData] = useState<any[]>(
    []
  );
  const [adCategoryData, setAdCategoryData] = useState<any[]>([]);
  const [adCountData, setAdCountData] = useState<any[]>([]);
  const [adStatData, setAdStatData] = useState<any[]>([]);

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

    getAdCategoryStats().then((res) => {
      if (!res) return;
      const data = res.map((element: any) => ({
        count: parseFloat(element.count),
        label: element.label,
      }));
      setAdCategoryData(data);
    });

    getAdStats().then((res) => {
      if (!res) return;
      const data = [
        {
          header: "Total",
          content: res.adTotal,
        },
        {
          header: "Tagged",
          content: res.adTagged,
        },
        {
          header: "Average ads per bot",
          content: res.adPerBot,
        },
        {
          header: "Total scraping uptime",
          content: res.uptime ? res.uptime : "N/A",
        },
      ];

      setAdStatData(data);
    });
  }, []);

  useEffect(() => {
    getAdCountStats(selectedMonth.getTime()).then((res) => {
      if (!res) return;
      const data = res.map((element: any) => ({
        count: parseFloat(element.count),
        date: new Date(element.date).getTime(),
      }));

      setAdCountData(data);
    });
  }, [selectedMonth]);

  const onClickMonth = (value: Date) => {
    console.log(value);
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
        title="Bot alignment by gender"
      />
    </Paper>
  );

  const categoryChart = (
    <Paper className={classes.paper}>
      <CategoryTreeMapChart data={adCategoryData} />
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
            <AdCountLineChart data={adCountData} />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          {adStatData.map((e) => (
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
        <Typography variant="h4">
          {typeof props.content === "number"
            ? Math.floor(props.content)
            : props.content}
        </Typography>
      </Paper>
    </>
  );
};

export default Statistics;
