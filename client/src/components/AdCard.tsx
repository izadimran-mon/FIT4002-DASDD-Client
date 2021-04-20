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
            <div>
                <img style={{float: "left", height: 300, width: 300, paddingLeft: "10px"}} src={props.file} alt="Ad screenshot"/>
                <p style={{position: "relative", float: "right", paddingRight: "10px"}}>Date: {moment(props.dateTime).format("dddd h:mma D MMM YYYY")}</p>
                <p style={{fontSize: "30px"}}>Bot: {props.bot}</p>
                <a style={{fontSize: "20px"}} href={props.headline}>{props.headline}</a>
            </div>
        </Paper>
      </div>
    );
  }
  
  export default AdCard