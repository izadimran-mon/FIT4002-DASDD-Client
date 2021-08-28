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
  /**
   * State for number of entries displayed on each page
   */
  const [limit, setLimit] = useState(30);
  /**
   * State for total number of ads
   */
  const [totalNumberOfAd, setTotalNumberOfAd] = useState(0);
  /**
   * State to indicate error in page number input
   */
  const [errorBooleanForInput, setErrorBooleanForInput] = useState(false);
  /**
   * Error message to display
   */
  const [errorMessage, setErrorMessage] = useState("");
  /**
   * State to store total amount of pages
   */
  const [pageNumber, setPageNumber] = useState(0);
  /**
   * State to store all ads
   */
  const [ads, setAds] = useState<Ad[]>([]);
  /**
   * State for current page number
   */
  const [page, setPage] = useState(1);
  /**
   * Loading state for retrieving ads
   */
  const [loading, setLoading] = useState(false);
  /**
   * State for the bot filter
   */
  const [bots, setBots] = useState<Bot[]>(
    useLocation<stateType>()?.state?.bots || []
  ); // empty = no filter
  /**
   * State for storing all tags
   */
  const [tags, setTags] = useState<Tag[]>([]);

  /**
   * Open/closed state of bots filter selection dropdown
   */
  const [botsSelectOpen, setBotsSelectOpen] = useState(false);
  /**
   * Open/closed state of tags filter selection dropdown
   */
  const [tagsSelectOpen, setTagsSelectOpen] = useState(false);

  /**
   * State for all bots
   */
  const [allBots, setAllBots] = useState<Bot[]>([]);
  /**
   * State for all tags
   */
  const [allTags, setAllTags] = useState<Tag[]>([]);
  /**
   * Loading state for bots data
   */
  const [botsLoading, setBotsLoading] = useState(false);
  /**
   * Loading state for tags data
   */
  const [tagsLoading, setTagsLoading] = useState(false);

  /**
   * State for inputted bot name for filter
   */
  const [botsInputValue, setBotsInputValue] = useState("");
  /**
   * State for inputted tag name for filter
   */
  const [tagsInputValue, setTagsInputValue] = useState("");
  /**
   * Start date for date filter
   */
  const [startDate, setStartDate] = React.useState<Date | null>(null);
  /**
   * End date for date filter
   */
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

  useEffect(() => {
    setLoading(true);
    baseApi
      .get("/google/ads", {
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
        setAds(res.data.records);
        setTotalNumberOfAd(res.data.metadata.total_count);
        setPageNumber(Math.ceil(totalNumberOfAd / limit));
        setLoading(false);
        setErrorBooleanForInput(false);
        setErrorMessage("");
      });
  }, [page, limit, bots, tags, startDate, endDate, totalNumberOfAd]);

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  useEffect(() => {
    if (allBots.length) {
      return;
    }
    setBotsLoading(true);
    baseApi.get("/google/bots").then((res) => {
      setAllBots(res.data);
      setBotsLoading(false);
    });
  }, [botsSelectOpen, allBots]);

  useEffect(() => {
    if (allTags.length) {
      return;
    }
    setTagsLoading(true);
    baseApi.get("/google/tags").then((res) => {
      setAllTags(res.data);
      setTagsLoading(false);
    });
  }, [allTags.length]);

  const handleOnNewTagCreated = () => {
    baseApi.get("/google/tags").then((res) => {
      setAllTags(res.data);
      setTagsLoading(false);
    });
  };

  const enterKeyDown = (e: any) => {
    if (e.keyCode === 13) {
      if (
        !isNaN(e.target.value as any) &&
        e.target.value !== "" &&
        parseInt(e.target.value) >= 1 &&
        parseInt(e.target.value) <= pageNumber
      ) {
        console.log(e.target.value);
        localStorage.setItem("adsPage", JSON.stringify(e.target.value));
        setPage(parseInt(e.target.value));
        setErrorBooleanForInput(false);
        setErrorMessage("");
      } else {
        setErrorBooleanForInput(true);
        //setErrorMessage("Invalid Input.");
      }
    }
  };

  return (
    <div id='main'>
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: filterDrawerOpen,
        })}
      >
        <h1>Ads</h1>
        <Fade in={true}>
          <Grid container justify='space-between' style={{ marginBottom: 15 }}>
            <Button
              color='secondary'
              variant={filterDrawerOpen ? "outlined" : "contained"}
              aria-label='open filters menu'
              onClick={handleDrawerToggle}
            >
              <FilterListIcon />
              Filters
            </Button>
            <div
              style={{
                display: "inline-flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <TextField
                label='Page #'
                size='small'
                style={{ width: 120 }}
                variant='outlined'
                onKeyDown={enterKeyDown}
                error={errorBooleanForInput}
                helperText={errorMessage}
              />
              <Pagination
                count={pageNumber}
                page={page}
                onChange={handleChange}
                size='large'
              />
            </div>
          </Grid>
        </Fade>
        {loading
          ? Array(3)
              .fill(null)
              .map((_, i) => <AdCardSkeleton key={i} />)
          : ads.map((data, i) => {
              console.log(data);
              return (
                <AdCard
                  ad={data}
                  allTags={allTags}
                  onNewTagCreated={handleOnNewTagCreated}
                  key={i}
                />
              );
            })}
      </div>
      <Drawer
        className={classes.drawer}
        variant='persistent'
        anchor='right'
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
            <Typography variant='h6' style={{ fontWeight: "bold" }}>
              Filters
            </Typography>
          </span>
        </div>
        <Divider />
        <Accordion square>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Bots</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: "block" }}>
            <Autocomplete
              multiple
              id='tags-select'
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
                  label='Selected bots'
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color='inherit' size={20} />
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
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Tags</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: "block" }}>
            <Autocomplete
              multiple
              id='tags-select'
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
                  label='Selected tags'
                  variant='outlined'
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loading ? (
                          <CircularProgress color='inherit' size={20} />
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
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography>Date</Typography>
          </AccordionSummary>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify='space-around'>
              <KeyboardDatePicker
                style={{ marginLeft: 30, marginRight: 30 }}
                disableToolbar
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='date-picker-inline'
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
                label='Start date'
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
                variant='inline'
                format='dd/MM/yyyy'
                margin='normal'
                id='date-picker-inline'
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
                label='End date'
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
