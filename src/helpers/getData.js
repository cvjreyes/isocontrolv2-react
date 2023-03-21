// import { useState, useEffect } from "react";
// import { prepareFeedPipesData } from "../components/FEED/feedPipesHelpers";
// import { URLold } from "./config";

// export const useFeedPipes = () => {
//   const [pipes, setPipes] = useState(null);

//   // const getOptions = {
//   //   method: "GET",
//   //   headers: {
//   //     "Content-Type": "application/json",
//   //   },
//   // };

//   // useEffect(() => {
//   //   async function getFeedPipes() {
//   //     try {
//   //       const url = `${URLold}/feedPipes`;
//   //       const res = await fetch(url, getOptions);
//   //       const { rows: resRows } = await res.json();
//   //       const { rows } = prepareFeedPipesData(resRows);
//   //       setPipes(rows);
//   //     } catch (err) {
//   //       console.error(err);
//   //     }
//   //   }
//   //   getFeedPipes();
//   // }, []);

//   return pipes;
// };
