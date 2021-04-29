import React, { useState, useEffect } from "react";
import AdCard from "../components/AdCard";
import Pagination from "@material-ui/lab/Pagination";
import { mockData } from "../mockData";
import axios from "axios";

//ads?offset=0&limit=30
const Ads = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(30);
  const [ads, setAds] = useState([]);
  const [page, setPage] = useState(1);

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
  }, [page]);

  const handleChange = (event: any, value: number) => {
    setPage(value);
  };

  const tryData = ads.slice(0, 10);
  console.log(tryData);

  return (
    <div id='main'>
      <h1>Ads</h1>
      <Pagination count={4334} page={page} onChange={handleChange} />
      {tryData.map((data, i) => {
        return <AdCard {...data} key={i} />;
      })}
      <Pagination count={4334} page={page} onChange={handleChange} />
      {/* <DataGrid rows={mockData} pageSize={5}/> */}
    </div>
  );
};

export default Ads;
