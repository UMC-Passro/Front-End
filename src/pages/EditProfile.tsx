import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CameraIcon } from "../assets/icons/CameraIcon";
import PageHeader from "../components/common/PageHeader";
import BirthDateField from "../components/signup/detail/BirthDateField";
import DatePickerSheet from "../components/signup/date-picker/DatePickerSheet";
import { formatPhoneNumber } from "../utils/signupFormatters";
import {
    getCurrentUser,
    updateCurrentUserProfile,
} from "../utils/auth";

const editableFieldClassName =
    "min-h-[52px] w-full rounded-[10px] bg-gray-50 px-5 py-[15px] text-[15px] font-medium leading-[22px] text-gray-800 outline-none placeholder:text-gray-500";

function MoveIcon() {
    return (
        <svg
            width="8"
            height="14"
            viewBox="0 0 8 14"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M1 1L7 7L1 13"
                stroke="#B3B5C1"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function EditableProfileField({
    label,
    value,
    placeholder,
    type = "text",
    inputMode,
    autoComplete,
    onChange,
    onBlur,
}: {
    label: string;
    value: string;
    placeholder: string;
    type?: "text" | "tel" | "email";
    inputMode?: "text" | "tel" | "email";
    autoComplete?: string;
    onChange: (value: string) => void;
    onBlur: () => void;
}) {
    return (
        <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium leading-[22px] text-gray-600">
                {label}
            </span>
            <input
                type={type}
                inputMode={inputMode}
                value={value}
                placeholder={placeholder}
                autoComplete={autoComplete}
                onChange={(event) => onChange(event.target.value)}
                onBlur={onBlur}
                className={editableFieldClassName}
            />
        </label>
    );
}

export default function EditProfile() {
    const navigate = useNavigate();
    const currentUser = getCurrentUser();
    const [nickname, setNickname] = useState(
        currentUser?.nickname || currentUser?.name || "패스로 사용자",
    );
    const [name, setName] = useState(currentUser?.name || "");
    const [phone, setPhone] = useState(currentUser?.phone || "");
    const [birthDate, setBirthDate] = useState(currentUser?.birthDate || "");
    const [address, setAddress] = useState(
        currentUser?.address || "서울시 마포구",
    );
    const [email, setEmail] = useState(
        currentUser?.profileEmail || "test@gmail.com",
    );
    const [isNicknameEditing, setIsNicknameEditing] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    return (
        <main className="page-container relative flex h-full min-h-0 flex-col overflow-hidden">
            <PageHeader
                title="프로필 설정"
                onBack={() => navigate(-1)}
                className="shrink-0"
            />

            <div className="scrollbar-hidden min-h-0 flex-1 overflow-y-auto px-1 pb-6">
                <section className="flex flex-col items-center pb-8 pt-8">
                    <div className="relative">
                        <div className="flex h-[110px] w-[110px] items-center justify-center rounded-full bg-purple-100 text-3xl font-bold text-purple-700">
                            {(nickname || name || "?").charAt(0).toUpperCase()}
                        </div>
                        <button
                            type="button"
                            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-md"
                            aria-label="프로필 사진 변경"
                        >
                            <CameraIcon />
                        </button>
                    </div>

                    <div className="mt-8 flex items-center gap-1">
                        {isNicknameEditing ? (
                            <input
                                type="text"
                                value={nickname}
                                autoFocus
                                onChange={(event) =>
                                    setNickname(event.target.value)
                                }
                                onBlur={() => {
                                    setIsNicknameEditing(false);
                                    updateCurrentUserProfile({ nickname });
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.currentTarget.blur();
                                    }
                                }}
                                aria-label="닉네임"
                                className="w-40 border-b border-gray-300 bg-transparent text-center text-2xl font-bold leading-[30px] text-gray-900 outline-none"
                            />
                        ) : (
                            <h2 className="text-2xl font-bold leading-[30px] text-gray-900">
                                {nickname || "닉네임"}
                            </h2>
                        )}
                        <button
                            type="button"
                            onClick={() => setIsNicknameEditing(true)}
                            className="p-1 text-xl leading-none text-gray-500"
                            aria-label="닉네임 수정"
                        >
                            ✎
                        </button>
                    </div>
                </section>

                <div className="flex flex-col gap-5">
                    <EditableProfileField
                        label="이름"
                        value={name}
                        placeholder="이름을 입력해주세요"
                        autoComplete="name"
                        onChange={setName}
                        onBlur={() => updateCurrentUserProfile({ name })}
                    />
                    <EditableProfileField
                        label="전화번호"
                        value={phone}
                        placeholder="전화번호를 입력해주세요"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        onChange={(value) =>
                            setPhone(formatPhoneNumber(value))
                        }
                        onBlur={() => updateCurrentUserProfile({ phone })}
                    />
                    <BirthDateField
                        value={birthDate}
                        validationMessage=""
                        showValidation={false}
                        onOpen={() => setIsDatePickerOpen(true)}
                    />
                    <EditableProfileField
                        label="주소"
                        value={address}
                        placeholder="주소를 입력해주세요"
                        autoComplete="street-address"
                        onChange={setAddress}
                        onBlur={() => updateCurrentUserProfile({ address })}
                    />

                    <EditableProfileField
                        label="이메일"
                        value={email}
                        placeholder="이메일을 입력해주세요"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        onChange={setEmail}
                        onBlur={() =>
                            updateCurrentUserProfile({ profileEmail: email })
                        }
                    />

                    <div className="flex flex-col gap-1.5">
                        <span className="text-sm font-medium leading-[22px] text-gray-600">
                            비밀번호 변경
                        </span>
                        <button
                            type="button"
                            onClick={() => navigate("/mypage/edit/password")}
                            className="flex min-h-[52px] w-full items-center justify-between rounded-[10px] bg-gray-50 px-5 py-[15px] text-left transition-colors hover:bg-gray-100"
                        >
                            <span className="text-base font-medium leading-[22px] text-gray-700">
                                비밀번호 변경
                            </span>
                            <MoveIcon />
                        </button>
                    </div>
                </div>
            </div>

            {isDatePickerOpen ? (
                <DatePickerSheet
                    value={birthDate}
                    onClose={() => setIsDatePickerOpen(false)}
                    onConfirm={(value) => {
                        setBirthDate(value);
                        updateCurrentUserProfile({ birthDate: value });
                        setIsDatePickerOpen(false);
                    }}
                />
            ) : null}
        </main>
    );
}
