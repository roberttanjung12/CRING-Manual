'use client';

import { type ReactNode, createContext, useContext, useEffect, useMemo } from 'react';
import DownloadProviderWrapper from './components/Wrapper';
import useDownloadProviderAdd from './hooks/useAdd';
import useDownloadProviderFlag from './hooks/useFlag';

interface Props {
  children: ReactNode;
}

const DownloadContext = createContext<{
  onDownload: (args: { name: string; mimeType: string; ext: string; endpoint: any }) => Promise<void>;
}>({
  onDownload: async () => {}
});

/**
 * A provider that's designed for show download.
 *
 * @param {Object} props list of prop
 * @param {React.JSX} props.children node children
 *
 * @returns {React.JSX} download ui.
 */
const DownloadProvider = ({ children }: Props): Readonly<ReactNode> => {
  const { onGet, onAdd, onDelete } = useDownloadProviderFlag();

  const onDownload: any = useDownloadProviderAdd({ onAddFlag: onAdd });

  useEffect(() => {
    onGet();
  }, [onGet]);

  return (
    <DownloadContext.Provider value={useMemo(() => ({ onDownload }), [onDownload])}>
      {children}
      <DownloadProviderWrapper onDelete={onDelete} />
    </DownloadContext.Provider>
  );
};

const useDownloadContext = () => useContext(DownloadContext);

export { DownloadProvider, useDownloadContext };

export default DownloadProvider;
