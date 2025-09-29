const date: Date = new Date();

const onDefaultPeriod: {
  current: Date;
  start: Date;
  end: Date;
  dynamicStart: () => Date;
  dynamicEnd: () => Date;
  nextYear: () => Date;
} = {
  current: date,
  start: new Date(date.getFullYear(), date.getMonth(), 1),
  end: date,
  dynamicStart: () => {
    const getDate = date.getDate();
    const getMonth = date.getMonth();
    const getYear = date.getFullYear();
    let newDate: Date = new Date(getYear, getMonth, 1);

    if (getDate === 2) newDate = new Date(getYear, getMonth, 1);
    else if (getDate === 1) newDate = new Date(getYear, getMonth - 1, 1);

    return newDate;
  },
  dynamicEnd: () => new Date(new Date().setDate(new Date().getDate() - 1)),
  nextYear: () => {
    const current = new Date();
    const getDate = current.getDate();
    const getMonth = current.getMonth();
    const getYear = current.getFullYear();
    const newDate = new Date(getYear + 1, getMonth, getDate);

    return newDate;
  }
};

export default onDefaultPeriod;
