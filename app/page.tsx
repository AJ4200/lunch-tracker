"use client";
import { useState } from "react";
import { Input } from "@nextui-org/input";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Select,
  SelectItem,
} from "@nextui-org/react";
import axios from "axios";

import Loader from "@/components/loader";

export default function Home() {
  const [name, setName] = useState("");
  const [mealOption, setMealOption] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await axios.post("/api/users", { Name: name, MealOption: mealOption });
      setName("");
      setMealOption("");
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleMealOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setMealOption(event.target.value);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <Card className="md:p-4 md:w-[50%] w-[95%] ">
        <CardHeader>KFC Mod Team-Member Lunch Submission Form</CardHeader>
        <CardBody className="space-y-2">
          <Input
            label="Team Member"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            label="Lunch Break Meal Option"
            value={mealOption}
            onChange={handleMealOptionChange}
          >
            <SelectItem key="miniloaf+1pc">Mini Loaf + 1 Piece</SelectItem>
            <SelectItem key="4wings">4 Zinger Wings</SelectItem>
          </Select>
        </CardBody>
        <CardFooter>
          {loading ? (
            <Loader />
          ) : (
            <Button onClick={handleSubmit}>Submit</Button>
          )}
        </CardFooter>
      </Card>
    </section>
  );
}
