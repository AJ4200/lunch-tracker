"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  DateRangePicker,
  Pagination,
  Button,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import {
  parseDate,
  getLocalTimeZone,
  CalendarDate,
} from "@internationalized/date";

import { title } from "@/components/primitives";
import { ITeamMemberDocument } from "@/models/memberModel";
import { getAllTeamMembers } from "@/lib/action";
import DownloadExcel from "@/components/download";

export default function Submissions() {
   const Today = parseDate(new Date().toISOString().slice(0, 10));

   const [teamMembers, setTeamMembers] = useState<ITeamMemberDocument[]>([]);
   const [filteredTeamMembers, setFilteredTeamMembers] = useState<
     ITeamMemberDocument[]
   >([]);
   const [dateRange, setDateRange] = useState<{
     start: CalendarDate;
     end: CalendarDate;
   }>({
     start: parseDate(Today.toString()),
     end: parseDate(Today.toString()),
   });
   const [currentPage, setCurrentPage] = useState(1);
   const [totalPages, setTotalPages] = useState(1);

   useEffect(() => {
     async function fetchTeamMembers() {
       try {
         const response = await getAllTeamMembers();
         if (Array.isArray(response)) {
           setTeamMembers(response);
           handleDateFilter({ start: dateRange.start, end: dateRange.end });
           setTotalPages(Math.ceil(response.length / 10)); // Assuming 10 items per page
         } else {
           console.error("Error fetching team members:", response.message);
         }
       } catch (error) {
         console.error("Error fetching team members:", error);
       }
     }
     fetchTeamMembers();
   }, [currentPage, dateRange.start, dateRange.end]);

   const handleDateFilter = (value: {
     start: CalendarDate;
     end: CalendarDate;
   }) => {
     setDateRange(value);
     setCurrentPage(1); // Reset the current page when the date range changes
     if (!value.start || !value.end) {
       setFilteredTeamMembers(teamMembers);
     } else {
       const filtered = teamMembers.filter((member) => {
         const memberDate = new Date(member.created_At);
         const startDate = value.start.toDate(getLocalTimeZone());
         const endDate = value.end.toDate(getLocalTimeZone());
         startDate.setHours(0, 0, 0, 0);
         endDate.setHours(23, 59, 59, 999);
         return memberDate >= startDate && memberDate <= endDate;
       });
       setFilteredTeamMembers(filtered);
     }
   };

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      <h1 className={title()}>Team Member Submissions</h1>
     <div className=" flex items-center space-x-2">      <DateRangePicker
        className="max-w-sm"
        label="Date range"
        size="sm"
        value={dateRange}
        onChange={handleDateFilter}
      />
      <DownloadExcel filteredTeamMembers={filteredTeamMembers} /></div>

      <Table>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Meal Option</TableColumn>
          <TableColumn>Time</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredTeamMembers
            .slice((currentPage - 1) * 10, currentPage * 10)
            .map((member) => (
              <TableRow key={member._id}>
                <TableCell>{member.Name}</TableCell>
                <TableCell>{member.MealOption}</TableCell>
                <TableCell>
                  {new Date(member.created_At).toLocaleTimeString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex flex-col items-center gap-4">
        <Pagination
          color="primary"
          page={currentPage}
          total={totalPages}
          onChange={setCurrentPage}
        />
        <div className="flex gap-2">
          <Button
            color="default"
            size="sm"
            variant="flat"
            onPress={() =>
              setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
            }
          >
            Previous
          </Button>
          <Button
            color="default"
            size="sm"
            variant="flat"
            onPress={() =>
              setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
