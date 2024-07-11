"use client";
import React from "react";
import { Spinner } from "@nextui-org/react";
import { parseDate } from "@internationalized/date";

import { title } from "@/components/primitives";
import DateFilter from "@/components/DateFilter";
import DownloadButton from "@/components/DownloadButton";
import SubmissionsTable from "@/components/SubmissionsTable";
import PaginationControls from "@/components/PaginationControls";
import { useTeamMembers } from "@/hooks/useTeamMembers";

export default function Submissions() {
  const Today = parseDate(new Date().toISOString().slice(0, 10));

  const {
    paginatedMembers,
    filteredTeamMembers,
    dateRange,
    loading,
    deleting,
    currentPage,
    totalPages,
    handleDateFilter,
    handleDelete,
    setCurrentPage,
  } = useTeamMembers({ start: Today, end: Today });

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      <h1 className={title()}>Staff Meal Submissions</h1>
      <div className="flex items-center space-x-2">
        <DateFilter dateRange={dateRange} onDateChange={handleDateFilter} />
        <DownloadButton
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
          <SubmissionsTable
            members={paginatedMembers}
            onDelete={handleDelete}
            deleting={deleting}
          />
          {totalPages > 1 && (
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              onPrevPage={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
              onNextPage={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
            />
          )}
        </>
      )}
    </div>
  );
}
