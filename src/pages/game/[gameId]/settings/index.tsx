import { generatePath, Navigate, useParams } from 'react-router';

export default function GameSettingsPage() {
  const { gameId } = useParams<{ gameId: string }>();

  if (!gameId) {
    return <Navigate to='/not-found' replace />;
  }

  return <Navigate to={generatePath('/game/:gameId/settings/general', { gameId })} replace />;
}
