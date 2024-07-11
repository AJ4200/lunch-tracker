import React from "react";
import { DateRangePicker } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";

interface DateFilterProps {
  dateRange: { start: CalendarDate; end: CalendarDate };
  onDateChange: (value: { start: CalendarDate; end: CalendarDate }) => void;
}

const DateFilter: React.FC<DateFilterProps> = ({ dateRange, onDateChange }) => {
  return (
    <DateRangePicker
      className="max-w-sm"
      label="Date range"
      size="sm"
      value={dateRange}
      onChange={onDateChange}
    />
  );
};

export default DateFilter;
