import { Link, useLocation } from "react-router-dom";
import { HomeNavIcon, CategoryNavIcon, SearchNavIcon, PersonNavIcon, CartNavIcon } from "./NavIcons";

const NAV_ITEMS = [
  { key: "home", Icon: HomeNavIcon, to: "/", label: "Home" },
  { key: "category", Icon: CategoryNavIcon, to: "/", label: "Category" },
  { key: "search", Icon: SearchNavIcon, to: "/search", label: "Search" },
  { key: "my", Icon: PersonNavIcon, to: "/", label: "My" },
  { key: "cart", Icon: CartNavIcon, to: "/", label: "Cart", badge: "10" },
];

// Only routes that actually exist claim a tab; placeholder tabs (category/my/cart)
// share "/" as a stand-in link but must never appear active.
const ACTIVE_KEY_BY_PATH: Record<string, string> = {
  "/": "home",
  "/search": "search",
};

export default function BottomNavBar() {
  const { pathname } = useLocation();
  const activeKey = ACTIVE_KEY_BY_PATH[pathname];

  return (
    <nav className="bg-white border-t border-[#EBEBEB] fixed bottom-0 left-0 w-full flex items-stretch pb-safe md:hidden z-50">
      {NAV_ITEMS.map((item) => {
        const active = item.key === activeKey;
        return (
          <Link
            key={item.label}
            to={item.to}
            aria-label={item.label}
            className="flex-1 flex flex-col items-center justify-center py-[10px]"
          >
            <div className="relative size-6">
              <item.Icon className={active ? "text-[#3B82F6]" : "text-[#9E9E9E]"} />
              {item.badge && (
                <span className="absolute -top-1.5 -right-2 bg-[#3479F5] text-white text-[9px] font-bold size-4 flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
