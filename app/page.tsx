import { redirect } from "next/navigation";

export default function Page() {
  // Permanent redirect to default locale root
  redirect("/tr");
}

