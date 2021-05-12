import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import React from "react";
import "./styles/AdCard.css";

interface SearchTermsProps {
  terms: string[];
  title: string;
  open: boolean;
  handleClose: () => void;
}

const SearchTerms = (props: SearchTermsProps) => {
  return (
    <Dialog
      onClose={props.handleClose}
      aria-labelledby="simple-dialog-title"
      open={props.open}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogTitle
        id="simple-dialog-title"
        style={{ borderBottom: "1px solid #b2b2b2", background: "#363740" }}
      >
        <Typography
          align="center"
          style={{ fontWeight: "bold", fontSize: 24, color: "#fff" }}
        >
          {props.title}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <List>
          {props.terms.map((term, key) => (
            <>
              <ListItem key={key}>
                <ListItemText primary={term} />
              </ListItem>
              {key !== props.terms.length - 1 ? <Divider /> : null}
            </>
          ))}
        </List>
      </DialogContent>
      <DialogActions
        style={{
          display: "flex",
          justifyContent: "center",
          paddingLeft: 0,
          paddingRight: 0,
          paddingTop: 20,
          paddingBottom: 20,
          borderTop: "1px double #515364",
        }}
      >
        <Button
          autoFocus
          variant="outlined"
          onClick={props.handleClose}
          style={{
            color: "#363740",
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SearchTerms;
