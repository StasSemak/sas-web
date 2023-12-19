import { SignIn } from "@/components/SignIn"
import logo from "../../../public/img/logo_blue.png" 
import Image from "next/image"

const SignInPage = async () => {
    return(
        <div className="w-full h-[calc(100vh-216px)] flex flex-col justify-center items-center bg-blue-950">
            <div className="max-w-[600px] flex flex-col mx-2 gap-6 items-center bg-zinc-100 p-12 rounded-2xl">
                <Image 
                    src={logo}
                    alt="Логотип НУВГП"
                    className="select-none"
                />
                <p className="text-blue-950 text-sm md:text-lg font-medium text-center">Увійдіть у додаток, використовуючи корпоративний обліковий запис</p>
                <SignIn/>
            </div>
        </div>
    )
}

export default SignInPage