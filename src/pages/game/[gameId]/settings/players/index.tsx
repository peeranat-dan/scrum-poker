import ParticipantDataTable from '@/containers/participant-data-table/participant-data-table';

export default function GameSettingsPlayersListPage() {
  return (
    <div className='relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4'>
      <h2>Game Players</h2>
      <ParticipantDataTable />
    </div>
  );
}
