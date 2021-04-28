import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";

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

const AdChip = (props: any) => {
  const classes = useStyles();
  const [categoryData, setCategoryData] = useState<CategoryData[]>(
    props.category
  );

  const handleClick = (categoryIndex: number) => {
    setCategoryData((oldData) => {
      let data = oldData.slice();
      data[categoryIndex].selection = !data[categoryIndex].selection;
      return data;
    });
  };

  return (
    <div className={classes.root}>
      {categoryData.map((category, i) => (
        <Chip
          variant={category.selection ? "default" : "outlined"}
          label={category.name}
          onClick={() => {
            handleClick(i);
          }}
          key={i}
        />
      ))}
    </div>
  );
};

export default AdChip;
