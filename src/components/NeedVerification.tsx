import { VerificationForm } from "./VerificationForm"

export const NeedVerification = ({userId}: {userId: string}) => {

    return(
        <div className="h-full flex flex-col gap-6 items-center justify-center text-white max-w-[600px] -mt-8">
            <h2 className="text-xl md:text-2xl text-center">Щоб розблокувати більше можливостей, оберіть свій статус</h2>
            <VerificationForm userId={userId}/>
        </div>
    )
}