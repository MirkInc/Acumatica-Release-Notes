import { redirect } from "next/navigation";
import { getDefaultReleasePath } from "@/lib/routes";

export default function Home() {
  redirect(getDefaultReleasePath());
}
