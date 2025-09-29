import AxiosError from 'axios-error';
import jungAlert from './jung-alert';

// group: condition
const conServiceError = ({ set }, { cb1, cb2 }) => {
  if (set) {
    if (set.data) {
      cb1();
    }
  } else {
    cb2();
  }
};

const conServiceError2 = ({ set }, { cb1, cb2, cb3 }) => {
  if (set.data.errors) cb1();
  else if (set.data.message) cb2();
  else cb3();
};

const serviceError = params => {
  const set = new AxiosError(params).response;
  const msgError = 'Terjadi kesalahan.';

  conServiceError(
    { set },
    {
      cb1: () => {
        conServiceError2(
          { set },
          {
            cb1: () => {
              if (!Array.isArray(set.data.errors)) {
                const errors = Object.keys(set.data.errors);

                errors.forEach(d => {
                  jungAlert({ type: 'error', text: set.data.errors[d] });
                });
              } else {
                set.data.errors.forEach(d => {
                  if (d.message) {
                    jungAlert({ type: 'error', text: d.message });
                  } else {
                    jungAlert({ type: 'error', text: d });
                  }
                });
              }
            },
            cb2: () => {
              jungAlert({ type: 'error', text: set.data.message });
            },
            cb3: () => {
              jungAlert({ type: 'error', text: msgError });
            }
          }
        );
      },
      cb2: () => {
        jungAlert({ type: 'error', text: msgError });
      }
    }
  );
};

export default serviceError;
