import { cn } from "@/lib/utils"
import { CheckCircle2, XCircle } from "lucide-react"
import toast from "react-hot-toast"

type ToastOptions = {
    content: React.ReactNode;
    type: "success" | "error"
}

export const useCustomToast = () => {
    const customToast = ({content, type}: ToastOptions) => {
        toast.custom((t) => (
            <div
                style={{ animationFillMode: 'forwards' }} 
                className={cn("bg-zinc-100 text-blue-950 shadow-md px-4 py-2 rounded-md inline-flex items-center",
                    t.visible ? 'animate-in slide-in-from-right-[50vw]' : 'animate-out slide-out-to-right-[50vw] fade-out-80'
                )}
            >
                {type === 'success' && <CheckCircle2 className="h-5 w-5 stroke-blue-950 mr-2"/>}
                {type === 'error' && <XCircle className="h-5 w-5 stroke-blue-950 mr-2"/>}
                {content}
            </div>
        ))
    }

    return customToast
}