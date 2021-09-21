import { masa } from "masa";

function getFormatedDate(date) {
  return masa(date).format();
}

export default getFormatedDate;
