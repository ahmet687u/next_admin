import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type TSubmitButtonType = {
  label: string;
  loadingText: string;
} & Omit<ComponentProps<"button">, "type" | "disabled">;

const SubmitButton = ({ label, loadingText, ...rest }: TSubmitButtonType) => {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} {...rest}>
      {pending ? loadingText : label}
    </button>
  );
};

export default SubmitButton;
