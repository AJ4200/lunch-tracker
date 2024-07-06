import React from "react";
import { Button } from "@nextui-org/react";

import { ITeamMemberDocument } from "@/models/memberModel";
import { exportToExcel } from "@/utils/excel";

interface DownloadExcelProps {
  filteredTeamMembers: ITeamMemberDocument[];
}

export default function DownloadExcel({
  filteredTeamMembers,
}: DownloadExcelProps) {
  const handleDownloadExcel = () => {
    const data = filteredTeamMembers.map(
      ({ Name, MealOption, created_At }) => ({
        Name,
        MealOption,
        Time: new Date(created_At).toLocaleTimeString(),
      })
    );
    exportToExcel(data, "Staff Meal Submissions");
  };

  return (
    <Button color="default" radius="sm"  onClick={handleDownloadExcel}>
      Download
    </Button>
  );
}
