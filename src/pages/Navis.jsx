/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import FileSaver from "file-saver";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "react-loading";

import Button1 from "../components/general/Button1";
import NoResults from "../components/general/NoResults";
import { api } from "../helpers/api";
import WithToast from "../modals/Toast";

function NavisComp() {
  const [displayData, setDisplayData] = useState(null);
  const [dataToSelected, setDataToSelected] = useState([]);

  const getNavisSelect = async () => {
    const { body: navis } = await api("get", "/navis/get_navis_select");
    const allRows = navis.map((row) => ({
      ...row,
    }));
    setDisplayData(allRows);
  };

  const addToDataSelected = (row) => {
    const tempDataToSelected = [...dataToSelected];
    const index = tempDataToSelected.indexOf(row);
    if (index > -1) tempDataToSelected.splice(index, 1);
    else tempDataToSelected.push(row);
    setDataToSelected(tempDataToSelected);
  };

  const generateXML = () => {
    let xml =
      '<?xml version="1.0" encoding="UTF-8" ?>\n    <exchange xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://download.autodesk.com/us/navisworks/schemas/nw-exchange-12.0.xsd">\n      <optionset name="">\n           <optionset name="interface">\n              <optionset name="smart_tags">\n                     <option name="enabled">\n                           <data type="bool">true</data>\n                     </option>\n                     <option name="hide_category" flags="32">\n                           <data type="bool">false</data>\n                     </option>\n                     <optionarray name="definitions">\n';

    for (let i = 0; i < dataToSelected.length; i++) {
      let option = dataToSelected[i].value.toLowerCase();
      xml +=
        '                                 <optionset name="">\n                                       <option name="category">\n                                          <data type="name">\n                                              <name internal="lcldrvm_props">PDMS</name>\n                                          </data>\n                                       </option>\n                                       <option name="property">\n                                          <data type="name">\n                                              <name internal="lcldrvm_prop_' +
        option +
        '">' +
        option.toUpperCase() +
        "</name>\n                                          </data>\n                                       </option>\n                                </optionset>\n";
    }
    xml +=
      "                  </optionarray>\n               </optionset>\n         </optionset>\n      </optionset>\n  </exchange>";
    const data = new Blob([xml], { type: "xml" });
    FileSaver.saveAs(data, "navis.xml");
  };
  useEffect(() => {
    getNavisSelect();
  }, []);

  return (
    <div css={navisStyle}>
      <Button1
        text="Generate XML"
        bgColor="orange"
        color="white"
        bgHover="lightgray"
        onClick={() => generateXML()}
      />
      <div css={tableStyle}>
        <div className="row header">
          <div></div>
          <div className="bold">Object 3D</div>
          <div className="bold">Attribute</div>
        </div>
        <div className="body">
          {displayData ? (
            displayData.length > 0 ? (
              displayData.map((x, i) => {
                return (
                  <div
                    key={x.id}
                    className={`row ${i % 2 ? "parColor" : "inparColor"}`}
                  >
                    <div
                      className="flexCenter pointer"
                      onClick={() => addToDataSelected(x)}
                    >
                      <input
                        type="checkbox"
                        checked={dataToSelected.includes(x)}
                        onChange={() => addToDataSelected(x)}
                      />
                    </div>
                    <div>{x.object}</div>
                    <div>{x.value}</div>
                  </div>
                );
              })
            ) : (
              <NoResults />
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}

const navisStyle = {
  // backgroundColor: "lightgray",
  minHeight: "100vh",
  width: "90vw",
  marginLeft: "4%",
};

const tableStyle = {
  ".row": {
    display: "grid",
    gridTemplateColumns: "1fr 2fr 5fr",
    lineHeight: "40px",
  },
  ".header": {
    border: "1px solid black",
  },
  ".parColor": {
    backgroundColor: "LightBlue",
  },
  ".inparColor": {
    backgroundColor: "PapayaWhip",
  },
};

export default function Navis() {
  return (
    <WithToast>
      <NavisComp />
    </WithToast>
  );
}
