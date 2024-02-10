import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ className, label, type, error, ...props }, ref) => {
    return (
      <>
        <div className="flex w-full auto flex-col items-start mb-2 h-20">
          <span className="text-[15px]">{label}</span>
          <input
            type={type}
            className={cn(
              "block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-2",
              error && "ring-red-500",
              className
            )}
            ref={ref}
            {...props}
          />
          {error && (
            <p className="text-red-600 text-[11px] text-left mt-[3px]">
              This field has required{" "}
            </p>
          )}
        </div>
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
