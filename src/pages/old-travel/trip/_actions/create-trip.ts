import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const createTrip = async (
  userId: string | undefined,
  formData: FormData
) => {
  "use server";

  const type = formData.get("vehicleType") as string;
  const from = formData.get("from") as string;
  const to = formData.get("to") as string;
  const day = formData.get("day") as string;
  const time = formData.get("time") as string;
  const image = formData.get("image") as string;
  const description = formData.get("description") as string;

  const currentDate = new Date();

  if (type && from && to && day && time && userId && image && description) {
    await prisma.trip.create({
      data: {
        userId,
        type,
        from,
        to,
        day,
        time,
        image,
        description,
        isPast: new Date(day) < currentDate,
      },
    });
    redirect("/old-travel");
  }
};
