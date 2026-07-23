import type { UserRole } from "../../types/user";

type RoleAvatarProps = {
  role: UserRole;
};

export function RoleAvatar({ role }: RoleAvatarProps) {
  const isCarrier = role === "carrier";

  return (
    <div
      className={`relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-[#E3E5EF] bg-white shadow-sm min-[390px]:h-[76px] min-[390px]:w-[76px] ${
        isCarrier ? "bg-[#F0F1FF]" : "bg-[#FFF8EE]"
      }`}
      aria-label={isCarrier ? "배송자 프로필" : "발송자 프로필"}
      role="img"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/Logo.png"
          alt=""
          className={`object-contain ${
            isCarrier
              ? "h-8 w-8 min-[390px]:h-12 min-[390px]:w-12"
              : "h-7 w-7 rotate-[-8deg] min-[390px]:h-11 min-[390px]:w-11"
          }`}
        />
      </div>
    </div>
  );
}
