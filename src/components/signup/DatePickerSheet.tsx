import { useEffect, useMemo, useRef, useState, type PointerEvent, type WheelEvent } from "react";

const VISIBLE_SIDE_COUNT = 3;

type DateValue = {
  year: number;
  month: number;
  day: number;
};

type DatePickerSheetProps = {
  value: string;
  onClose: () => void;
  onConfirm: (value: string) => void;
};

type WheelColumnProps = {
  options: number[];
  selectedValue: number;
  suffix: string;
  onChange: (value: number) => void;
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

function formatDate({ year, month, day }: DateValue) {
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function parseDate(value: string): DateValue {
  const [year, month, day] = value.split("-").map(Number);
  const currentDate = new Date();

  if (year && month && day) {
    return { year, month, day };
  }

  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    day: currentDate.getDate(),
  };
}

function WheelColumn({ options, selectedValue, suffix, onChange }: WheelColumnProps) {
  const pointerYRef = useRef<number | null>(null);
  const selectedIndex = options.indexOf(selectedValue);
  const visibleOptions = Array.from(
    { length: VISIBLE_SIDE_COUNT * 2 + 1 },
    (_, index) => options[selectedIndex + index - VISIBLE_SIDE_COUNT] ?? null,
  );

  const moveSelection = (direction: -1 | 1) => {
    const nextIndex = selectedIndex + direction;

    if (nextIndex < 0 || nextIndex >= options.length) {
      return;
    }

    onChange(options[nextIndex]);
  };

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    event.preventDefault();

    if (Math.abs(event.deltaY) < 1) {
      return;
    }

    moveSelection(event.deltaY > 0 ? 1 : -1);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerYRef.current === null) {
      return;
    }

    const diff = event.clientY - pointerYRef.current;

    if (Math.abs(diff) < 24) {
      return;
    }

    moveSelection(diff < 0 ? 1 : -1);
    pointerYRef.current = event.clientY;
  };

  return (
    <div
      onWheel={handleWheel}
      onPointerDown={(event) => {
        pointerYRef.current = event.clientY;
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={handlePointerMove}
      onPointerUp={() => {
        pointerYRef.current = null;
      }}
      onPointerCancel={() => {
        pointerYRef.current = null;
      }}
      className="h-full touch-none select-none overflow-hidden px-1"
    >
      {visibleOptions.map((option, index) => {
        if (option === null) {
          return <div key={`empty-${index}`} className="h-9" />;
        }

        const isSelected = option === selectedValue;

        return (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`flex h-9 w-full snap-center items-center justify-center rounded-[10px] text-[22px] leading-9 ${
              isSelected
                ? "font-extrabold text-[#202126]"
                : "font-semibold text-[#D4D6E2]"
            }`}
          >
            {option}
            {suffix}
          </button>
        );
      })}
    </div>
  );
}

export default function DatePickerSheet({ value, onClose, onConfirm }: DatePickerSheetProps) {
  const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState<DateValue>(() => parseDate(value));

  const years = useMemo(
    () => Array.from({ length: currentYear - 1920 + 1 }, (_, index) => 1920 + index),
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
      setSelectedDate((prev) => ({ ...prev, day: lastDay }));
    }
  }, [selectedDate.day, selectedDate.month, selectedDate.year]);

  const updateSelectedDate = (nextValue: Partial<DateValue>) => {
    setSelectedDate((prev) => ({ ...prev, ...nextValue }));
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
          onClick={() => onConfirm(formatDate(selectedDate))}
          className="mt-5 flex h-[54px] w-full items-center justify-center rounded-[9px] bg-[#373840] text-[18px] font-extrabold leading-[22px] text-white transition-colors hover:bg-[#4A4B54]"
        >
          완료
        </button>
      </div>
    </div>
  );
}
