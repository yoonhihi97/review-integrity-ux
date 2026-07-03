import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import BottomNavBar from "../components/BottomNavBar";
import coupangLogo from "../assets/coupang-logo.svg";
import iconShoppingBag from "../assets/icons/shopping-bag.svg";
import iconMovie from "../assets/icons/movie.svg";
import iconLeaf from "../assets/icons/leaf.svg";
import iconRestaurant from "../assets/icons/restaurant.svg";
import iconRedeem from "../assets/icons/redeem.svg";
import iconTimer from "../assets/icons/timer.svg";
import iconCheckroom from "../assets/icons/checkroom.svg";
import iconRocketLaunch from "../assets/icons/rocket-launch.svg";
import iconRocket from "../assets/icons/rocket.svg";

type CategoryIcon =
  | { kind: "normal"; icon: string; label: string; bg: string; tag?: string }
  | { kind: "rlux"; label: string };

const CATEGORY_ICONS: CategoryIcon[] = [
  { kind: "normal", icon: iconShoppingBag, label: "자주산상품", bg: "bg-[#FF8000]/10" },
  { kind: "normal", icon: iconMovie, label: "쿠팡플레이", bg: "bg-[#F3F4F6]", tag: "무료시청" },
  { kind: "normal", icon: iconLeaf, label: "로켓프레시", bg: "bg-[#F0FDF4]" },
  { kind: "normal", icon: iconRestaurant, label: "쿠팡이츠", bg: "bg-[#FFF7ED]", tag: "배달비0원" },
  { kind: "normal", icon: iconRedeem, label: "골드박스", bg: "bg-[#FEFCE8]" },
  { kind: "normal", icon: iconTimer, label: "반짝세일", bg: "bg-[#FEF2F2]", tag: "8시간만" },
  { kind: "normal", icon: iconCheckroom, label: "패션/잡화", bg: "bg-[#EFF6FF]" },
  { kind: "rlux", label: "R.LUX" },
  { kind: "normal", icon: iconRocketLaunch, label: "로켓배송", bg: "bg-[#F0F9FF]" },
  { kind: "normal", icon: iconRocket, label: "로켓직구", bg: "bg-[#FAF5FF]" },
];

const DISCOVERY_PRODUCTS = [
  { id: "roller", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCDdRJTYlRpb43d3LnsYyuuw1uzLiEhCK46RQXZbrYio3v9qJVMEQU8vE0tY4j_EQ4sPB0kRYGDJDcFnlrKKKicrbM9Znv26FLd1EJOGMYXWrWruOQWGPqbj07BF1_5VYnajLXODLQwx1lup84WLZ2dTsl426p0_BJbJMXBGS107aZItY36VxOChmfyuXNkWK0-LnOWRxt2C0I6XSzdid7DpOfOKNYIIb-Y4QCFgpM5sWeZ6vz8vXQ_" },
  { id: "protein-cream", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAva7beJ_OlD0rNKdj79EcdubH4oWxRsP1tPo57PknrmCgMi8ySHy8TpprwH30cH-oAjkskbyeHKFXyNyjO7K4ic9QMyqqvaCIb8hmB-1Td4cm5K-z_sS00nAkoodRFCXvNWnlnDE6gVBWG9k2GfyIwDY1cpC5pXKr6ri29RhkhAYXlkYQN5OGJsAnnWhD1CM0Pm_c_AF3Bb5a0xitV5dTd7GIQWOMgise5S-MNLt-E0x5ooJ-Lmckb" },
  { id: "lip-tint-getlove", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBaTdrk0SayqegS91tVHm85MDLP5PCezsZXOv4i6yBauKwqNakOi_cg2UD_J8q0E8q-_Z5n0Us0IRjga9-spH_fsSBv1PQraWwr49tAFhZgfiJLhFSV-OsCoaND9lbw5krnANMZ6RmiVau_zqwheP11A96wG5BQmjr9b91jQQxWYYEMJL2JDnt9ENSgE6cZp9rgvA44lR7v1X-Q3JIpdXLkZnLSsPaLGd6x6BIKMhYoHRMjtEGzLgP" },
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-background pb-20">
      <header className="bg-surface-container-lowest sticky top-0 z-40 border-b border-outline-variant pt-[12px] pb-[13px] px-container-margin">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1">
            <img src={coupangLogo} alt="Coupang" className="h-[22px]" />
          </div>
          <div className="relative">
            <Icon name="notifications" className="text-on-surface text-2xl" />
            <span className="absolute -top-1 -right-2 bg-primary-container text-on-primary text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              38
            </span>
          </div>
        </div>
        <button
          className="relative w-full text-left"
          onClick={() => navigate("/search")}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon name="search" className="text-outline" />
          </div>
          <div className="block w-full pl-10 pr-3 py-2 border-2 border-text-primary rounded-full bg-surface-container-lowest text-text-secondary text-sm">
            쿠팡에서 검색하세요!
          </div>
        </button>
      </header>

      <main className="max-w-screen-md mx-auto">
        <section className="w-full relative bg-[#F7F8E8]">
          <div className="w-full h-48 sm:h-64 relative overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-contain object-center"
              alt="1일 1특가 반값 프로모션 배너"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl5qgSN5YPHVbdqLR9eoYzarruiY6GGxnyKjAhUAaeLGida7iEurUhg3W2ueo6XFsI310XU6rZJieERL8gQd9kxqljl51H-_bZrHoYcwFPCM03krxALM3hL1EVonX3UBhHfKYZ8QoT-YWFqj4_eOIli1R6XOE9E9PmW_81wZpJwkbM-flnJglmBLVmlZ12gCfn_ZeSgPJCWxMWbvYGh4vwvWQF2Bj_DMPzacYLSBhhAdxqnxu7EdQu"
            />
          </div>
          <div className="absolute bottom-3 w-full flex justify-center gap-1.5 z-10">
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full ${
                  i === 0 ? "bg-black/40" : "bg-white border border-black/20"
                }`}
              />
            ))}
          </div>
        </section>

        <section className="bg-surface-container-lowest px-4 pt-6 pb-[25px] grid grid-cols-5 gap-y-6 gap-x-2 border-b border-border-gray">
          {CATEGORY_ICONS.map((c) => (
            <div key={c.label} className="flex flex-col items-center gap-1.5 cursor-pointer">
              {c.kind === "rlux" ? (
                <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl">
                  R.
                </div>
              ) : (
                <div className={`w-12 h-12 ${c.bg} rounded-full flex items-center justify-center relative overflow-hidden`}>
                  {c.tag && (
                    <div className="absolute bottom-0 w-full bg-gray-800 text-white text-[9px] font-bold text-center py-0.5">
                      {c.tag}
                    </div>
                  )}
                  <img src={c.icon} alt="" className={`w-5 h-5 ${c.tag ? "mb-2" : ""}`} />
                </div>
              )}
              <span className="text-label-sm text-text-primary text-center whitespace-nowrap tracking-tight">
                {c.label}
              </span>
            </div>
          ))}
        </section>

        <section className="bg-surface-container-lowest px-4 py-[36px] flex gap-3 overflow-x-auto scrollbar-hide">
          <div className="min-w-[140px] h-[132px] flex-1 bg-[#F4F4F5] rounded-xl p-3 flex flex-col items-center justify-between">
            <div className="text-center mb-2">
              <div className="font-bold text-sm tracking-tight">R.LUX</div>
              <div className="text-xs text-text-secondary">금주의 BEST</div>
            </div>
            <div className="w-20 h-16 bg-white rounded flex items-center justify-center">
              <img
                className="w-full h-full object-contain"
                alt="럭셔리 카드홀더 지갑"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGiE5xXI__ODBlT3jimWYS-mIunVlhaWbGtzeUmSl1GpPuXfQqdHO7aZ5Kc7YMlptDdqLehizZUl8OwOu_qwkd9LHStO1BON8l0tgnF0o_qYNRI1fdlC0i2lLOa1pwm5Jn8nRWk6c01RyLd20X3iAOMsuxAOdp6nTEKU4H8hq1gs_YWNGieGMJ46vQ--5nrKLmmuEnyU1SHdZp6fIBdDYeiQnwnVb5L2xIFkXI4hT4cwCZrkHcB64Q"
              />
            </div>
          </div>
          <div className="min-w-[140px] h-[132px] flex-1 bg-[#E8F3FF] rounded-xl p-3 flex flex-col items-center justify-between">
            <div className="text-center mb-2">
              <div className="font-bold text-sm tracking-tight">삼성전자</div>
              <div className="text-xs text-text-secondary">감사 페스티벌</div>
            </div>
            <div className="w-16 h-16">
              <img
                className="w-full h-full object-contain"
                alt="파란색 하트 아이콘"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1w4ZzMWiaT5nE08SwVKnigyVWJ2xuvGJ3SG9xLMII4Idt84btc_y-d_aKetzYdFFwNmEZo9r9PAbbol_bKODpZBsK0WkJQ8-ZvbP1DgkTF92pAR4aqrWe4zF6p1Egob5w_wH9qhykDEj0itd92TiYqvKbBVavdEJWN1gkq1RqB8gNTTO6kesqrTDTv884392iEcI3m1swDKW_wPS9ZPVWTbCicXQsSie2OiHGl7oJ09w7QbrU2uvN"
              />
            </div>
          </div>
          <div className="min-w-[140px] h-[132px] flex-1 bg-[#EAF7DA] rounded-xl p-3 flex flex-col items-center justify-between">
            <div className="text-center mb-2">
              <div className="font-bold text-sm tracking-tight text-delivery-green">로켓프레시</div>
              <div className="text-xs text-text-secondary">1일 1특가</div>
            </div>
            <div className="w-16 h-16 rounded-full overflow-hidden border border-border-gray">
              <img
                className="w-full h-full object-cover"
                alt="소시지 요리"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGc_AM1eHt-F_tWdHNAHdcyzjb-24s0pxukZdbIl7rEOYxIhLzpsX5skTkgo1kuhb_IVcja-4wnKLfxN_gqIBzCo9fW8ndOO3FzYIqYX6JxBP_iabl4LweWennuCgi43bPgDBAb6QiTqpTalhxU1B-upzoO5bvl79vJQzLGyFWenQo6EyzIribvSCUUmlPHMBhPhaiLeAMLmy_Gl7SpfTZ8bxj9nXnjj39nkiYsaN2VI0efSzTtpA9"
              />
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest pt-[33px] px-4 pb-[32px] border-t border-border-gray">
          <div className="flex justify-between items-end mb-4">
            <div className="flex items-center gap-2">
              <Icon name="shopping_bag" filled className="text-pink-500" />
              <h2 className="text-headline-sm-mobile text-text-primary">이 상품 놓치지 마세요!</h2>
            </div>
            <button className="text-primary text-body-md flex items-center" onClick={() => navigate("/search")}>
              더보기 <Icon name="chevron_right" className="text-sm" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {DISCOVERY_PRODUCTS.map((p) => (
              <button
                key={p.id}
                className="flex flex-col gap-2"
                onClick={() => navigate(`/product/${p.id}`)}
              >
                <div className="aspect-square bg-white rounded-lg border border-border-gray overflow-hidden relative">
                  <img className="w-full h-full object-cover" src={p.img} alt="추천 상품" />
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}
