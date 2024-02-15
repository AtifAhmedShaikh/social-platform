import PropTypes from "prop-types";
import { cn } from "@/lib/utils";
import React from "react";

const Input = React.forwardRef(function Form(props, ref) {
  return (
    <>
      <div className="flex w-[75%]  flex-col items-start mb-2 h-20">
        <span className="text-[15px] font-bold mb-1">{props.label}</span>
        <input
          type={props.type}
          className={cn(
            "sm:w-full w-[95%] first-letter:rounded-md rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-2",
            props.error && "ring-red-500",
            props.className
          )}
          {...props}
          ref={ref}
        />
        {props.error && (
          <p className="text-red-600 font-bold text-[13px] text-left mt-[3px]">
            {props?.error?.message}
          </p>
        )}
      </div>
    </>
  );
});

Input.displayName = "Input";

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.object,
  className: PropTypes.string,
};

export { Input };
