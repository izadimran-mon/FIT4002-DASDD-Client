import React, { useState } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import { mockCategoryData } from "../mockData";
import { couldStartTrivia } from "typescript";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      "& > *": {
        margin: theme.spacing(0.5),
      },
    },
  })
);

const Chips = () => {
  const classes = useStyles();

  const [categoryData, setCategoryData] = useState<CategoryData[]>(
    mockCategoryData
  );

  const handleClick = (categoryIndex: number) => {
    setCategoryData((oldData) => {
      let data = oldData.slice();
      data[categoryIndex].select = !data[categoryIndex].select;
      return data;
    });
  };

  return (
    <div className={classes.root}>
      {categoryData.map((category, i) => (
        <Chip
          variant={category.select ? "default" : "outlined"}
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

export default Chips;
