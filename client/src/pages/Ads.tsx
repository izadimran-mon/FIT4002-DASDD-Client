import { Grid } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import React, { useEffect, useState } from "react";
import { baseApi } from "../api/api";
import AdCard from "../components/AdCard";
import AdCardSkeleton from "../components/AdCardSkeleton";
import { Ad } from "../types";

const Ads = () => {
  let storedPageNumber = localStorage.getItem("adsPage");
  const [limit, setLimit] = useState(30);
  const [ads, setAds] = useState<Ad[]>([]);
  const [page, setPage] = useState(
    storedPageNumber ? JSON.parse(storedPageNumber) : 1
  );
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   axios.get(`/ads?offset${(page-1)*limit}&limit${limit}`).then((res: any) => {
  //     setAds(res.data);
  //   });
  // }, []);

  useEffect(() => {
    setLoading(true);
    baseApi
      .get(`/ads?offset=${(page - 1) * limit}&limit=${limit}`)
      .then((res: any) => {
        setAds(res.data);
        setLoading(false);
      });
  }, [page, limit]);

  const handleChange = (event: any, value: number) => {
    localStorage.setItem("adsPage", JSON.stringify(value));
    setPage(value);
  };
  console.log(ads);
  return (
    <div id="main">
      <h1>Ads</h1>
      <Grid container justify="flex-end" style={{ marginBottom: 15 }}>
        <Pagination
          count={4334}
          page={page}
          onChange={handleChange}
          size="large"
        />
      </Grid>
      {loading
        ? Array(3)
            .fill(null)
            .map((_, i) => <AdCardSkeleton key={i} />)
        : ads.map((data, i) => {
            return <AdCard {...data} key={i} />;
          })}
      <Grid container justify="flex-end">
        <Pagination
          count={4334}
          page={page}
          onChange={handleChange}
          size="large"
        />
      </Grid>
    </div>
  );
};

export default Ads;
