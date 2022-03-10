export async function getChannels() {
  try {
    const type = document.querySelector("[data-sortType]");
    const direction = document.querySelector("[data-sortDirection]");
    const title = document.querySelector("[data-title]");

    const resp = await axios.get("/channels", {
      params: {
        sort: type.dataset.sortType,
        direction: direction.dataset.sortDirection,
        title: title.dataset.title,
      },
    });

    return resp.data;
  } catch (error) {
    console.log(error);
  }
}