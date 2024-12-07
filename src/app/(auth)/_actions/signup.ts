import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcrypt";

import { prisma } from "@/lib/prisma";

export const signup = async (formData: FormData) => {
  "use server";

  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  try {
    // @TODO: usually validation should happen here using zod
    if (username && password && email) {
      const existingUser = await prisma.user.findFirst({
        where: {
          OR: [{ email }, { username }],
        },
      });

      if (existingUser) {
        throw new Error("User already exists, please login");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      const cookieStore = await cookies();

      cookieStore.set({
        name: "travel-app",
        value: newUser.id.toString(),
        maxAge: 60 * 60 * 24 * 7, // 1 week
        path: "/",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "lax",
      });

      return redirect("/travel");
    }
  } catch {
    throw new Error("Failed to register user");
  }
};
