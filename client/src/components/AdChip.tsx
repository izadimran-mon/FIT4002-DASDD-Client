import React, { useEffect, useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  TextField,
  DialogActions,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import { baseApi } from "../api/api";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  })
);

const AdChip = (props: Ad) => {
  const classes = useStyles();

  const [tags, setTags] = useState<Tag[]>([]);
  const [adOwnTagsId, setAdOwnTags] = useState<number[]>([]);
  const [tagsName, setTagsName] = useState<string[]>([]);
  const [adData, setAdData] = useState<Ad>(props);
  const [open, setOpen] = useState(false);
  const [tagInputName, setTagInputName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const tempList = adData.tags.map((tag: Tag) => tag.id);
    setAdOwnTags(tempList);
  }, [adData]);

  useEffect(() => {
    baseApi.get(`/tags`).then((res: any) => {
      setTags(res.data);
    });
    const tempNameList = tags.map((tag: Tag) => tag.name.toLowerCase());
    setTagsName(tempNameList);
  }, [tags]);

  const handleClick = (categoryIndex: number, hasTag: boolean) => {
    if (hasTag) {
      baseApi
        .delete(`/ads/${adData.id}/tags/${categoryIndex}`)
        .then((res: any) => {
          setAdData(res.data);
        });
    } else {
      baseApi
        .post(`/ads/${adData.id}/tags/${categoryIndex}`)
        .then((res: any) => {
          setAdData(res.data);
        });
    }
  };

  const handleClickOpen = () => {
    setErrorMessage("");
    setTagInputName("");
    setOpen(true);
  };

  const handleClose = () => {
    setErrorMessage("");
    setTagInputName("");
    setOpen(false);
  };

  const handleAddTag = () => {
    if (tagsName.includes(tagInputName)) {
      setErrorMessage(
        "Same tag name has already been added, please enter another name"
      );
    } else {
      baseApi.post(`/tags`, { name: tagInputName }).then((res: any) => {
        baseApi.get(`/tags`).then((res: any) => {
          setTags(res.data);
        });
      });
      setOpen(false);
    }
    // else{
    //   baseApi
    //   .post(`/ads/${adData.id}/tags/${categoryIndex}`)
    //   .then((res: any) => {
    //     setAdData(res.data);
    //   });
    // }
  };

  const handleTagNameChange = (e: any) => {
    setTagInputName(e.target.value);
  };

  return (
    <div className={classes.root}>
      {tags.map((category, i) => (
        <Chip
          variant={adOwnTagsId.includes(category.id) ? "default" : "outlined"}
          label={category.name}
          onClick={() => {
            handleClick(category.id, adOwnTagsId.includes(category.id));
          }}
          key={i}
        />
      ))}
      <Chip variant={"outlined"} label="+" onClick={handleClickOpen} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add tags</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add tag, please input the tag name and click submit.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Tag name"
            fullWidth
            value={tagInputName}
            onChange={handleTagNameChange}
          />
          <Typography style={{ fontSize: 12, color: "red" }}>
            {errorMessage}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddTag} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

// return (
//   <div className={classes.root}>
//     {tags.map((category, i) => {
//       if(adOwnTags.includes(category.id)){
//         return <Chip label={category.name} onClick={() => {handleClick(i)}} key={i}/>
//       }
//       else{
//         return <Chip variant="outlined" label={category.name} onClick={() => {handleClick(i)}} key={i}/>
//       }
//     })}
//   </div>
// );
// };

export default AdChip;
