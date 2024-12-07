import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/get-current-user";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export const deleteTrip = async (id: string) => {
  "use server";

  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  // @TODO: error handling
  await prisma.trip.delete({
    where: {
      id,
      AND: {
        userId: user.id,
      },
    },
  });

  revalidatePath("/travel");
};
