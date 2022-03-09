async function getChannels() {
  try {
    const resp = await axios.get("/channels");
    console.log(resp.data);
  } catch (error) {
    console.log(error);
  }
}


window.addEventListener("load", getChannels);
