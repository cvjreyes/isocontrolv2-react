import React from 'react'
import { Suspense, useState } from "react";
import Loading from "react-loading";
import { Route, Routes } from "react-router-dom";

import EditForecast from "./EditForecast";
import FeedProgressView from "./FeedProgressView";

export default function FeedProgress() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route exact path="/" element={<FeedProgressView />} />
        <Route path="/edit_forecast" element={<EditForecast />} />
      </Routes>
    </Suspense>
  );
}
