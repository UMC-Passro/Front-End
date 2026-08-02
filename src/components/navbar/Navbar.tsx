import { NavLink } from "react-router-dom";

export default function Navbar() {
    const navList = [
        {
            id: 1,
            title: "홈",
            navigate: "/home",
            imgUrl: "/houseIcon.png",
        },
        {
            id: 2,
            title: "유형 선택",
            navigate: "/user-state-choice",
            imgUrl: "/boxIcon.png",
        },
        {
            id: 3,
            title: "채팅",
            navigate: "/delivery/chat",
            imgUrl: "/messageIcon.png",
        },
        {
            id: 4,
            title: "마이페이지",
            navigate: "/mypage",
            imgUrl: "/userIcon.png",
        },
    ];

    return (
        <nav className="relative z-50 flex w-full items-center justify-center gap-10 bg-white p-1 shadow-[0_-10px_32px_-8px_rgba(0,0,0,0.08)]">
            {navList.map((nav) => (
                <NavLink
                    key={nav.id}
                    to={nav.navigate}
                    title={nav.title}
                    className="group rounded p-3"
                >
                    {({ isActive }) => (
                        <img
                            src={nav.imgUrl}
                            alt={nav.title}
                            width="100"
                            height="100"
                            className={`h-8 w-8 object-contain transition-opacity hover:opacity-80 ${
                                isActive
                                    ? "opacity-100"
                                    : "opacity-35 group-hover:opacity-60"
                            }`}
                        />
                    )}
                </NavLink>
            ))}
        </nav>
    );
}
