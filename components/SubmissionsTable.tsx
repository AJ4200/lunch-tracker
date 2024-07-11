import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { FaTrash } from "react-icons/fa";

import { ITeamMemberDocument } from "@/models/memberModel";
import { formatTime } from "@/utils/helpers";

interface SubmissionsTableProps {
  members: ITeamMemberDocument[];
  onDelete: (id: string) => void;
  deleting: string | null;
}

const SubmissionsTable: React.FC<SubmissionsTableProps> = ({
  members,
  onDelete,
  deleting,
}) => {
  return (
    <Table>
      <TableHeader>
        <TableColumn>Name</TableColumn>
        <TableColumn>Meal Option</TableColumn>
        <TableColumn>Time</TableColumn>
        <TableColumn>Actions</TableColumn>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member._id}>
            <TableCell>{member.Name}</TableCell>
            <TableCell>{member.MealOption}</TableCell>
            <TableCell>{formatTime(new Date(member.created_At))}</TableCell>
            <TableCell>
              <Button
                color="danger"
                isLoading={deleting === member._id}
                size="sm"
                variant="flat"
                onClick={() => onDelete(member._id)}
              >
                {deleting === member._id ? "" : <FaTrash />  }
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SubmissionsTable;
