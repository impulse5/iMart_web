import * as React from "react"
import { cn } from "../../../lib/utils"

const Input = React.forwardRef(({ className, type, label, ...props }, ref) => {
  return (
    <div>
      {label && <label className="font-medium">{label}</label>}
      <input
        type={type}
        className={cn(
          "flex h-8 w-full text-primary rounded-sm border-2 border-[#A3A3A3] bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus:border-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:border-none disabled:bg-[#A3A3A3] disabled:text-primary disabled:placeholder:text-center",
          className
        )}
        ref={ref}
        {...props} 
      />
    </div>
  );
})

Input.displayName = "Input"

export { Input }
