import { Dashboard } from "@/components/Dashboard";
import { NeedVerification } from "@/components/NeedVerification";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export default async function Home() {
  const session = await getAuthSession();
  const dbUser = await db.user.findFirst({
    where: {
      id: session?.user.id
    }
  })

  return (
    <div className="flex flex-col items-center text-zinc-100">
      {session ? 
        (dbUser?.role === "GUEST" ? 
          <NeedVerification/>
        :
          <Dashboard user={session.user}/>
        )
      : 
        <div>
          Gotta be singed in
        </div>
      }
    </div> 
  )
}