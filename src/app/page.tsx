import { NeedVerification } from "@/components/verification/NeedVerification";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  const dbUser = await db.user.findFirst({
    where: {
      id: session?.user.id
    }
  })

  if(!session) redirect("/sign-in")

  return (
    <div className="flex flex-col items-center text-zinc-100">
      {
        dbUser?.role === "GUEST" ? 
          <NeedVerification/>
        :
          <div></div>
      }
    </div> 
  )
}