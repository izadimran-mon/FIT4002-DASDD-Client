import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import {mockCategoryData} from "../mockData"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(0.5),
      },
    },
  }),
);



export default function Chips() {
  const classes = useStyles();

  const [categoryData, setCategoryData] = React.useState<CategoryData[]>(
    mockCategoryData
)

  const handleDelete = () => {
    console.info('You clicked the delete icon.');
  };

  const handleClick = (categoryIndex: number) => {
    setCategoryData(
        categoryData => {
            categoryData[categoryIndex].select = !categoryData[categoryIndex].select
            console.log(categoryData)
            return categoryData
        }
    )
  };

  return (
    <div className={classes.root}>
        {categoryData.map((category, i) => {
            if(category.select === false){
                return <Chip variant="outlined" label={category.name} onClick={() => {handleClick(i)}} key={i}/>
            }
            else{
                return <Chip label={category.name} onClick={() => {handleClick(i)}} key={i}/>
            }
        })}
    </div>
  );
}
