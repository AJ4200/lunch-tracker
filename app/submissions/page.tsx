"use client";
import React from "react";
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
  Spinner,
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import {
  parseDate,
  getLocalTimeZone,
  CalendarDate,
} from "@internationalized/date";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

import { title } from "@/components/primitives";
import { ITeamMemberDocument } from "@/models/memberModel";
import { getAllTeamMembers } from "@/lib/action";
import Download from "@/components/download";
import { formatTime } from "@/utils/helpers";

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
    start: Today,
    end: Today,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 7; // Number of items per page

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const response = await getAllTeamMembers();
        if (Array.isArray(response)) {
          setTeamMembers(response);
          handleDateFilter({ start: dateRange.start, end: dateRange.end });
        } else {
          console.error("Error fetching team members:", response.message);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching team members:", error);
        setLoading(false);
      }
    }
    fetchTeamMembers();
  }, []);

  const handleDateFilter = (value: {
    start: CalendarDate;
    end: CalendarDate;
  }) => {
    setDateRange(value);
    const filtered = teamMembers.filter((member) => {
      const memberDate = new Date(member.created_At);
      const startDate = value.start.toDate(getLocalTimeZone());
      const endDate = value.end.toDate(getLocalTimeZone());
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
      return memberDate >= startDate && memberDate <= endDate;
    });
    setFilteredTeamMembers(filtered);
    setTotalPages(Math.ceil(filtered.length / itemsPerPage));
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      <h1 className={title()}>Staff Meal Submissions</h1>
      <div className="flex items-center space-x-2">
        <DateRangePicker
          className="max-w-sm"
          label="Date range"
          size="sm"
          value={dateRange}
          onChange={handleDateFilter}
        />
        <Download
          dateRange={dateRange}
          filteredTeamMembers={filteredTeamMembers}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-48">
          <Spinner />
        </div>
      ) : filteredTeamMembers.length === 0 ? (
        <div className="flex justify-center items-center h-48">
          <p className="font-bold">
            No results found for the selected date range.
          </p>
        </div>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Meal Option</TableColumn>
              <TableColumn>Time</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredTeamMembers
                .slice(
                  (currentPage - 1) * itemsPerPage,
                  currentPage * itemsPerPage
                )
                .map((member) => (
                  <TableRow key={member._id}>
                    <TableCell>{member.Name}</TableCell>
                    <TableCell>{member.MealOption}</TableCell>
                    <TableCell>
                      {formatTime(new Date(member.created_At))}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          {totalPages > 1 && (
            <div className="flex flex-col items-right gap-4 self-end">
              <Pagination
                color="primary"
                page={currentPage}
                size="sm"
                total={totalPages}
                onChange={(page) => setCurrentPage(page)}
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
                  <FaCaretLeft />
                </Button>
                <Button
                  color="default"
                  size="sm"
                  variant="flat"
                  onPress={() =>
                    setCurrentPage((prev) =>
                      prev < totalPages ? prev + 1 : prev
                    )
                  }
                >
                  <FaCaretRight />
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

