import { getChannels } from "./axiosChannels.js";
import {
  changeSort,
  changeSortDirection,
  findByText,
  clearFilters,
} from "./filters.js";
import { cerateChannel, clearElements } from "./createElements.js";

window.addEventListener("load", async () => {
  try {
    const textFilter = document.getElementById("text-filter");
    textFilter.addEventListener("input", _.debounce(findByText, 300));
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
  } catch (error) {
    console.log(error);
  }
});
