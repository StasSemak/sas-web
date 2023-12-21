import { VerificationForm } from "./VerificationForm"

export const NeedVerification = () => {

    return(
        <div className="h-80 flex flex-col gap-6 items-center justify-center text-white max-w-[600px]">
            <h2 className="text-xl md:text-2xl text-center">Щоб розблокувати більше можливостей, оберіть свій статус</h2>
            <VerificationForm/>
        </div>
    )
}