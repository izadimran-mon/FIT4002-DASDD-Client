import React, { useState, useEffect } from "react";
import AdCard from "../components/AdCard";
import Pagination from "@material-ui/lab/Pagination";
import { mockData } from "../mockData";
import axios from "axios";
import { Grid } from "@material-ui/core";

//ads?offset=0&limit=30
const Ads = () => {
  let storedPageNumber = localStorage.getItem("adsPage");
  const [limit, setLimit] = useState(30);
  const [ads, setAds] = useState([]);
  const [page, setPage] = useState(
    storedPageNumber ? JSON.parse(storedPageNumber) : 1
  );

  // useEffect(() => {
  //   axios.get(`/ads?offset${(page-1)*limit}&limit${limit}`).then((res: any) => {
  //     setAds(res.data);
  //   });
  // }, []);

  useEffect(() => {
    axios
      .get(`/ads?offset=${(page - 1) * limit}&limit=${limit}`)
      .then((res: any) => {
        setAds(res.data);
      });
  }, [page, limit]);

  const handleChange = (event: any, value: number) => {
    localStorage.setItem("adsPage", JSON.stringify(value));
    setPage(value);
  };
  console.log(ads);
  return (
    <div id='main'>
      <h1>Ads</h1>
      <Grid container justify='flex-end' style={{ marginBottom: 15 }}>
        <Pagination
          count={4334}
          page={page}
          onChange={handleChange}
          size='large'
        />
      </Grid>
      {ads.map((data, i) => {
        return <AdCard {...data} key={i} />;
      })}
      <Grid container justify='flex-end'>
        <Pagination
          count={4334}
          page={page}
          onChange={handleChange}
          size='large'
        />
      </Grid>
    </div>
  );
};

export default Ads;
