import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import FilterListIcon from "@material-ui/icons/FilterList";
import MailIcon from "@material-ui/icons/Mail";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { baseApi } from "../api/api";
import AdCard from "../components/AdCard";
import AdCardSkeleton from "../components/AdCardSkeleton";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import clsx from "clsx";

interface stateType {
  bots: string[];
}
const drawerWidth = 240;

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

  const [bots, setBots] = useState<string[]>(
    useLocation<stateType>()?.state?.bots || []
  ); //empty = no filter

  const classes = useStyles();
  const theme = useTheme();
  const [filterDrawerOpen, setFilterDrawerOpen] = React.useState(false);

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
    const botParam = bots.reduce((a, b) => a + `&bots=${b}`, "");
    baseApi
      .get(`/ads?offset=${(page - 1) * limit}&limit=${limit}` + botParam)
      .then((res: any) => {
        setAds(res.data);
        setLoading(false);
      });
  }, [page, limit, bots]);

  const handleChange = (event: any, value: number) => {
    localStorage.setItem("adsPage", JSON.stringify(value));
    setPage(value);
  };
  console.log(ads);
  return (
    <div id="main">
      <div
        className={clsx(classes.content, {
          [classes.contentShift]: filterDrawerOpen,
        })}
      >
        <h1>Ads</h1>
        <Fade in={true}>
          <Grid container justify="flex-end" style={{ marginBottom: 15 }}>
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
        </div>
        <Divider />
        <List>
          {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Ads;
