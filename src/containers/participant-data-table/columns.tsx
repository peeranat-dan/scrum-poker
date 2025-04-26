import { type ParticipantRole } from "@/data/participant/types";
import { type ColumnDef } from "@tanstack/react-table";

import ParticipantDeletionButton from "../participant-deletion-button";

export type ParticipantRow = {
  id: string;
  name: string;
  updatedAt: string;
  role: ParticipantRole;
  voted: boolean;
};

export const columns: ColumnDef<ParticipantRow>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "updatedAt",
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
          disabled={participant.role === "owner"}
          id={participant.id}
        />
      );
    },
  },
];
