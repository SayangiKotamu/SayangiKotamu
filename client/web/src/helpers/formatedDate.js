function getFormatedDate(date) {
  const formatingDate = new Date(date).toISOString().substring(0, 10);

  return `${formatingDate}`;
}

export default getFormatedDate;
