import axios from "axios";
import { URL } from "./config";

export const api = async (action, url, body) => {
  console.log("Body: ", body);
  try {
    const res = await axios[action](`${URL}${url}`, body);
    return res.data;
  } catch (err) {
    console.error(err);
    return { ok: false };
  }
};
