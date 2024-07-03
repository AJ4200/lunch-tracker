"use client"
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Calendar,
} from "@nextui-org/react";
import { useState, useEffect } from "react";

import { title } from "@/components/primitives";

export default function Submissions() {
  const [lunches, setLunches] = useState([]);
  const [filteredLunches, setFilteredLunches] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    async function fetchLunches() {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setLunches(data);
        setFilteredLunches(data);
      } catch (error) {
        console.error("Error fetching lunches:", error);
      }
    }
    fetchLunches();
  }, []);

  const handleDateFilter = (date:any) => {
    setSelectedDate(date);
    if (date === null) {
      setFilteredLunches(lunches);
    } else {
      const filtered = lunches.filter((lunch:any) => {
        const lunchDate = new Date(lunch.created_At).toDateString();
        const selectedDateString = new Date(date).toDateString();
        return lunchDate === selectedDateString;
      });
      setFilteredLunches(filtered);
    }
  };

  return (
    <div>
      <h1 className={title()}>Lunch Submissions</h1>
      
        
          <Calendar
            value={selectedDate}
            onChange={(date) => handleDateFilter(date)}
          />
        
        
          <Table>
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Meal Option</TableColumn>
              <TableColumn>Time</TableColumn>
            </TableHeader>
            <TableBody>
              {filteredLunches.map((lunch:any) => (
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
