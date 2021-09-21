import { masa } from "masa";

function formatDateWithHour(date) {
  return masa(date).format("dddd, D MMMM YYYY [pukul] HH[:]MM");
}

export default formatDateWithHour;
