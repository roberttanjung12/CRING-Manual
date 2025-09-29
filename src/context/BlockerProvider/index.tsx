'use client';

import { createContext, type ReactNode, useContext, useEffect, useMemo } from 'react';
import { element } from 'prop-types';
import Blocker from '@/components/Blocker';
import useBlockerProviderData from './hooks/useData';

// Tambahkan tipe untuk context value
interface BlockerContextType {
  isLocked: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const BlockerContext = createContext<BlockerContextType | undefined>(undefined);

// Tambahkan tipe untuk props
interface BlockerProviderProps {
  children: ReactNode;
}

const BlockerProvider = ({ children }: BlockerProviderProps): Readonly<ReactNode> => {
  const { isLocked, isOpen, onOpen, onClose, onCloseMask, onSuccess, onCheck } = useBlockerProviderData();

  useEffect(() => {
    onCheck();
  }, [onCheck]);

  return (
    <BlockerContext.Provider
      value={useMemo(
        () => ({
          isLocked,
          onOpen,
          onClose: onCloseMask
        }),
        [isLocked, onCloseMask, onOpen]
      )}
    >
      {children}
      <Blocker isShow={isOpen} onCancel={onClose} onClose={onClose} onSuccess={onSuccess} />
    </BlockerContext.Provider>
  );
};

BlockerProvider.propTypes = {
  children: element
};

// Tambahkan tipe pengembalian
const useBlockerContext = (): BlockerContextType => {
  const context = useContext(BlockerContext);

  if (!context) {
    throw new Error('useBlockerContext must be used within a BlockerProvider');
  }

  return context;
};

export { BlockerProvider, useBlockerContext };
