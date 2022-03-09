async function getChannels() {
  try {
    const resp = await axios.get("/channels");
    cerateChannel(resp.data);
  } catch (error) {
    console.log(error);
  }
}

function cerateChannel(channels) {
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

window.addEventListener("load", getChannels);

async function changeSort(event) {
  try {
    console.log(parseInt(event.value))
    const resp = await axios.get("/channels", { params: { sort: parseInt(event.value) } });
    cerateChannel(resp.data);
  } catch (error) {
    console.log(error);
  }
}
