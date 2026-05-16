import { useEffect, useReducer } from 'react';
import { usePageVisibility } from './use-page-visibility';

type ConnectionState = 'connecting' | 'connected' | 'disconnected' | 'reconnecting';

type Action =
  | { type: 'DISCONNECTED' }
  | { type: 'RECONNECTING' }
  | { type: 'CONNECTED' };

function reducer(state: ConnectionState, action: Action): ConnectionState {
  switch (action.type) {
    case 'DISCONNECTED':
      return 'disconnected';
    case 'RECONNECTING':
      return 'reconnecting';
    case 'CONNECTED':
      return 'connected';
    default:
      return state;
  }
}

export function useConnectionState() {
  const [connectionState, dispatch] = useReducer(reducer, 'connecting');
  const isVisible = usePageVisibility();

  useEffect(() => {
    if (!isVisible) {
      const timer = setTimeout(() => dispatch({ type: 'DISCONNECTED' }), 0);
      return () => clearTimeout(timer);
    }

    if (connectionState === 'disconnected') {
      const timer = setTimeout(() => {
        dispatch({ type: 'RECONNECTING' });
        // Add a small delay to prevent simultaneous reconnection attempts
        setTimeout(() => dispatch({ type: 'CONNECTED' }), 100);
      }, 0);
      return () => clearTimeout(timer);
    }

    if (connectionState === 'connecting') {
      const timer = setTimeout(() => dispatch({ type: 'CONNECTED' }), 0);
      return () => clearTimeout(timer);
    }
  }, [isVisible, connectionState]);

  const isConnected = connectionState === 'connected';
  const isReconnecting = connectionState === 'reconnecting';

  const setConnectionState = (state: ConnectionState) => {
    const actionMap: Record<ConnectionState, Action['type']> = {
      disconnected: 'DISCONNECTED',
      reconnecting: 'RECONNECTING',
      connected: 'CONNECTED',
      connecting: 'CONNECTED',
    };
    dispatch({ type: actionMap[state] });
  };

  return {
    connectionState,
    isConnected,
    isReconnecting,
    setConnectionState,
  };
}