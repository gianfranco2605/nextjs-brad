"use server";
import { redirect } from "next/navigation";
import { getUserFromCookie } from "../lib/getUser";

export const createHaiku = async function (prevState, formData) {
  const user = await getUserFromCookie();

  if (!user) {
    return redirect("/");
  }

  return { message: "Congrats" };
};
