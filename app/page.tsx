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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";

import Loader from "@/components/loader";
import { createTeamMember } from "@/lib/action";

export default function Home() {
  const [name, setName] = useState("");
  const [mealOption, setMealOption] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("MealOption", mealOption);
      await createTeamMember(formData);
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
            <SelectItem key="Miniloaf+1pc">Mini Loaf + 1 Piece</SelectItem>
            <SelectItem key="4wings">4 Zinger Wings</SelectItem>
            <SelectItem key="Coleslaw+1pc">Coleslaw + 1 Piece</SelectItem>
            <SelectItem key="2SnackBurger">2 Snack Burgers</SelectItem>
          </Select>
        </CardBody>
        <CardFooter>
          <Popover placement="right">
            <PopoverTrigger>
              <Button isLoading={loading} onClick={handleSubmit}>
                Submit
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              {loading ? (
                "Saving..."
              ) : (
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Lunch Recorded</div>
                  <div className="text-tiny">
                    The team member&apos;s lunch has been successfully recorded.
                  </div>
                </div>
              )}
            </PopoverContent>
          </Popover>
        </CardFooter>
      </Card>
    </section>
  );
}
