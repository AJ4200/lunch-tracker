import React from "react";
import { CalendarDate } from "@internationalized/date";

import Download from "@/components/download";
import { ITeamMemberDocument } from "@/models/memberModel";

interface DownloadButtonProps {
  dateRange: { start: CalendarDate; end: CalendarDate };
  filteredTeamMembers: ITeamMemberDocument[];
}

const DownloadButton: React.FC<DownloadButtonProps> = ({
  dateRange,
  filteredTeamMembers,
}) => {
  return (
    <Download dateRange={dateRange} filteredTeamMembers={filteredTeamMembers} />
  );
};

export default DownloadButton;
