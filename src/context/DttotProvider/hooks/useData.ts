import { useCallback, useState } from 'react';
import useSWR from 'swr';
import onAddDttotProvider from '../service';
import type { DttotProviderOnCheckProps, UseDttotProviderProps, UseDttotProviderReturns } from '../type';

/**
 * A hook custom that's used for data management in DTTOT Provider
 *
 * @returns {UseDttotProviderReturns}
 */
const useDttotProvider = ({ name, onOpen }: UseDttotProviderProps): Readonly<UseDttotProviderReturns> => {
  const [isDTTOT, setIsDTTOT] = useState(false);

  const [isPPSPM, setIsPPSPM] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  useSWR(name && `/check-dttot/${name}`, () => onAddDttotProvider({ name }), {
    onSuccess({ status, data }) {
      if (status === 200) {
        setIsDTTOT(data.isDTTOT);
        setIsPPSPM(data.isPPSPM);
      }
    },
    onError({ response }) {
      setIsDTTOT(false);
      setIsPPSPM(false);
      setErrorMessage(response?.data?.message ?? '');
    }
  });

  const onReset = useCallback(() => {
    setIsDTTOT(false);
    setIsPPSPM(false);
  }, []);

  const onCheck = useCallback(
    async ({ isCheck, name: newName, onClose, onDttot, onSubmit }: DttotProviderOnCheckProps) => {
      if (isCheck) {
        setIsDTTOT(false);
        setIsPPSPM(false);
        onSubmit();

        return;
      }

      const { data } = await onAddDttotProvider({ name: newName }, newErrorMessage => {
        setIsDTTOT(false);
        setIsPPSPM(false);
        setErrorMessage(newErrorMessage);
        onDttot();
        onOpen({ onClose, onSubmit });
      });

      setIsDTTOT(data.isDTTOT);
      setIsPPSPM(data.isPPSPM);

      if ([data.isDTTOT, data.isPPSPM].includes(true)) {
        setErrorMessage(`Nama Pemilik Rekening masuk kedalam daftar ${data.isDTTOT ? 'DTTOT' : 'PPSPM'}`);
        onDttot();
        onOpen({ onClose, onSubmit });
      } else onSubmit();
    },
    [onOpen]
  );

  return {
    isDTTOT,
    isPPSPM,
    errorMessage,
    onReset,
    onCheck
  };
};

export default useDttotProvider;
