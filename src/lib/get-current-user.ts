import "server-only";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("travel-app")?.value;

  if (!userCookie) {
    return undefined;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userCookie,
    },
  });

  if (!user) {
    return undefined;
  }

  return user;
}
