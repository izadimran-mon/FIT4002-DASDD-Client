import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(150),
        height: theme.spacing(50),

      },
    },
  }),
);

// const botTitleStyle = {
//     fontSize: "50px",
//     float: "right",
// }

// const imageStyle = {
//     height: 300,
//     width: 300,
//     border: 0,
//     // overflow: "hidden",
//     // alignItems: "center",
//     // borderWidth: 1,
// }

// export default function AdCard(props: Ad) {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Paper elevation={3}>{props.bot}</Paper>
//     </div>
//   );
// }

const AdCard: React.FC<Ad> = (props) => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <Paper elevation={3}>
            <div style={{display: "inline-block", overflow: "hidden"}}>
                <img style={{float: "left", height: 300, width: 300}} src={props.file} alt="Ad screenshot"/>
                <p style={{fontSize: "30px", float: "right"}}>{props.bot}</p>
                <p style={{marginLeft: "10px", float: "inline-end"}}>{moment(props.dateTime).format("dddd h:mma D MMM YYYY")}</p>
            </div>
            <div>
                <a href={props.headline}>{props.headline}</a>
            </div>
        </Paper>
      </div>
    );
  }
  
  export default AdCard