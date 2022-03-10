export function getcharTime() {
  const date = new Date();
  const utcTime = date.toString().split("GMT")[1].split(" ")[0];
  return `GMT${utcTime}`;
}

export function getTextDate(date) {
  var options = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  let textData = date.toLocaleDateString("pl", options);
  const textDataList = textData.split(" ");
  textDataList[1] = `${textDataList[1]}.`;
  return textDataList.join(" ");
}
