import { redirect } from "next/navigation";

export default function WorkshopRedirect() {
  redirect("/workshop/instructors");
  return null;
} 