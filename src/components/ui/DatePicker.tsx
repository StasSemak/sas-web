"use client"

import * as React from "react"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/Button"
import { Calendar } from "@/components/ui/Calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/Popover"
import { uk } from "date-fns/locale"

type Props = {
    placeholder: string;
    changeHandler: (value: Date) => void;
}

export function DatePicker({placeholder, changeHandler}: Props) {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"light"}
          className={cn(
            "w-full justify-start text-left font-normal h-12",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP", {locale: uk}) : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(value) => {
            setDate(value)
            if(value) changeHandler(value)
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
