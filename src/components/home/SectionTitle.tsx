type SectionTitleProps = {
  children: string;
  accent?: boolean;
};

export function SectionTitle({ children, accent = false }: SectionTitleProps) {
  return (
    <h2
      className={`text-[13px] font-extrabold tracking-normal min-[390px]:text-lg ${
        accent ? "text-[#6469FF]" : "text-[#202126]"
      }`}
    >
      {children}
    </h2>
  );
}
