import { type ColumnDef } from "@tanstack/react-table";

import ParticipantDeletionButton from "../participant-deletion-button";

export type ParticipantRow = {
  id: string;
  name: string;
  joinedAt: string;
  isOwner: boolean;
  voted: boolean;
};

export const columns: ColumnDef<ParticipantRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "joinedAt",
    header: "Joined at",
  },
  {
    id: "actions",
    maxSize: 40,
    size: 40,
    cell: ({ row }) => {
      const participant = row.original;

      return (
        <ParticipantDeletionButton
          disabled={participant.isOwner}
          id={participant.id}
        />
      );
    },
  },
];
