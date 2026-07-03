import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import StarRating from "../components/StarRating";
import BottomNavBar from "../components/BottomNavBar";

interface Product {
  id: string;
  title: string;
  originalPrice?: string;
  discount?: string;
  price: string;
  unitPrice?: string;
  badges?: string[];
  shipping?: { rocket?: boolean; text: string };
  rating: number;
  reviewCount: string;
  trust?: { label: string; tone: "best" | "good" | "warn" };
  img: string;
  contain?: boolean;
}

const PRODUCTS: Product[] = [
  {
    id: "peripera-tint",
    title: "페리페라 잉크 더 벨벳 틴트, 01 굿브릭, 1개",
    originalPrice: "10,000원",
    discount: "30%",
    price: "7,000원",
    unitPrice: "(10g당 7,000원)",
    badges: ["무료배송", "무료반품"],
    shipping: { rocket: true, text: "내일(목) 새벽 도착" },
    rating: 5,
    reviewCount: "12,482",
    trust: { label: "안심 최우수", tone: "best" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcoT9JpvMjRGhqvrU3oC3uXLu8vdc8pSXbJCMD4N8_VI9xu6RSj7q40gusF626Wt8pT3iUwVHAJjOp3IEP-djvo3-0OtV3uWJAfRG8le1M86sHc_asSrE8cXp1dVupWJPtEyCOz2oGmfE_DdX5zW7VDkIN3dZQD-nF9s3Zy2bcjd5dNbzGcxehR3orkZRVP0l62NeNEgzwlt7itBAWPMN1KVdyc1VaYPAyW3G42a25t3GiWJsnvnmy",
  },
  {
    id: "tooc-lip-tint",
    title: "투크 윗아웃 미러 립 틴트, 02 겟 러브, 1개",
    originalPrice: "15,000원",
    discount: "7%",
    price: "13,920원",
    shipping: { rocket: true, text: "내일(목) 도착 보장" },
    rating: 4.5,
    reviewCount: "656",
    trust: { label: "안심 최우수", tone: "best" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTxxwRs_sHEiBbLVLmemlmofiX5f98SSQfhnJ68QkicKWZgR_L4zzXw21hTE0YUbrc-EhPR1jTgDB6kDzGRmxK2XadfDiR4vOixq85W3XJNejNA3j39wSf3jaDm8IzSk9Nr4y8AokA_x9kEmkRwncB4byPKWzyD2ShVjllVBIvZ0KHhcdc_1QuVtwAOUI34V3U_GywznTWugwocCcT5x3FCBSh8kQtYUtqfyO_7gnHxJuHrD4Sj3Dx",
  },
  {
    id: "romand-tint",
    title: "롬앤 쥬시 래스팅 틴트 베어 쥬시 시리즈, 25 베어 그레이프, 1개",
    price: "8,900원",
    shipping: { rocket: true, text: "모레(금) 도착 예정" },
    rating: 5,
    reviewCount: "35,120",
    trust: { label: "안심 우수", tone: "good" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTxxwRs_sHEiBbLVLmemlmofiX5f98SSQfhnJ68QkicKWZgR_L4zzXw21hTE0YUbrc-EhPR1jTgDB6kDzGRmxK2XadfDiR4vOixq85W3XJNejNA3j39wSf3jaDm8IzSk9Nr4y8AokA_x9kEmkRwncB4byPKWzyD2ShVjllVBIvZ0KHhcdc_1QuVtwAOUI34V3U_GywznTWugwocCcT5x3FCBSh8kQtYUtqfyO_7gnHxJuHrD4Sj3Dx",
    contain: true,
  },
  {
    id: "innisfree-tint",
    title: "이니스프리 비비드 코튼 잉크 틴트, 04호 활짝 핀 레드튤립, 1개",
    price: "5,400원",
    shipping: { text: "일반배송" },
    rating: 4,
    reviewCount: "2,104",
    trust: { label: "안심 주의", tone: "warn" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcoT9JpvMjRGhqvrU3oC3uXLu8vdc8pSXbJCMD4N8_VI9xu6RSj7q40gusF626Wt8pT3iUwVHAJjOp3IEP-djvo3-0OtV3uWJAfRG8le1M86sHc_asSrE8cXp1dVupWJPtEyCOz2oGmfE_DdX5zW7VDkIN3dZQD-nF9s3Zy2bcjd5dNbzGcxehR3orkZRVP0l62NeNEgzwlt7itBAWPMN1KVdyc1VaYPAyW3G42a25t3GiWJsnvnmy",
    contain: true,
  },
  {
    id: "etude-tint",
    title: "에뛰드하우스 디어 달링 워터 젤 틴트 리뉴얼, RD301 리얼레드, 2개입",
    originalPrice: "12,000원",
    discount: "20%",
    price: "9,600원",
    shipping: { rocket: true, text: "내일(목) 도착" },
    rating: 4,
    reviewCount: "8,541",
    trust: { label: "안심 최우수", tone: "best" },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTxxwRs_sHEiBbLVLmemlmofiX5f98SSQfhnJ68QkicKWZgR_L4zzXw21hTE0YUbrc-EhPR1jTgDB6kDzGRmxK2XadfDiR4vOixq85W3XJNejNA3j39wSf3jaDm8IzSk9Nr4y8AokA_x9kEmkRwncB4byPKWzyD2ShVjllVBIvZ0KHhcdc_1QuVtwAOUI34V3U_GywznTWugwocCcT5x3FCBSh8kQtYUtqfyO_7gnHxJuHrD4Sj3Dx",
  },
];

const TRUST_STYLE: Record<string, string> = {
  best: "bg-delivery-green/10 text-delivery-green border-delivery-green/20",
  good: "bg-rating-gold/10 text-rating-gold border-rating-gold/20",
  warn: "bg-error/10 text-error border-error/20",
};

export default function SearchResults() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("틴트");
  const [includeShipping, setIncludeShipping] = useState(false);

  return (
    <div className="bg-surface-bright min-h-screen flex flex-col pb-20">
      <header className="bg-surface-container-lowest sticky top-0 z-40 shadow-sm">
        <div className="flex items-center px-container-margin py-stack-md w-full gap-3">
          <button className="text-primary active:opacity-70" onClick={() => navigate(-1)}>
            <Icon name="arrow_back" className="text-2xl" />
          </button>
          <div className="flex-1 relative">
            <input
              className="w-full h-10 pl-4 pr-10 border-2 border-primary-container rounded-full text-body-lg-medium text-text-primary focus:outline-none"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-outline"
              onClick={() => setQuery("")}
            >
              <Icon name="cancel" className="text-xl" />
            </button>
          </div>
          <Icon name="notifications" className="text-on-surface-variant text-2xl" />
        </div>

        <div className="px-container-margin pb-3 overflow-x-auto scrollbar-hide flex items-center gap-2">
          <button className="flex items-center justify-center min-w-[36px] h-[36px] rounded-full border border-border-gray bg-surface-container-lowest text-text-primary shrink-0">
            <Icon name="tune" className="text-xl" />
          </button>
          <button className="flex items-center h-[36px] px-3 rounded-full border-2 border-primary-container bg-primary-fixed-dim text-rocket-navy font-body-md-bold shrink-0 gap-1.5 shadow-sm">
            <Icon name="verified" filled className="text-[16px] text-delivery-green" />
            안심 평점순
          </button>
          <button className="flex items-center h-[36px] px-3 rounded-full border border-border-gray bg-surface-container-lowest text-text-primary text-body-md shrink-0 gap-1">
            <Icon name="rocket_launch" filled className="text-sm text-rocket-navy" />
            로켓
          </button>
          <button className="flex items-center h-[36px] px-3 rounded-full border border-border-gray bg-surface-container-lowest text-text-primary text-body-md shrink-0 gap-1">
            <Icon name="rocket_launch" filled className="text-sm text-rocket-navy" />
            <span className="text-delivery-green font-bold text-[10px] border border-delivery-green px-1 rounded-sm">
              오늘/새벽
            </span>
          </button>
          <button className="flex items-center h-[36px] px-3 rounded-full border border-border-gray bg-surface-container-lowest text-text-primary text-body-md shrink-0 gap-1">
            가격대 <Icon name="expand_more" className="text-sm" />
          </button>
        </div>

        <div className="px-container-margin py-2.5 flex items-center justify-between border-b border-border-gray bg-surface-container-low">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative inline-block w-9 h-5 align-middle">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={includeShipping}
                onChange={(e) => setIncludeShipping(e.target.checked)}
              />
              <div className="w-9 h-5 rounded-full bg-outline-variant peer-checked:bg-primary transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-4 h-4 rounded-full bg-white transition-transform peer-checked:translate-x-4" />
            </div>
            <span className="text-body-md text-text-primary">배송비 포함</span>
          </label>
          <div className="flex items-center gap-4">
            <button className="flex items-center text-text-secondary text-body-md">
              쿠팡 랭킹순 <Icon name="arrow_drop_down" className="text-sm" />
            </button>
            <Icon name="grid_view" filled className="text-outline text-xl" />
          </div>
        </div>
      </header>

      <main className="flex-1">
        {PRODUCTS.map((p) => (
          <button
            key={p.id}
            onClick={() => navigate(`/product/${p.id}`)}
            className="flex w-full text-left px-container-margin py-stack-lg border-b border-border-gray bg-surface-container-lowest gap-4"
          >
            <div className={`w-32 h-32 shrink-0 relative rounded-lg overflow-hidden bg-surface-container-low ${p.contain ? "flex items-center justify-center p-2" : ""}`}>
              <img
                className={`w-full h-full ${p.contain ? "object-contain" : "object-cover"}`}
                src={p.img}
                alt={p.title}
              />
            </div>
            <div className="flex flex-col flex-1">
              <h3 className="text-body-lg-medium text-text-primary line-clamp-2 leading-snug">
                {p.title}
              </h3>
              {p.originalPrice && (
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-outline line-through text-xs">{p.originalPrice}</span>
                </div>
              )}
              <div className="flex items-baseline gap-1.5">
                {p.discount && <span className="text-display-price text-discount-orange">{p.discount}</span>}
                <span className="text-display-price text-text-primary">{p.price}</span>
              </div>
              {p.unitPrice && <div className="text-[12px] text-text-secondary mt-0.5">{p.unitPrice}</div>}
              {p.badges && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {p.badges.map((b) => (
                    <span key={b} className="bg-surface-bright border border-border-gray px-1.5 py-0.5 rounded text-[10px] font-bold text-text-primary">
                      {b}
                    </span>
                  ))}
                </div>
              )}
              {p.shipping && (
                <div className="mt-2 flex items-center gap-1">
                  {p.shipping.rocket ? (
                    <>
                      <Icon name="rocket_launch" filled className="text-[16px] text-rocket-navy" />
                      <span className="text-rocket-navy font-bold text-xs italic">로켓</span>
                      <span className="text-body-md-bold text-delivery-green ml-1">{p.shipping.text}</span>
                    </>
                  ) : (
                    <span className="text-text-secondary text-xs">{p.shipping.text}</span>
                  )}
                </div>
              )}
              <div className="mt-1.5 flex items-center gap-1.5">
                <StarRating rating={p.rating} size={14} />
                <span className="text-[12px] text-text-secondary">({p.reviewCount})</span>
                {p.trust && (
                  <span className={`border rounded px-1 text-[10px] font-bold ${TRUST_STYLE[p.trust.tone]}`}>
                    {p.trust.label}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </main>

      <BottomNavBar />
    </div>
  );
}
