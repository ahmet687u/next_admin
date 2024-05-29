import { ComponentProps } from "react";
import { UseFormRegister } from "react-hook-form";

type TFormGroupProps<T> = {
  id: T;
  label: string;
  register?: UseFormRegister<any>;
} & ComponentProps<"input">;

const className: string = "text-gray-900";

const FormGroup = <T,>({
  id,
  label,
  required,
  register,
  ...rest
}: TFormGroupProps<T>) => {
  return (
    <div className="flex mt-10">
      <label htmlFor={id ? id : ""}>{label}</label>
      {register ? (
        <input
          type="text"
          className={className}
          {...register(id as string, { required })}
          {...rest}
        />
      ) : (
        <input type="text" className={className} {...rest} />
      )}
    </div>
  );
};

export default FormGroup;