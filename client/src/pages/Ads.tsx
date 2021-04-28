import React, {useState, useEffect} from "react";
import AdCard from "../components/AdCard"
import { DataGrid } from '@material-ui/data-grid';
import {mockData} from "../mockData"
import axios from 'axios' 


const Ads = () => {
  const [ads, setAds] = useState([])

  useEffect(() => {
    axios.get("/ads").then((res) => {
      setAds(res.data);
    });
  }, []);
  console.log(ads)
  const tryData = ads.slice(0, 10)
  console.log(tryData)
  
  return (
    <div id="main">
      <h1>Ads</h1>
      {tryData.map((data, i) => {
        return <AdCard {...data} key={i}/>
      })}
      {/* <DataGrid rows={mockData} pageSize={5}/> */}
    </div>
  );
};

export default Ads;
