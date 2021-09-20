import axios from "axios";

const sayangiKotamu = axios.create({
  baseURL: "http://localhost:3000/dinas",
});

export default sayangiKotamu;
