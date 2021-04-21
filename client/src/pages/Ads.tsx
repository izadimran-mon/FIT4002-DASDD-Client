import React from "react";
import AdCard from "../components/AdCard"
import {mockData} from "../mockData"

const Ads = () => {
  return (
    <div id="main">
      <h1>Ads</h1>
      {mockData.map((data:Ad, i) => {
        return <AdCard {...data} key={i}/>
        })}
    </div>
  );
};

export default Ads;
