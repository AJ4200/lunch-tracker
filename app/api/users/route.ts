import { NextResponse } from "next/server";

import prisma from "@/lib/db";

export async function GET(request: Request) {
  try {
    const lunches = await prisma.teamMember.findMany();
    return NextResponse.json(lunches, { status: 200 });
  } catch (error) {
    console.error("Error fetching lunches:", error);
    return NextResponse.json(
      { error: "Unable to fetch lunches" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, mealOption } = await request.json();

    const newMember = await prisma.teamMember.create({
      data: {
        Name: name,
        MealOption: mealOption,
      },
    });

    return NextResponse.json(newMember, { status: 201 });
  } catch (error) {
    console.error("Error creating TeamMember:", error);
    return NextResponse.json(
      { error: "Unable to create TeamMember" },
      { status: 500 }
    );
  }
}
