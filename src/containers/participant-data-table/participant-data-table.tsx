import { useGame } from '@/providers/game';

import { columns } from './columns';
import { DataTable } from './data-table';
import { mapper } from './utils';

export default function ParticipantDataTable() {
  const { participants } = useGame();
  const participantsData = mapper(participants);

  return <DataTable columns={columns} data={participantsData} />;
}
