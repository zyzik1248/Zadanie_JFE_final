import { getChannels } from "./axiosChannels.js";
import {cerateChannel, changeSort, changeSortDirection, findByText} from './filters.js'

window.addEventListener("load", async () => {
  try {
    const textFilter = document.getElementById("text-filter");
    textFilter.addEventListener("input", _.debounce(findByText, 300));

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
  } catch (error) {
    console.log(error);
  }
});


