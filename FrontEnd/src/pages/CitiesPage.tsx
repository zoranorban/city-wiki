import React, { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";

import { fetchWrapper } from "../services/fetchWrapper";
import CitiesTable from "../components/Cities/CitiesTable";

const Cities = () => {
  return (
    <div>
      <CitiesTable />
    </div>
  );
};

export default Cities;
