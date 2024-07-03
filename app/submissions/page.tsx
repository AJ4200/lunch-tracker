"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  DateRangePicker,
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

const currentYear = Today.year;
const currentMonth = Today.month.toString().padStart(2, "0");

const monthEnd = parseDate(`${currentYear}-${currentMonth}-01`)
  .add({
    months: 1,
  })
  .subtract({
    days: 1,
  });

  const [lunches, setLunches] = useState([]);
  const [filteredLunches, setFilteredLunches] = useState([]);
  const [dateRange, setDateRange] = useState<{
    start: CalendarDate;
    end: CalendarDate;
  }>({
    start: parseDate(Today.toString()),
    end: parseDate(monthEnd.toString()),
  });
  useEffect(() => {
    async function fetchLunches() {
      try {
        const response = await axios.get("/api/users");
        setLunches(response.data);
        setFilteredLunches(response.data);
      } catch (error) {
        console.error("Error fetching lunches:", error);
      }
    }
    fetchLunches();
  }, []);

  const handleDateFilter = (value: {
    start: CalendarDate;
    end: CalendarDate;
  }) => {
    setDateRange(value);
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
    </div>
  );
}
