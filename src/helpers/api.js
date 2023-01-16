import axios from "axios";
import { URL, URLold } from "./config";

export const api = async (action, url, old, body, setMessage) => {
  try {
    const res = await axios[action](`${old ? URLold : URL}${url}`, body);
    return res.data;
  } catch (err) {
    console.error(err);
    return { ok: false };
  }
};