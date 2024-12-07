import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logout = async () => {
  "use server";

  const cookieStore = await cookies();

  cookieStore.delete("travel-app");

  redirect("/login");
};
