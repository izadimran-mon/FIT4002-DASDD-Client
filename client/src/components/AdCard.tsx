import {
  Button,
  Card,
  CardActionArea,
  Dialog,
  DialogContent,
  Grid,
  Typography,
} from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
import moment from "moment";
import React, { useState } from "react";
import AdChip from "./AdChip";
import BotDetails from "./BotDetails";
import SearchTerms from "./SearchTerms";
import "./styles/AdCard.css";

/**
 * Extracts the domain of a URL from the link.
 * @param link - the link to process
 * @returns domain - the domain of the URL, as a string
 */
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

interface ImageDialogProps {
  image: string;
  open: boolean;
  handleClose: () => void;
}

/**
 * Popup dialog for ad image (screenshots)
 */
const ImageDialog = (props: ImageDialogProps) => {
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.open}
    >
      <DialogContent>
        <img
          style={{
            width: "auto",
            height: "100%",
          }}
          src={props.image}
          alt="Ad screenshot full"
        />
      </DialogContent>
    </Dialog>
  );
};

type AdCardProp = {
  /**
   * The ad to display the card for
   */
  ad: Ad;
  /**
   * A list of all tags in the system
   */
  allTags: Tag[];
  /**
   * A callback function to handle creating a new tag
   */
  onNewTagCreated?: () => void;
};

/**
 * An individual 'card' displayed for each ad on the Ad page (Ad.tsx)
 */
const AdCard = (props: AdCardProp) => {
  const { ad, allTags, onNewTagCreated } = props;
  /**
   * The state (open/closed) of the image (screenshot) popup dialog
   */
  const [open, setOpen] = useState(false);
  /**
   * The state (open/closed) of the bot details popup dialog
   */
  const [openDetails, setOpenDetails] = React.useState(false);
  /**
   * The state (open/closed) of the bot search terms popup dialog
   */
  const [openTerms, setOpenTerms] = React.useState(false);
  /**
   * State for initialising search terms
   */
  const [terms, setTerms] = React.useState<string[]>([]);
  /**
   * State for initialising the title for search terms
   */
  const [title, setTitle] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseDetails = () => {
    setOpenDetails(false);
  };
  const handleCloseTerms = () => {
    setOpenTerms(false);
  };
  const displayTerms = (terms: string[], title: string) => {
    setTerms(terms);
    setTitle(title);
    setOpenTerms(true);
  };

  return (
    <Card className="cardStyle">
      <Grid container className="overallContainerStyle">
        <Grid
          item
          xs={4}
          style={{
            maxHeight: 350,
            background: "#f7f7f7",
          }}
        >
          <CardActionArea
            className="cardActionAreaStyle"
            onClick={() => {
              handleClickOpen();
            }}
          >
            <img className="imageStyle" src={ad.image} alt="Ad screenshot" />
          </CardActionArea>
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            style={{ height: "100%", marginLeft: 15, width: "auto" }}
          >
            <Grid container direction="row" className="adLinkContainerStyle">
              <Grid item xs={6}>
                {ad.headline ? (
                  <div>
                    <Tooltip
                      title={
                        <Typography>{`https://${ad.headline}`}</Typography>
                      }
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        href={`https://${ad.headline} `}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Visit Ad Link
                      </Button>
                    </Tooltip>
                  </div>
                ) : (
                  <Typography style={{ fontSize: 18, fontWeight: 600 }}>
                    No Link Available
                  </Typography>
                )}
              </Grid>
              <Grid item xs={6}>
                <Typography style={{ marginTop: 5 }}>
                  <span style={{ fontWeight: "bold" }}>Date: </span>
                  {moment(ad.createdAt).format("YYYY-MMM-D dddd h:mma")}
                </Typography>
                <Tooltip
                  title={
                    <>
                      <Typography>
                        Political ranking: {ad.bot.politicalRanking}
                      </Typography>
                      <Typography>
                        Other terms: {ad.bot.otherTermsCategory}
                      </Typography>
                      <Typography>Gender: {ad.bot.gender}</Typography>
                      <Typography>DOB: {ad.bot.dob}</Typography>
                    </>
                  }
                >
                  <Typography style={{ marginTop: 5 }}>
                    <span style={{ fontWeight: "bold" }}>Seen bot: </span>
                    {ad.bot.username}
                  </Typography>
                </Tooltip>
                {ad.seenOn ? (
                  <div>
                    <Grid container style={{ marginTop: 5 }}>
                      <Grid item>
                        <Typography style={{ fontWeight: "bold" }}>
                          Seen on:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Tooltip title={<Typography>{ad.seenOn}</Typography>}>
                          <Button
                            variant="contained"
                            style={{
                              background: "#167070",
                              marginLeft: 10,
                              padding: 2,
                              paddingLeft: 10,
                              paddingRight: 10,
                            }}
                            href={ad.seenOn}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <Typography
                              style={{
                                color: "#fff",
                                textTransform: "lowercase",
                                fontSize: 14,
                              }}
                            >
                              {processLink(ad.seenOn)}
                            </Typography>
                          </Button>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </div>
                ) : (
                  <div>
                    <Grid container style={{ marginTop: 5 }}>
                      <Grid item>
                        <Typography style={{ fontWeight: "bold" }}>
                          Seen on:
                        </Typography>
                      </Grid>
                      <Grid item>
                        <Typography style={{ marginLeft: 10 }}>
                          No Link
                        </Typography>
                      </Grid>
                    </Grid>
                  </div>
                )}
              </Grid>
            </Grid>
            <Grid container direction="row" style={{ height: "58%" }}>
              <Grid
                item
                xs={12}
                style={{
                  border: "1px solid #b2b2b2",
                  borderRadius: 10,
                  padding: 10,
                }}
              >
                <div>
                  <AdChip
                    ad={ad}
                    allTags={allTags}
                    onNewTagCreated={onNewTagCreated}
                  />
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <ImageDialog image={ad.image} open={open} handleClose={handleClose} />
      <BotDetails
        name={ad.bot.fName + " " + ad.bot.lName}
        ranking={ad.bot.politicalRanking}
        other={ad.bot.otherTermsCategory}
        gender={ad.bot.gender}
        dob={ad.bot.dob}
        long={ad.bot.locLong}
        lat={ad.bot.locLat}
        open={openDetails}
        handleClose={handleCloseDetails}
        displayTerms={displayTerms}
      />
      <SearchTerms
        open={openTerms}
        handleClose={handleCloseTerms}
        terms={terms}
        title={title}
      />
    </Card>
  );
};

export default AdCard;
