import React from "react";

import Graphic from "./Graphic";
import SidePanel from "./SidePanel";

export default function Main({ data, subcategories, section, handleChange }) {
  return (
    <div className="mainProgress">
      <SidePanel
        data={data}
        subcategories={subcategories}
        section={section}
        handleChange={handleChange}
      />
      <Graphic data={data} />
    </div>
  );
}
