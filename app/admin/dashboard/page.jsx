import Content from "@/app/components/Dashboard/Content";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/admin/");

  return (
    <div>
      <Content />
    </div>
  )







}
