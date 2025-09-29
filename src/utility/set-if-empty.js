import isEmpty from 'is-empty';

const setIfEmpty = (checkValue, newValue, empty = '-') => (!isEmpty(checkValue) ? newValue || checkValue : empty);

export default setIfEmpty;
