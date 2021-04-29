import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import "./styles/AdCard.css";
import AdChip from "./AdChip";
import {
  Grid,
  Card,
  Typography,
  Button,
  Dialog,
  DialogContent,
  CardActionArea,
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    /*  root: {
      justifyContent: "center",
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(1),
        width: theme.spacing(150),
        height: theme.spacing(50),
      },
    }, */
  })
);

const processLink = (link: string) => {
  if (link) {
    let link_split = link.split("/");
    let domain = link_split[2];
    if (domain) {
      let prefix = domain.split(".");
      if (prefix[0].toLowerCase() === "www") {
        prefix.shift();
      }
      domain = prefix.join(".");
    }

    return domain;
  }
};

const ImageDialog = (props: any) => {
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby='simple-dialog-title'
      open={props.open}
    >
      <DialogContent>
        <img
          style={{
            width: "auto",
            height: "100%",
          }}
          src={props.image}
          alt='Ad screenshot full'
        />
      </DialogContent>
    </Dialog>
  );
};

const AdCard = (props: any) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();
  return (
    <Card style={{ height: 350, marginBottom: 20, padding: 15 }}>
      <Grid container style={{ height: "100%" }}>
        <Grid
          item
          xs={4}
          style={{
            maxHeight: 350,
            background: "#f7f7f7",
          }}
        >
          {" "}
          <CardActionArea style={{ height: "100%" }}>
            <img
              style={{
                width: "auto",
                height: "auto",
                maxWidth: 300,
                maxHeight: 320,
              }}
              src={props.image}
              alt='Ad screenshot'
              onClick={() => {
                handleClickOpen();
              }}
            />{" "}
          </CardActionArea>
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            style={{ height: "100%", marginLeft: 15, width: "auto" }}
          >
            <Grid container direction='row' style={{ height: "42%" }}>
              <Grid item xs={6}>
                {props.headline ? (
                  <div>
                    <Tooltip
                      title={
                        <Typography>{`https://${props.headline}`}</Typography>
                      }
                    >
                      <Button
                        variant='contained'
                        color='primary'
                        href={`https://${props.headline} `}
                        target='_blank'
                        rel='noreferrer'
                      >
                        Goto Ad Link
                      </Button>
                    </Tooltip>
                  </div>
                ) : (
                  <Typography style={{ fontSize: 18, fontWeight: 600 }}>
                    {" "}
                    No Link Available
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                {" "}
                <Typography style={{ marginTop: 5 }}>
                  {" "}
                  <span style={{ fontWeight: "bold" }}>Date:</span>{" "}
                  {moment(props.createdAt).format("YYYY-MMM-D dddd h:mma")}{" "}
                </Typography>
                <Typography style={{ marginTop: 5 }}>
                  <span style={{ fontWeight: "bold" }}>Seen bot:</span>{" "}
                  {props.botId}
                </Typography>
                {props.seenOn ? (
                  <div>
                    <Grid container style={{ marginTop: 5 }}>
                      <Grid item>
                        <Typography style={{ fontWeight: "bold" }}>
                          Seen on:{" "}
                        </Typography>
                      </Grid>{" "}
                      <Grid item>
                        {" "}
                        <Tooltip
                          title={<Typography>{props.seenOn}</Typography>}
                        >
                          <Button
                            variant='contained'
                            style={{
                              background: "#167070",
                              marginLeft: 10,
                              padding: 2,
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                            href={props.seenOn}
                            target='_blank'
                            rel='noreferrer'
                          >
                            {" "}
                            <Typography
                              style={{
                                color: "#fff",
                                textTransform: "lowercase",
                                fontSize: 14,
                              }}
                            >
                              {" "}
                              {processLink(props.seenOn)}
                            </Typography>
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>{" "}
                  </div>
                ) : (
                  <Typography> No Link</Typography>
                )}
              </Grid>
            </Grid>{" "}
            <Grid container direction='row' style={{ height: "58%" }}>
              <Grid
                item
                xs={12}
                style={{
                  border: "1px solid #b2b2b2",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <div>{<AdChip />}</div>
              </Grid>{" "}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ImageDialog image={props.image} open={open} handleClose={handleClose} />
    </Card>
  );
};

// const AdCard: React.FC<Ad> = (props) => {
//     const classes = useStyles();
//     return (
//       <div className={classes.root}>
//         <Paper elevation={3}>
//             <div className="overallDivStyle">
//               <section className="imageSection">
//                 <img className="imageStyle" src={props.file} alt="Ad screenshot"/>
//               </section>
//               <section className="mainSection">
//                 <div className="headlineDiv">
//                   <a className="headlineStyle" href={props.headline}>{props.headline}</a>
//                 </div>
//               </section>
//               <section className="sideSection">
//                 <p className="dateStyle"> Date: {moment(props.dateTime).format("YYYY-MMM-D dddd h:mma")} </p>
//                 <p className="botStyle">Seen bot: {props.bot}</p>
//                 <p className="seenOnStlye">Seen on: <a href={props.seenOn}>{props.seenOn}</a></p>
//               </section>
//               <section className="categorySection">
//                 <div className="cardStyle">
//                   <AdChip {...props}/>
//                 </div>
//               </section>
//                 <div>

//                 </div>
//                 {/* <div className="middleBlock">
//                   <p className="botStyle">Bot: {props.bot}</p>
//                   <a className="headlineStyle" href={props.headline}>{props.headline}</a>
//                 </div>
//                 <div>
//                   <p className="dateStyle"> Date: {moment(props.dateTime).format("YYYY-MMM-D dddd h:mma")} </p>
//                   <p className="seenOnStlye">Seen on: <a href={props.seenOn}>{props.seenOn}</a></p>
//                 </div>

//                 <div className="AdChipStyle">
//                   <AdChip {...props}/>
//                 </div> */}
//             </div>
//         </Paper>
//       </div>
//     );
//   }

export default AdCard;
