import React from "react";

import {
  FieldErrorsImpl,
  FieldValues,
  Path,
  UnPackAsyncDefaultValues,
  UseFormRegister,
} from "react-hook-form";

//heroicons
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

function Form(props: React.HTMLAttributes<HTMLDivElement>) {
  const { children, className = "", ...rest } = props;

  return (
    <div className={`flex flex-col gap-1 ${className}`} {...rest}>
      {children}
    </div>
  );
}

interface IFormInput<T extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<T>;
  name: Path<UnPackAsyncDefaultValues<T>>;
  errors?: Partial<FieldErrorsImpl<T>>;
}

export function FormInput<T extends FieldValues>(props: IFormInput<T>) {
  const { register, name, errors, className = "", type, ...rest } = props;
  const [isShowPassword, setIsShowPassword] = React.useState(false);

  const Wrapper = type == "password" ? "div" : React.Fragment;
  const Eye = isShowPassword ? EyeIcon : EyeSlashIcon;
  const attributes = type == "password" ? { className: "relative" } : {};

  return (
    <>
      <Wrapper {...attributes}>
        <input
          type={isShowPassword ? "text" : type}
          className={`p-2 w-full outline-none dark:bg-gray-700 dark:text-white rounded-lg border border-gray-400 ${className}`}
          {...rest}
          {...register(name)}
        />

        {type === "password" && (
          <Eye
            className="absolute right-4 top-3 w-5 h-5 cursor-pointer"
            onClick={() => setIsShowPassword((showPassword) => !showPassword)}
          />
        )}
      </Wrapper>

      {errors && name in errors && errors[name]?.message && (
        <span className="text-sm text-red-500">
          {errors[name]!.message as string}
        </span>
      )}
    </>
  );
}

interface IFormLabel extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean;
}

export const FormLabel = (props: IFormLabel) => {
  const { children, className = "", isRequired = false, ...rest } = props;
  return (
    <label className={`text-sm ${className}`} {...rest}>
      {children} {isRequired && <span className="text-red-500 text-lg">*</span>}
    </label>
  );
};

export default Object.assign(Form, {
  Group: Form,
  Input: FormInput,
  Label: FormLabel,
});
