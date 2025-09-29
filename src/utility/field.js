export const setClass = (data, classText) => {
  let set = classText || 'text-blur';

  if (data) {
    if (Array.isArray(data)) {
      if (data.length) set += ' text-success';
    } else if (typeof data === 'number') {
      set += ' text-success';
    } else if (typeof data === 'string') {
      set += ' text-success';
    }
  }

  return set;
};

export const setClassError = (data1, data2) => (data1 && data2 ? 'spe-error-field' : '');
