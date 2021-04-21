import React from "react";
import AdCard from "../components/AdCard"
import {mockData} from "../mockData"
import AdChip from "../components/AdChip"
const Ads = () => {
  return (
    <div id="main">
      <h1>Ads</h1>
      {/* {mockData.map((data:Ad) => {
        return <AdCard {...data}/>
        })} */}
      <AdChip></AdChip>
    </div>
  );
};

export default Ads;
