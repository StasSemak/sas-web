import { NeedVerification } from "@/components/verification/NeedVerification";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  if(!session?.user) redirect("/sign-in")

  const dbUser = await db.user.findFirst({
    where: {
      id: session?.user.id
    }
  })

  if(dbUser && dbUser.role !== "GUEST") redirect("/app")

  return (
    <div className="flex flex-col items-center text-zinc-100">
      <NeedVerification/>
    </div> 
  )
}