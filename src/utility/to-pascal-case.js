const toPascalCase = string => {
  return `${string}`
    .toLowerCase()
    .replace(/[-_]+/g, ' ')
    .replace(/[^\w\s]/g, '')
    .replace(/\b(\w)(\w*)/g, ($1, $2, $3) => `${$2.toUpperCase() + $3}`)
    .replace(/\w/, s => s.toUpperCase());
};

export default toPascalCase;
