import { getChannels } from "./js/axiosChannels.js";
import {
  changeSort,
  changeSortDirection,
  findByText,
  clearFilters,
} from "./js/filters.js";
import {
  cerateChannel,
  clearElements,
  hideHints,
} from "./js/createElements.js";
import { saveVisitors } from "./js/loacalstorage.js";

window.addEventListener("load", async () => {
  try {
    const textFilter = document.getElementById("text-filter");
    textFilter.addEventListener("input", _.debounce(findByText, 300));
    textFilter.addEventListener("blur", () => {
      setTimeout(hideHints, 300);
    });
    textFilter.addEventListener("focus", findByText);

    clearElements();

    cerateChannel(await getChannels());

    const sortRadios = document.querySelectorAll(`[name="sort"]`);
    sortRadios.forEach((el) =>
      el.addEventListener("click", () => {
        changeSort(el);
      })
    );

    const sortDirection = document.querySelector("[data-sortDirection]");
    sortDirection.addEventListener("click", () => {
      changeSortDirection(sortDirection);
    });

    const clear = document.getElementById("clear");
    clear.addEventListener("click", clearFilters);

    const invertButton = document.getElementById("invert-color");
    invertButton.addEventListener("click", () => {
      invertColor(invertButton);
    });

    saveVisitors();
  } catch (error) {
    console.log(error);
  }
});

function invertColor(event) {
  let inverter = parseInt(event.dataset.color);

  inverter === 1 ? (inverter = 0) : (inverter = 1);
  event.dataset.color = inverter;

  const html = document.getElementsByTagName("html")[0];
  html.style.filter = `invert(${100 * inverter}%)`;
}
