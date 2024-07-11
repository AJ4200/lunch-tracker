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

import { createTeamMember } from "@/lib/action";

export default function Home() {
  const [name, setName] = useState("");
  const [mealOption, setMealOption] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    if (!name || !mealOption) {
      setError("Please fill in all the required fields.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append("Name", name);
      formData.append("MealOption", mealOption);
      await createTeamMember(formData);
      setName("");
      setMealOption("");
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(
        "An error occurred while submitting the form. Please try again."
      );
      setSuccess(false);
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
          <Popover
            color={
              error
                ? "danger"
                : loading
                ? "foreground"
                : success
                ? "success"
                : undefined
            }
            placement="right"
            showArrow={true}
          >
            <PopoverTrigger>
              <Button isLoading={loading} onClick={handleSubmit}>
                {loading ? "" : "Submit"}
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              {loading ? (
                "Submitting..."
              ) : error ? (
                <div className="px-1 py-2">
                  <div className="text-small font-bold">Error</div>
                  <div className="text-tiny">{error}</div>
                </div>
              ) : success ? (
                <div className="px-1 py-2">
                  <div className="text-small font-bold">
                    Staff Meal Submitted
                  </div>
                  <div className="text-tiny">
                    The team member&apos;s staff meal has been successfully
                    submitted.
                  </div>
                </div>
              ) : (
                ""
              )}
            </PopoverContent>
          </Popover>
        </CardFooter>
      </Card>
    </section>
  );
}
