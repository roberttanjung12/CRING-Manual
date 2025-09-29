import React, { createContext, type ReactNode, useContext, useMemo } from 'react';
import DttotProviderModal from './components/Modal';
import useDttotProvider from './hooks/useData';
import useDttotProviderModal from './hooks/useModal';
import type { DttotProviderProps, UseDttotProviderCreateReturns } from './type';

const DttotContext = createContext<UseDttotProviderCreateReturns>({
  isDTTOT: false,
  isPPSPM: false,
  onReset: () => {},
  onCheck: async () => {}
});

/**
 * A provider that's designed for checking DTTOT status
 *
 * @returns {React.JSX}
 */
const DttotProvider = ({ name, children, isHideNext }: DttotProviderProps): Readonly<ReactNode> => {
  const { isOpen, onOpen, onClose, onSubmit } = useDttotProviderModal();

  const { isDTTOT, isPPSPM, errorMessage, onReset, onCheck } = useDttotProvider({ name, onOpen });

  return (
    <DttotContext.Provider
      value={useMemo(
        () => ({
          isDTTOT,
          isPPSPM,
          onReset,
          onCheck
        }),
        [isDTTOT, isPPSPM, onCheck, onReset]
      )}
    >
      {children}
      <DttotProviderModal
        isOpen={isOpen}
        isHideNext={isHideNext}
        errorMessage={errorMessage}
        onClose={onClose}
        onSubmit={onSubmit}
      />
    </DttotContext.Provider>
  );
};

const useDttotContext = () => useContext(DttotContext);

export { DttotProvider, useDttotContext };
