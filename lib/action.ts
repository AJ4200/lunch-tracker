"use server";
import { revalidatePath } from "next/cache";
import { connectToMongoDB } from "./db";
import TeamMember, { ITeamMemberDocument } from "@/models/memberModel";

export const createTeamMember = async (formData: FormData) => {
  await connectToMongoDB();
  // Extracting name and meal option from formData
  const name = formData.get("Name") as string | null;
  const mealOption = formData.get("MealOption") as string | null;

  if (!name || !mealOption) {
    return { message: "Name and MealOption are required" };
  }

  try {
    // Creating a new team member using TeamMember model
    const newTeamMember = new TeamMember({
      Name: name,
      MealOption: mealOption,
    });

    // Saving the new team member
    await newTeamMember.save();

    // Triggering revalidation of the specified path ("/")
    revalidatePath("/");

    // Returning the string representation of the new team member
    return newTeamMember.toString();
  } catch (error) {
    return { message: "Error creating team member" };
  }
};

export const deleteTeamMember = async (formData: FormData) => {
  // Extracting team member ID from formData
  const teamMemberId = formData.get("id") as string | null;

  if (!teamMemberId) {
    return { message: "Team member ID is required" };
  }

  try {
    // Deleting the team member with the specified ID
    await TeamMember.deleteOne({ _id: teamMemberId });

    // Returning a success message after deleting the team member
    return "Team member deleted";
  } catch (error) {
    return { message: "Error deleting team member" };
  }
};

export const getAllTeamMembers = async () => {
  await connectToMongoDB();
  try {
    // Fetching all team members from the database
    const teamMembers = await TeamMember.find({});
    // Returning the team members as an array
    return teamMembers;
  } catch (error) {
    return { message: "Error fetching team members" };
  }
};
