"use server";
import { revalidatePath } from "next/cache";

import { connectToMongoDB } from "./db";

import TeamMember, { ITeamMemberDocument } from "@/models/memberModel";

export const createTeamMember = async (formData: FormData) => {
  await connectToMongoDB();
  // Extracting name and meal option from formData
  const name = formData.get("Name");
  const mealOption = formData.get("MealOption");
  try {
    // Creating a new team member using TeamMember model
    const newTeamMember = await TeamMember.create({
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
    console.log(error);
    return { message: "error creating team member" };
  }
};

export const deleteTeamMember = async (id: FormData) => {
  // Extracting team member ID from formData
  const teamMemberId = id.get("id");
  try {
    // Deleting the team member with the specified ID
    await TeamMember.deleteOne({ _id: teamMemberId });
    // Triggering revalidation of the specified path ("/")
    revalidatePath("/");
    // Returning a success message after deleting the team member
    return "team member deleted";
  } catch (error) {
    // Returning an error message if team member deletion fails
    return { message: "error deleting team member" };
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
    console.log(error);
    return { message: "error fetching team members" };
  }
};
