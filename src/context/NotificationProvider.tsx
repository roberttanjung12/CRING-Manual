'use client';

import { type ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { element } from 'prop-types';
import { getValidAccessToken } from '@/utility/local-storage';
import { useAuthenticationProvider } from './AuthenticationProvider';

// Tipe untuk pesan notifikasi
interface NotificationMessage {
  [key: string]: any;
  isPush?: boolean;
  receivedAt?: Date;
}

// Tipe context
interface NotificationContextType {
  messages: NotificationMessage[];
  onPostMessage: (message: string | object) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

interface NotificationProviderProps {
  children: ReactNode;
}

const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const getToken = getValidAccessToken();

  const { ID } = useAuthenticationProvider();

  const [messages, setMessages] = useState<NotificationMessage[]>([]);

  const onPostMessage = useCallback((message: string | object) => {
    const messageConvert: NotificationMessage = {};

    if (typeof message === 'string') Object.assign(messageConvert, { ...JSON.parse(message) });
    else if (typeof message === 'object') Object.assign(messageConvert, { ...message });

    setMessages(prevValue => {
      const copyValue = [...prevValue];

      copyValue.push({
        ...messageConvert,
        isPush: true,
        receivedAt: new Date()
      });

      return copyValue;
    });
  }, []);

  useEffect(() => {
    if (ID && getToken) {
      const socket = new WebSocket(`${process.env.NEXT_PUBLIC_WS}/${ID}`, [getToken]);

      socket.onopen = () => {
        socket.onmessage = event => {
          onPostMessage(event.data);
        };

        setInterval(() => {
          socket.send('PING!');
        }, 50000);
      };

      return () => {
        if (socket) {
          socket.close();
        }
      };
    }
  }, [ID, getToken, onPostMessage]);

  return (
    <NotificationContext.Provider value={useMemo(() => ({ messages, onPostMessage }), [messages, onPostMessage])}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: element
};

const useNotificationContext = (): NotificationContextType => {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }

  return context;
};

export { NotificationProvider, useNotificationContext };
