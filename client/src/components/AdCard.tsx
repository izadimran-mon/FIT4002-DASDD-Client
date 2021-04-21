import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import "./styles/AdCard.css";

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
                <img className="imageStyle" src={props.file} alt="Ad screenshot"/>
                <p className="dateStyle"> Date: {moment(props.dateTime).format("dddd h:mma D MMM YYYY")} </p>
                <p className="botStyle">Bot: {props.bot}</p>
                <a className="headlineStyle" href={props.headline}>{props.headline}</a>
            </div>
        </Paper>
      </div>
    );
  }
  
  export default AdCard