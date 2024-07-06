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
        <CardHeader>KFC Modimolle Staff Meal Submission Form</CardHeader>
        <CardBody className="space-y-2">
          <Input
            label="Team Member"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Select
            label="Staff Meal Option"
            value={mealOption}
            onChange={handleMealOptionChange}
          >
            <SelectItem key="Miniloaf + 1pc">Mini Loaf + 1 Piece</SelectItem>
            <SelectItem key="4 Zinger Wings">4 Zinger Wings</SelectItem>
            <SelectItem key="Coleslaw + 1pc">Coleslaw + 1 Piece</SelectItem>
            <SelectItem key="2 Snack Burger">2 Snack Burgers</SelectItem>
            <SelectItem key="Crunch Burger">Crunch Burger</SelectItem>
            <SelectItem key="Extra Pap">Extra Pap</SelectItem>
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
                "Submitting..."
              ) : (
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Staff Meal Submitted</div>
                  <div className="text-tiny">
                    The team member&apos;s staff meal has been successfully submitted.
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
