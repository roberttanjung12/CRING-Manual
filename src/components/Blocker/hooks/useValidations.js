import * as yup from 'yup';

const useBlockerValidations = () => {
  const schema = () => {
    const set = {
      password: yup.string().required('Kolom ini harus diisi!')
    };

    return yup.object().shape(set);
  };

  return { schema };
};

export default useBlockerValidations;
