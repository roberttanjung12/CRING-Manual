const setJson = res => {
  if (typeof res === 'undefined') return '{}';

  try {
    const obj = JSON.parse(res);

    return JSON.stringify(obj, undefined, 4);
  } catch {
    return JSON.stringify(res, undefined, 4);
  }
};

export default setJson;
