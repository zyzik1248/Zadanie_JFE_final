export function getcharTime(){
  const date = new Date()  
  const utcTime = date.toString().split("GMT")[1].split(" ")[0]
  return `GMT${utcTime}`
}