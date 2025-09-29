/**
 * A function that's used run a code with status condition
 *
 * @param {String} status status of data
 * @param {Function} cb is used for run function when status is truthy
 *
 * @returns {Function} is used for initial
 */
const onIsTruthy = (status = false, cb = () => null) => {
  if (status) cb();
};

export default onIsTruthy;
