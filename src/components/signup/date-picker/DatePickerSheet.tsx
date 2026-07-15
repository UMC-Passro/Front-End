import { useEffect, useMemo, useState } from "react";
import type { SignupDateValue } from "../../../types/signup";
import {
  formatSignupDate,
  getDaysInMonth,
  parseSignupDate,
} from "../../../utils/signupDate";
import WheelColumn from "./WheelColumn";

type DatePickerSheetProps = {
  value: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
};

export default function DatePickerSheet({
  value,
  onClose,
  onConfirm,
}: DatePickerSheetProps) {
  const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState<SignupDateValue>(() =>
    parseSignupDate(value),
  );
  const years = useMemo(
    () =>
      Array.from(
        { length: currentYear - 1920 + 1 },
        (_, index) => 1920 + index,
      ),
    [currentYear],
  );
  const months = useMemo(
    () => Array.from({ length: 12 }, (_, index) => index + 1),
    [],
  );
  const days = useMemo(
    () =>
      Array.from(
        { length: getDaysInMonth(selectedDate.year, selectedDate.month) },
        (_, index) => index + 1,
      ),
    [selectedDate.month, selectedDate.year],
  );

  useEffect(() => {
    const lastDay = getDaysInMonth(selectedDate.year, selectedDate.month);

    if (selectedDate.day > lastDay) {
      setSelectedDate((previous) => ({ ...previous, day: lastDay }));
    }
  }, [selectedDate.day, selectedDate.month, selectedDate.year]);

  const updateSelectedDate = (nextValue: Partial<SignupDateValue>) => {
    setSelectedDate((previous) => ({ ...previous, ...nextValue }));
  };

  return (
    <div
      className="absolute inset-0 z-30 flex items-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="h-[448px] w-full rounded-t-[30px] border-t-4 border-[#5D8DF7] bg-white px-[17px] pb-2.5 pt-[17px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="date-picker-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto h-1 w-[62px] rounded-full bg-[#DADCE6]" />
        <h2
          id="date-picker-title"
          className="mt-6 text-center text-[24px] font-extrabold leading-[34px] text-[#202126]"
        >
          날짜 선택
        </h2>

        <div className="relative mt-5 h-[252px]">
          <div className="pointer-events-none absolute left-0 right-0 top-1/2 z-0 h-[51px] -translate-y-1/2 rounded-[10px] bg-[#F8F9FD]" />
          <div className="relative z-10 grid h-full grid-cols-3">
            <WheelColumn
              options={years}
              selectedValue={selectedDate.year}
              suffix="년"
              onChange={(year) => updateSelectedDate({ year })}
            />
            <WheelColumn
              options={months}
              selectedValue={selectedDate.month}
              suffix="월"
              onChange={(month) => updateSelectedDate({ month })}
            />
            <WheelColumn
              options={days}
              selectedValue={selectedDate.day}
              suffix="일"
              onChange={(day) => updateSelectedDate({ day })}
            />
          </div>
        </div>

        <button
          type="button"
          onClick={() => onConfirm(formatSignupDate(selectedDate))}
          className="mt-5 flex h-[54px] w-full items-center justify-center rounded-[9px] bg-[#373840] text-[18px] font-extrabold leading-[22px] text-white transition-colors hover:bg-[#4A4B54]"
        >
          완료
        </button>
      </div>
    </div>
  );
}
