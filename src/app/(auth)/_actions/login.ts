import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const login = async (formData: FormData): Promise<void> => {
  "use server";

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // @TODO: usually validation should happen here using zod
  if (email && password) {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Incorrect password");
    }

    const cookieStore = await cookies();

    cookieStore.set({
      name: "travel-app",
      value: user.id.toString(),
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "lax",
    });

    return redirect("/travel");
  }
};
