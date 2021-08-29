import { Dialog, DialogContent } from "@material-ui/core";
import React from "react";
import Carousel from "react-material-ui-carousel";
import "./styles/AdCard.css";

interface ImageDialogProps {
  images: string[];
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
        <Carousel animation="slide" autoPlay={false}>
          {props.images.map((image, i) => (
            <img
              key={i}
              style={{
                width: "auto",
                height: "100%",
              }}
              src={image}
              alt="Ad screenshot full"
            />
          ))}
        </Carousel>
      </DialogContent>
    </Dialog>
  );
};

export default ImageDialog;
