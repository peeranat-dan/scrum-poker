import { DataTable } from './data-table';
import { columns } from './columns';
import { mapper } from './utils';
import { useGame } from '@/providers/game';

export default function ParticipantDataTable() {
  const { participants } = useGame();
  const participantsData = mapper(participants);

  return <DataTable columns={columns} data={participantsData} />;
}
