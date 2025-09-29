const thousand = (number, local = 'en') => {
  const number2 = parseInt((number * 1).toFixed(3), 10);
  const number3 = number2.toLocaleString(local);

  return number3;
};

export default thousand;
