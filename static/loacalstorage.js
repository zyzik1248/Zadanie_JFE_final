import { getTextDate } from "./dataParser.js";

export function saveVisitors() {
  let visitors = window.localStorage.getItem("visitors");
  visitors ? ++visitors : (visitors = 1);
  window.localStorage.setItem("visitors", visitors);

  const date = new Date();
  window.localStorage.setItem("visitors-date", getTextDate(date));
}
