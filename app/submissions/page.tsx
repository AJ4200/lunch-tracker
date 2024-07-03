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
import axios from "axios";
import {
  parseDate,
  getLocalTimeZone,
  CalendarDate,
} from "@internationalized/date";

import { title } from "@/components/primitives";

export default function Submissions() {
  const Today = parseDate(new Date().toISOString().slice(0, 10));

  const [lunches, setLunches] = useState([]);
  const [filteredLunches, setFilteredLunches] = useState([]);
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
    async function fetchLunches() {
      try {
        const response = await axios.get("/api/users");
        setLunches(response.data.lunches);
        setFilteredLunches(response.data.lunches);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching lunches:", error);
      }
    }
    fetchLunches();
  }, [currentPage]);

  const handleDateFilter = (value: {
    start: CalendarDate;
    end: CalendarDate;
  }) => {
    setDateRange(value);
    setCurrentPage(1); // Reset the current page when the date range changes
    if (!value.start || !value.end) {
      setFilteredLunches(lunches);
    } else {
      const filtered = lunches.filter((lunch: any) => {
        const lunchDate = new Date(lunch.created_At);
        return (
          lunchDate >= value.start.toDate(getLocalTimeZone()) &&
          lunchDate <= value.end.toDate(getLocalTimeZone())
        );
      });
      setFilteredLunches(filtered);
    }
  };

  return (
    <div className="flex flex-col items-center w-full space-y-4">
      <h1 className={title()}>Lunch Submissions</h1>
      <DateRangePicker
        className="max-w-sm"
        label="Date range"
        value={dateRange}
        onChange={handleDateFilter}
      />
      <Table>
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Meal Option</TableColumn>
          <TableColumn>Time</TableColumn>
        </TableHeader>
        <TableBody>
          {filteredLunches.map((lunch: any) => (
            <TableRow key={lunch.id}>
              <TableCell>{lunch.Name}</TableCell>
              <TableCell>{lunch.MealOption}</TableCell>
              <TableCell>
                {new Date(lunch.created_At).toLocaleTimeString()}
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
