import React from "react";
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";

import { ITeamMemberDocument } from "@/models/memberModel";
import { exportToExcel, exportToPDF } from "@/utils/export";


interface DownloadProps {
  filteredTeamMembers: ITeamMemberDocument[];
  dateRange: {
    start: CalendarDate;
    end: CalendarDate;
  };
}

export default function Download({
  filteredTeamMembers,
  dateRange,
}: DownloadProps) {
  const handleDownloadExcel = () => {
    const data = filteredTeamMembers.map(
      ({ Name, MealOption, created_At }) => ({
        Name,
        MealOption,
        Time: new Date(created_At).toLocaleTimeString(),
      })
    );
    const startDate = dateRange.start
      .toDate(getLocalTimeZone())
      .toLocaleDateString();
    const endDate = dateRange.end
      .toDate(getLocalTimeZone())
      .toLocaleDateString();
    const dateRangeText = `${startDate} - ${endDate}`;
    exportToExcel(
      data,
      `Staff Meal Submissions (${dateRangeText})`,
      dateRangeText
    );
  };

  const handleDownloadPDF = () => {
    const data = filteredTeamMembers.map(
      ({ Name, MealOption, created_At }) => ({
        Name,
        MealOption,
        Time: new Date(created_At).toLocaleTimeString(),
      })
    );
    const startDate = dateRange.start
      .toDate(getLocalTimeZone())
      .toLocaleDateString();
    const endDate = dateRange.end
      .toDate(getLocalTimeZone())
      .toLocaleDateString();
    const dateRangeText = `${startDate} - ${endDate}`;
    exportToPDF(
      data,
      `Staff Meal Submissions (${dateRangeText})`,
      dateRangeText
    );
  };

  return (
    <Popover placement="bottom" showArrow={true}>
      <PopoverTrigger>
        <Button color="default" radius="sm">
          Download
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2 flex flex-col gap-2">
          <Button color="success" variant="ghost" onClick={handleDownloadExcel}>
            XLSX <FaFileExcel />
          </Button>
          <Button color="danger" variant="ghost" onClick={handleDownloadPDF}>
            PDF <FaFilePdf />
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
