import axios from "axios";

const sayangiKotamu = axios.create({
  baseURL: "http://54.86.137.89/dinas",
});

export default sayangiKotamu;
