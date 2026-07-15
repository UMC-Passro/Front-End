export type SignupStep = "basic" | "detail";

export type SignupGender = "M" | "W" | "NONE";

export type SignupNicknameCheckStatus = "idle" | "available" | "duplicate";

export type SignupDateValue = {
  year: number;
  month: number;
  day: number;
};

export type SignupDetailValidationMessages = {
  name: string;
  phone: string;
  birthDate: string;
  address: string;
};

export type SignupFormData = {
  nickname: string;
  email: string;
  emailCode: string;
  password: string;
  passwordCheck: string;
  name: string;
  phone: string;
  birthDate: string;
  gender: SignupGender;
  address: string;
};

export type SignupFieldUpdater = <K extends keyof SignupFormData>(
  key: K,
  value: SignupFormData[K],
) => void;
