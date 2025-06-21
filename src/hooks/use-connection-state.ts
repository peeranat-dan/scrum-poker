import { useEffect, useState } from 'react';
import { usePageVisibility } from './use-page-visibility';

type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

export function useConnectionState() {
  const [connectionState, setConnectionState] = useState<ConnectionState>('connecting');
  const isVisible = usePageVisibility();

  useEffect(() => {
    if (!isVisible) {
      setConnectionState('disconnected');
      return;
    }

    if (connectionState === 'disconnected') {
      setConnectionState('reconnecting');
      // Add a small delay to prevent simultaneous reconnection attempts
      const timer = setTimeout(() => {
        setConnectionState('connected');
      }, 100);
      return () => clearTimeout(timer);
    }

    if (connectionState === 'connecting') {
      setConnectionState('connected');
    }
  }, [isVisible, connectionState]);

  const isConnected = connectionState === 'connected';
  const isReconnecting = connectionState === 'reconnecting';

  return {
    connectionState,
    isConnected,
    isReconnecting,
    setConnectionState,
  };
}