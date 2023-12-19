import { getIsRoleChoosed } from "@/server/actions/users"
import { Dashboard } from "@/components/Dashboard";
import { NeedVerification } from "@/components/NeedVerification";
import { getAuthSession } from "@/lib/auth";

export default async function Home() {
  const session = await getAuthSession();
  const isRoleChoosed = await getIsRoleChoosed(session?.user.id);

  return (
    <div className="flex flex-col items-center text-zinc-100">
      {session ? 
        (isRoleChoosed ? 
          <Dashboard user={session.user}/>
        :
          <NeedVerification userId={session.user.id}/>)
      : 
        <div>
          Gotta be singed in
        </div>
      }
    </div> 
  )
}
///useleess comment to fix bug