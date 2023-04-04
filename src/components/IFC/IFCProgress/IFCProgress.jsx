import React, { Suspense } from "react";
import Loading from "react-loading";
import { Route, Routes } from "react-router-dom";

import EditForecast from "./editForecast/EditForecast";
import IFCProgressView from "./IFCProgressView";

// ! CURRENTLY NOT BEING USED!
export default function IFDProgress() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route exact path="/" element={<IFCProgressView />} />
        <Route path="/edit_forecast" element={<EditForecast />} />
      </Routes>
    </Suspense>
  );
}
