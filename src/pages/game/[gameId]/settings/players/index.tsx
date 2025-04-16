import ParticipantDataTable from "@/containers/participant-data-table/participant-data-table";

export default function GameSettingsPlayersListPage() {
  return (
    <div className="flex flex-col w-full gap-8 relative px-4 max-w-5xl mx-auto">
      <h2>Game Players</h2>
      <ParticipantDataTable />
    </div>
  );
}
