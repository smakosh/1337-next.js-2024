import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";

export async function POST(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not found or unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { vehicleType, from, to, day, time, image, description } = body;

    const currentDate = new Date();

    if (
      !vehicleType ||
      !from ||
      !to ||
      !day ||
      !time ||
      !image ||
      !description
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await prisma.trip.create({
      data: {
        userId: user.id,
        type: vehicleType,
        from,
        to,
        day,
        time,
        image,
        description,
        isPast: new Date(day) < currentDate,
      },
    });

    return NextResponse.redirect(new URL("/old-travel", req.url));
  } catch (error) {
    console.error("Error creating trip:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json(
        { error: "User not found or unauthorized" },
        { status: 401 }
      );
    }

    const searchParams = req.nextUrl.searchParams;
    const tripId = searchParams.get("tripId");

    if (!tripId) {
      return NextResponse.json(
        { error: "Trip ID is required" },
        { status: 400 }
      );
    }

    await prisma.trip.delete({
      where: {
        id: tripId,
        AND: {
          userId: user.id,
        },
      },
    });

    return NextResponse.redirect(new URL("/old-travel", req.url));
  } catch (error) {
    console.error("Error deleting trip:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
