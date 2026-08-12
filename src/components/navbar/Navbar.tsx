import { NavLink } from "react-router-dom";

function MarketIcon() {
    return (
        <svg
            viewBox="0 0 32 32"
            className="h-8 w-8"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M6 12h20l-1.4-5H7.4L6 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M8 13v12h16V13M12 25v-6h8v6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M6 12c0 2 1.3 3 3 3s3-1 3-3c0 2 1.3 3 4 3s4-1 4-3c0 2 1.3 3 3 3s3-1 3-3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    );
}

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
            title: "마켓",
            navigate: "/market",
            imgUrl: "/market.png",
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
                        nav.imgUrl ? (
                            <img
                                src={nav.imgUrl}
                                alt={nav.title}
                                width="100"
                                height="100"
                                className={`h-8 w-8 object-contain transition-opacity hover:opacity-80 ${isActive
                                        ? "opacity-100"
                                        : "opacity-35 group-hover:opacity-60"
                                    }`}
                            />
                        ) : (
                            <span
                                className={`block transition-opacity ${isActive
                                        ? "text-purple-600 opacity-100"
                                        : "text-gray-900 opacity-35 group-hover:opacity-60"
                                    }`}
                                aria-label={nav.title}
                            >
                                <MarketIcon />
                            </span>
                        )
                    )}
                </NavLink>
            ))}
        </nav>
    );
}
