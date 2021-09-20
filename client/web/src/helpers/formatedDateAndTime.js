function getFormatedDateAndTime(date) {
  const formatingDate = new Date(date).toISOString().substring(0, 10);
  const formatingTime = new Date(date).toTimeString();
  return `${formatingDate}, ${formatingTime}`;
}

export default getFormatedDateAndTime;
