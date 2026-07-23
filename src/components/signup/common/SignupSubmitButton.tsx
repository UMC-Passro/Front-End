import type { ReactNode } from "react";
import { SIGNUP_PRIMARY_BUTTON_CLASS } from "./styles";

type SignupSubmitButtonProps = {
  children: ReactNode;
};

export default function SignupSubmitButton({
  children,
}: SignupSubmitButtonProps) {
  return (
    <button type="submit" className={SIGNUP_PRIMARY_BUTTON_CLASS}>
      {children}
    </button>
  );
}

