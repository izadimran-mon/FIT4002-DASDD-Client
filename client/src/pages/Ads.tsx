import {
  createStyles,
  makeStyles,
  Theme,
  Accordion,
  Grid,
  AccordionDetails,
  AccordionSummary,
  Button,
  CircularProgress,
  Divider,
  Drawer,
  Fade,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FilterListIcon from "@material-ui/icons/FilterList";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Pagination from "@material-ui/lab/Pagination";
import ClearIcon from "@material-ui/icons/Clear";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseApi } from "../api/api";
import AdCard from "../components/AdCard";
import AdCardSkeleton from "../components/AdCardSkeleton";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

interface stateType {
  bots: Bot[];
}
const drawerWidth = 300;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    title: {
      flexGrow: 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      justifyContent: "flex-start",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: 0,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
  })
);

const Ads = () => {
  //let storedPageNumber = localStorage.getItem("adsPage");
  const [limit, setLimit] = useState(30);
  const [ads, setAds] = useState<Ad[]>([]);
  const [page, setPage] = useState(
    1 //storedPageNumber ? JSON.parse(storedPageNumber) : 1
  );
  const [loading, setLoading] = useState(false);

  const [bots, setBots] = useState<Bot[]>(
    useLocation<stateType>()?.state?.bots || []
  ); // empty = no filter

  const [tags, setTags] = useState<Tag[]>([]);

  const [botsSelectOpen, setBotsSelectOpen] = useState(false);
  const [tagsSelectOpen, setTagsSelectOpen] = useState(false);
  const [allBots, setAllBots] = useState<Bot[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [botsLoading, setBotsLoading] = useState(false);
  const [tagsLoading, setTagsLoading] = useState(false);

  const [botsInputValue, setBotsInputValue] = useState("");
  const [tagsInputValue, setTagsInputValue] = useState("");

  const [startDate, setStartDate] = React.useState<Date | null>(null);
  const [endDate, setEndDate] = React.useState<Date | null>(null);

  const handleStartDateChange = (date: Date | null) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const classes = useStyles();
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setFilterDrawerOpen(!filterDrawerOpen);
  };

  // useEffect(() => {
  //   axios.get(`/ads?offset${(page-1)*limit}&limit${limit}`).then((res: any) => {
  //     setAds(res.data);
  //   });
  // }, []);

  useEffect(() => {
    setLoading(true);
    // const botParam = bots.reduce((a, b) => a + `&bots=${b.id}`, "");
    // const tagParam = tags.reduce((a, b) => a + `&tag=${b.name}`, "");
    baseApi
      .get("/ads", {
        params: {
          offset: (page - 1) * limit,
          limit: limit,
          bots: bots.map((a) => a.id),
          tag: tags.map((a) => a.name),
          startDate: startDate?.getTime(),
          endDate: endDate?.getTime(),
        },
      })
      .then((res: any) => {
        setAds(res.data);
        setLoading(false);
      });
  }, [page, limit, bots, tags, startDate, endDate]);

  const handleChange = (event: any, value: number) => {
    localStorage.setItem("adsPage", JSON.stringify(value));
    setPage(value);
  };

  useEffect(() => {
    if (allBots.length) {
      return;
    }
    setBotsLoading(true);
    baseApi.get("/bots").then((res) => {
      setAllBots(res.data);
      setBotsLoading(false);
    });
  }, [botsSelectOpen, allBots]);

  useEffect(() => {
    if (allTags.length) {
      return;
    }
    setTagsLoading(true);
    baseApi.get("/tags").then((res) => {
      setAllTags(res.data);
      setTagsLoading(false);
    });
  }, []);

  return (
    <div id="main">
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: filterDrawerOpen,
        })}
      >
        <h1>Ads</h1>
        <Fade in={true}>
          <Grid container justify="space-between" style={{ marginBottom: 15 }}>
            <Button
              color="secondary"
              variant={filterDrawerOpen ? "outlined" : "contained"}
              aria-label="open filters menu"
              onClick={handleDrawerToggle}
            >
              <FilterListIcon />
              Filters
            </Button>
            <Pagination
              count={Math.ceil(90000 / limit)} //replace with total ad count
              page={page}
              onChange={handleChange}
              size="large"
            />
          </Grid>
        </Fade>
        {loading
          ? Array(3)
              .fill(null)
              .map((_, i) => <AdCardSkeleton key={i} />)
          : ads.map((data, i) => {
              return <AdCard {...data} key={i} />;
            })}
        {/* <Grid container justify="flex-end">
        <Pagination
          count={Math.ceil(ads.length / limit)}
          page={page}
          onChange={handleChange}
          size="large"
        />
      </Grid> */}
      </div>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={filterDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerToggle}>
            <ChevronRightIcon />
          </IconButton>
          <span>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              Filters
            </Typography>
          </span>
        </div>
        <Divider />
        <Accordion square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Bots</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: "block" }}>
            <Autocomplete
              multiple
              id="tags-select"
              open={botsSelectOpen}
              onOpen={() => {
                setBotsSelectOpen(true);
              }}
              onClose={() => {
                setBotsSelectOpen(false);
              }}
              onChange={(event: any, newValue: Bot[] | null) => {
                if (newValue) setBots(newValue);
              }}
              filterSelectedOptions
              getOptionSelected={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.username}
              options={allBots}
              value={bots}
              inputValue={botsInputValue}
              onInputChange={(_, newInputValue) => {
                setBotsInputValue(newInputValue);
              }}
              loading={botsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selected bots"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Tags</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: "block" }}>
            <Autocomplete
              multiple
              id="tags-select"
              open={tagsSelectOpen}
              onOpen={() => {
                setTagsSelectOpen(true);
              }}
              onClose={() => {
                setTagsSelectOpen(false);
              }}
              onChange={(event: any, newValue: Tag[] | null) => {
                if (newValue) setTags(newValue);
              }}
              filterSelectedOptions
              getOptionSelected={(option, value) => option.id === value.id}
              getOptionLabel={(option) => option.name}
              options={allTags}
              value={tags}
              inputValue={tagsInputValue}
              onInputChange={(_, newInputValue) => {
                setTagsInputValue(newInputValue);
              }}
              loading={tagsLoading}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Selected tags"
                  variant="outlined"
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color="inherit" size={20} />
                        ) : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
          </AccordionDetails>
        </Accordion>
        <Accordion square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Date</Typography>
          </AccordionSummary>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                style={{ marginLeft: 30, marginRight: 30 }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                disableFuture={true}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setStartDate(null)}>
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
                InputAdornmentProps={{
                  position: "start",
                }}
                label="Start date"
                value={startDate}
                maxDate={endDate ? endDate : new Date()}
                onChange={handleStartDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
              <KeyboardDatePicker
                style={{ marginLeft: 30, marginRight: 30 }}
                disableToolbar
                variant="inline"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                disableFuture={true}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setEndDate(null)}>
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
                InputAdornmentProps={{
                  position: "start",
                }}
                minDate={startDate ? startDate : new Date("1900-01-01")}
                label="End date"
                value={endDate}
                onChange={handleEndDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
        </Accordion>
      </Drawer>
    </div>
  );
};

export default Ads;
