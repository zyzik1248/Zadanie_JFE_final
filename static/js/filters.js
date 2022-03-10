import { getChannels } from "./axiosChannels.js";
import { cerateChannel, createHint, clearElements } from "./createElements.js";

export async function changeSort(event) {
  try {
    const sortTypeEl = document.querySelector("[data-sortType]");
    sortTypeEl.dataset.sortType = event.value;
    cerateChannel(await getChannels());
  } catch (error) {
    console.log(error);
  }
}

export async function changeSortDirection(event) {
  try {
    const direction = parseInt(event.dataset.sortDirection);

    if (direction == -1) {
      event.innerHTML = "descending";
      event.dataset.sortDirection = 1;
    } else {
      event.innerHTML = "ascending";
      event.dataset.sortDirection = -1;
    }

    cerateChannel(await getChannels());
  } catch (error) {
    console.log(error);
  }
}

export async function findByText() {
  try {
    const textFilter = document.getElementById("text-filter");
    textFilter.dataset.title = textFilter.value;
    const data = await getChannels();

    if (textFilter.value) {
      const hints =
        data.length === 1 && data[0].title === textFilter.value ? [] : data;

      createHint(hints);
    } else {
      createHint([]);
    }
    cerateChannel(data);
  } catch (error) {
    console.log(error);
  }
}

export async function clearFilters() {
  clearElements();
  const data = await getChannels();
  cerateChannel(data);
}
