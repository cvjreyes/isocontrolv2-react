import React from "react";
import { Suspense } from "react";
import Loading from "react-loading";
import { Route, Routes } from "react-router-dom";

import EditForecast from "./editForecast/EditForecast";
import IFDProgressView from "./IFDProgressView";

export default function IFDProgress() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route exact path="/" element={<IFDProgressView />} />
        <Route path="/edit_forecast" element={<EditForecast />} />
      </Routes>
    </Suspense>
  );
}