const toPascal = string => {
  return `${string}`.toLowerCase().replaceAll(' ', '-');
};

export default toPascal;
