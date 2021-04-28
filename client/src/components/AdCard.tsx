import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import "./styles/AdCard.css";
import AdChip from "./AdChip"

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

const AdCard = (props: any) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Paper elevation={3}>
          <div className="overallDivStyle">
            <section className="imageSection">
              <img className="imageStyle" src={props.image} alt="Ad screenshot"/>
            </section>
            <section className="mainSection">
              <div className="headlineDiv">
                <a className="headlineStyle" href={props.headline}>{props.headline}</a>
              </div>
            </section>
            <section className="sideSection">
              <p className="dateStyle"> Date: {moment(props.createdAt).format("YYYY-MMM-D dddd h:mma")} </p>
              <p className="botStyle">Seen bot: {props.botId}</p>
              <p className="seenOnStlye">Seen on: <a href={props.seenOn}>{props.seenOn}</a></p>
            </section>
            {/* <section className="categorySection">
              <div className="cardStyle">
                <AdChip {...props}/>
              </div>
            </section> */}
              <div>
                
              </div>
              {/* <div className="middleBlock">
                <p className="botStyle">Bot: {props.bot}</p>
                <a className="headlineStyle" href={props.headline}>{props.headline}</a>
              </div>
              <div>
                <p className="dateStyle"> Date: {moment(props.dateTime).format("YYYY-MMM-D dddd h:mma")} </p>
                <p className="seenOnStlye">Seen on: <a href={props.seenOn}>{props.seenOn}</a></p>
              </div>

              <div className="AdChipStyle">
                <AdChip {...props}/>
              </div> */}
          </div>
      </Paper>
    </div>
  );
}

// const AdCard: React.FC<Ad> = (props) => {
//     const classes = useStyles();
//     return (
//       <div className={classes.root}>
//         <Paper elevation={3}>
//             <div className="overallDivStyle">
//               <section className="imageSection">
//                 <img className="imageStyle" src={props.file} alt="Ad screenshot"/>
//               </section>
//               <section className="mainSection">
//                 <div className="headlineDiv">
//                   <a className="headlineStyle" href={props.headline}>{props.headline}</a>
//                 </div>
//               </section>
//               <section className="sideSection">
//                 <p className="dateStyle"> Date: {moment(props.dateTime).format("YYYY-MMM-D dddd h:mma")} </p>
//                 <p className="botStyle">Seen bot: {props.bot}</p>
//                 <p className="seenOnStlye">Seen on: <a href={props.seenOn}>{props.seenOn}</a></p>
//               </section>
//               <section className="categorySection">
//                 <div className="cardStyle">
//                   <AdChip {...props}/>
//                 </div>
//               </section>
//                 <div>
                  
//                 </div>
//                 {/* <div className="middleBlock">
//                   <p className="botStyle">Bot: {props.bot}</p>
//                   <a className="headlineStyle" href={props.headline}>{props.headline}</a>
//                 </div>
//                 <div>
//                   <p className="dateStyle"> Date: {moment(props.dateTime).format("YYYY-MMM-D dddd h:mma")} </p>
//                   <p className="seenOnStlye">Seen on: <a href={props.seenOn}>{props.seenOn}</a></p>
//                 </div>

//                 <div className="AdChipStyle">
//                   <AdChip {...props}/>
//                 </div> */}
//             </div>
//         </Paper>
//       </div>
//     );
//   }
  
  export default AdCard