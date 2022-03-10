import { getChannels } from "./axiosChannels.js";

export function cerateChannel(channels) {
  const elements = document.getElementById("channels");
  let element = document.getElementById("channel-0").cloneNode(true);

  let child = elements.lastElementChild;
  while (child) {
    elements.removeChild(child);
    child = elements.lastElementChild;
  }

  element = elements.appendChild(element);

  if (channels.length > 0) {
    element.classList.remove("hidden");
    changeDataChanel(element, channels.shift(), 0);
  } else {
    !element.classList.contains("hidden") && element.classList.add("hidden");
  }

  channels.forEach((channel, index) => {
    const clone = element.cloneNode(true);
    changeDataChanel(clone, channel, index + 1);
    elements.appendChild(clone);
  });
}

function changeDataChanel(el, channel, id) {
  el.id = `channel-${id}`;
  el.getElementsByClassName("channel__name")[0].innerHTML = channel.title;
  el.getElementsByClassName("subscribers")[0].innerHTML =
    channel.statistics.subscriberCount;
  el.getElementsByClassName("videos")[0].innerHTML =
    channel.statistics.videoCount;
  el.getElementsByClassName("views")[0].innerHTML =
    channel.statistics.viewCount;
  el.getElementsByClassName("channel__image")[0].src =
    channel.thumbnails.high.url;
}

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
      event.innerHTML = "ascending";
      event.dataset.sortDirection = 1;
    } else {
      event.innerHTML = "descending";
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
      const hints = data.length === 1 ? [] : data;

      createHint(hints);
    } else {
      createHint([]);
    }
    cerateChannel(data);
  } catch (error) {
    console.log(error);
  }
}

function createHint(hints) {
  const elements = document.getElementById("hints");

  let child = elements.lastElementChild;
  while (child) {
    elements.removeChild(child);
    child = elements.lastElementChild;
  }

  hints.length > 0
    ? elements.classList.remove("hidden")
    : elements.classList.add("hidden");

  hints.forEach((el) => {
    const newElement = document.createElement("p");
    newElement.innerHTML = el.title;
    newElement.classList.add("hint");

    newElement.addEventListener("click", () => chooseHint(el));

    elements.appendChild(newElement);
  });
}

async function chooseHint(el) {
  try {
    const textFilter = document.getElementById("text-filter");
    textFilter.dataset.title = el.title;
    textFilter.value = el.title;

    hideHints();
    const data = await getChannels();

    cerateChannel(data);
  } catch (error) {
    console.log(error);
  }
}

function hideHints() {
  const elements = document.getElementById("hints");

  let child = elements.lastElementChild;
  while (child) {
    elements.removeChild(child);
    child = elements.lastElementChild;
  }
  elements.classList.add("hidden");
}

export async function clearFilters() {
  clearElements();
  const data = await getChannels();
  cerateChannel(data);
}

export function clearElements() {
  const type = document.querySelector("[data-sortType]");
  const direction = document.querySelector("[data-sortDirection]");
  const title = document.querySelector("[data-title]");

  type.dataset.sortType = "";
  direction.dataset.sortDirection = "1";
  title.dataset.title = "";
  title.value = "";

  hideHints();
  const sortRadios = document.querySelectorAll(`[name="sort"]`);
  sortRadios.forEach((el) => (el.checked = false));
}
