import React from "react";
import { useParams } from "react-router-dom";
import CityDetail from "../components/Cities/CityDetail";

const CityDetailPage = () => {
  const { cityId } = useParams();

  return <CityDetail cityId={Number(cityId)} />;
};

export default CityDetailPage;
