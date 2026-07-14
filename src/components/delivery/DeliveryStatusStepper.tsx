import { Fragment } from "react";

type DeliveryStep = {
  label: string;
  state: "done" | "current" | "pending";
};

const steps: DeliveryStep[] = [
  { label: "물건 픽업", state: "done" },
  { label: "전달중", state: "current" },
  { label: "전달 완료", state: "pending" },
];

export default function DeliveryStatusStepper() {
  return (
    <section className="mt-[42px]" aria-label="전달 진행 상태">
      <div className="grid grid-cols-[24px_1fr_24px_1fr_24px] items-center px-4">
        {steps.map((step, index) => (
          <Fragment key={step.label}>
            <div className="flex justify-center">
              <span
                className={`flex h-[19px] w-[19px] items-center justify-center rounded-full ${
                  step.state === "done"
                    ? "bg-[#373840]"
                    : step.state === "current"
                      ? "bg-[#DAD8FF]"
                      : "bg-[#E2E4EE]"
                }`}
              >
                {step.state === "current" ? (
                  <span className="h-[9px] w-[9px] rounded-full bg-[#8581FF]" />
                ) : null}
              </span>
            </div>

            {index < steps.length - 1 ? (
              <div
                className={`h-[2px] ${
                  index === 0 ? "bg-[#373840]" : "bg-[#E3E5EE]"
                }`}
              />
            ) : null}
          </Fragment>
        ))}
      </div>

      <div className="mt-[11px] grid grid-cols-3 text-center text-[12px] font-bold leading-[17px]">
        {steps.map((step) => (
          <span
            key={step.label}
            className={step.state === "current" ? "text-[#706CFF]" : "text-[#737684]"}
          >
            {step.label}
          </span>
        ))}
      </div>
    </section>
  );
}
