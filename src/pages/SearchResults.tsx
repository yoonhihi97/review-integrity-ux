import { useMemo, useState } from "react";
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
  priceValue: number;
  unitPrice?: string;
  badges?: string[];
  shipping?: { rocket?: boolean; text: string };
  rating: number;
  reviewCount: string;
  trust: { tone: "best" | "good" | "warn"; score: number };
  img: string;
  contain?: boolean;
  favorite?: boolean;
}

type SortKey = "trust" | "price" | "rating";

const PRODUCTS: Product[] = [
  {
    id: "peripera-tint",
    title: "페리페라 잉크 더 벨벳 틴트, 01 굿브릭, 1개",
    originalPrice: "10,000원",
    discount: "30%",
    price: "7,000원",
    priceValue: 7000,
    unitPrice: "(10g당 7,000원)",
    badges: ["무료배송", "무료반품"],
    shipping: { rocket: true, text: "내일(목) 새벽 도착" },
    rating: 4.9,
    reviewCount: "12,482",
    trust: { tone: "best", score: 4.8 },
    favorite: true,
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcoT9JpvMjRGhqvrU3oC3uXLu8vdc8pSXbJCMD4N8_VI9xu6RSj7q40gusF626Wt8pT3iUwVHAJjOp3IEP-djvo3-0OtV3uWJAfRG8le1M86sHc_asSrE8cXp1dVupWJPtEyCOz2oGmfE_DdX5zW7VDkIN3dZQD-nF9s3Zy2bcjd5dNbzGcxehR3orkZRVP0l62NeNEgzwlt7itBAWPMN1KVdyc1VaYPAyW3G42a25t3GiWJsnvnmy",
  },
  {
    id: "tooc-lip-tint",
    title: "투크 윗아웃 미러 립 틴트, 02 겟 러브, 1개",
    originalPrice: "15,000원",
    discount: "7%",
    price: "13,920원",
    priceValue: 13920,
    shipping: { rocket: true, text: "내일(목) 도착 보장" },
    rating: 4.5,
    reviewCount: "656",
    trust: { tone: "best", score: 4.7 },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTxxwRs_sHEiBbLVLmemlmofiX5f98SSQfhnJ68QkicKWZgR_L4zzXw21hTE0YUbrc-EhPR1jTgDB6kDzGRmxK2XadfDiR4vOixq85W3XJNejNA3j39wSf3jaDm8IzSk9Nr4y8AokA_x9kEmkRwncB4byPKWzyD2ShVjllVBIvZ0KHhcdc_1QuVtwAOUI34V3U_GywznTWugwocCcT5x3FCBSh8kQtYUtqfyO_7gnHxJuHrD4Sj3Dx",
  },
  {
    id: "romand-tint",
    title: "롬앤 쥬시 래스팅 틴트 베어 쥬시 시리즈, 25 베어 그레이프, 1개",
    price: "8,900원",
    priceValue: 8900,
    shipping: { rocket: true, text: "모레(금) 도착 예정" },
    rating: 4.7,
    reviewCount: "35,120",
    trust: { tone: "good", score: 3.8 },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTxxwRs_sHEiBbLVLmemlmofiX5f98SSQfhnJ68QkicKWZgR_L4zzXw21hTE0YUbrc-EhPR1jTgDB6kDzGRmxK2XadfDiR4vOixq85W3XJNejNA3j39wSf3jaDm8IzSk9Nr4y8AokA_x9kEmkRwncB4byPKWzyD2ShVjllVBIvZ0KHhcdc_1QuVtwAOUI34V3U_GywznTWugwocCcT5x3FCBSh8kQtYUtqfyO_7gnHxJuHrD4Sj3Dx",
    contain: true,
  },
  {
    id: "innisfree-tint",
    title: "이니스프리 비비드 코튼 잉크 틴트, 04호 활짝 핀 레드튤립, 1개",
    price: "5,400원",
    priceValue: 5400,
    shipping: { text: "일반배송" },
    rating: 4,
    reviewCount: "2,104",
    trust: { tone: "warn", score: 2.0 },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcoT9JpvMjRGhqvrU3oC3uXLu8vdc8pSXbJCMD4N8_VI9xu6RSj7q40gusF626Wt8pT3iUwVHAJjOp3IEP-djvo3-0OtV3uWJAfRG8le1M86sHc_asSrE8cXp1dVupWJPtEyCOz2oGmfE_DdX5zW7VDkIN3dZQD-nF9s3Zy2bcjd5dNbzGcxehR3orkZRVP0l62NeNEgzwlt7itBAWPMN1KVdyc1VaYPAyW3G42a25t3GiWJsnvnmy",
    contain: true,
  },
  {
    id: "etude-tint",
    title: "에뛰드하우스 디어 달링 워터 젤 틴트 리뉴얼, RD301 리얼레드, 2개입",
    originalPrice: "12,000원",
    discount: "20%",
    price: "9,600원",
    priceValue: 9600,
    shipping: { rocket: true, text: "내일(목) 도착" },
    rating: 4,
    reviewCount: "8,541",
    trust: { tone: "best", score: 4.5 },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTxxwRs_sHEiBbLVLmemlmofiX5f98SSQfhnJ68QkicKWZgR_L4zzXw21hTE0YUbrc-EhPR1jTgDB6kDzGRmxK2XadfDiR4vOixq85W3XJNejNA3j39wSf3jaDm8IzSk9Nr4y8AokA_x9kEmkRwncB4byPKWzyD2ShVjllVBIvZ0KHhcdc_1QuVtwAOUI34V3U_GywznTWugwocCcT5x3FCBSh8kQtYUtqfyO_7gnHxJuHrD4Sj3Dx",
  },
  {
    id: "3ce-tint",
    title: "3CE 벨벳 립 틴트, 브릭 브라운, 1개",
    price: "4,900원",
    priceValue: 4900,
    shipping: { text: "일반배송" },
    rating: 5,
    reviewCount: "1,320",
    trust: { tone: "warn", score: 2.0 },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcoT9JpvMjRGhqvrU3oC3uXLu8vdc8pSXbJCMD4N8_VI9xu6RSj7q40gusF626Wt8pT3iUwVHAJjOp3IEP-djvo3-0OtV3uWJAfRG8le1M86sHc_asSrE8cXp1dVupWJPtEyCOz2oGmfE_DdX5zW7VDkIN3dZQD-nF9s3Zy2bcjd5dNbzGcxehR3orkZRVP0l62NeNEgzwlt7itBAWPMN1KVdyc1VaYPAyW3G42a25t3GiWJsnvnmy",
    contain: true,
  },
  {
    id: "itsskin-tint",
    title: "잇츠킬 워터 밤 립 틴트, 코랄 핑크, 1개",
    originalPrice: "18,000원",
    discount: "12%",
    price: "15,900원",
    priceValue: 15900,
    shipping: { rocket: true, text: "내일(목) 도착" },
    rating: 4.8,
    reviewCount: "9,870",
    trust: { tone: "best", score: 4.9 },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTxxwRs_sHEiBbLVLmemlmofiX5f98SSQfhnJ68QkicKWZgR_L4zzXw21hTE0YUbrc-EhPR1jTgDB6kDzGRmxK2XadfDiR4vOixq85W3XJNejNA3j39wSf3jaDm8IzSk9Nr4y8AokA_x9kEmkRwncB4byPKWzyD2ShVjllVBIvZ0KHhcdc_1QuVtwAOUI34V3U_GywznTWugwocCcT5x3FCBSh8kQtYUtqfyO_7gnHxJuHrD4Sj3Dx",
  },
  {
    id: "missha-tint",
    title: "미샤 컬러 립 틴트, 딥 레드, 1개",
    price: "3,900원",
    priceValue: 3900,
    shipping: { text: "일반배송" },
    rating: 3,
    reviewCount: "740",
    trust: { tone: "warn", score: 1.5 },
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcoT9JpvMjRGhqvrU3oC3uXLu8vdc8pSXbJCMD4N8_VI9xu6RSj7q40gusF626Wt8pT3iUwVHAJjOp3IEP-djvo3-0OtV3uWJAfRG8le1M86sHc_asSrE8cXp1dVupWJPtEyCOz2oGmfE_DdX5zW7VDkIN3dZQD-nF9s3Zy2bcjd5dNbzGcxehR3orkZRVP0l62NeNEgzwlt7itBAWPMN1KVdyc1VaYPAyW3G42a25t3GiWJsnvnmy",
    contain: true,
  },
];

const TRUST_STYLE: Record<string, string> = {
  best: "bg-delivery-green/10 text-delivery-green border-delivery-green/20",
  good: "bg-rating-gold/10 text-rating-gold border-rating-gold/20",
  warn: "bg-error/10 text-error border-error/20",
};

const SORT_CHIPS: { key: SortKey; label: string }[] = [
  { key: "trust", label: "안심 평점순" },
  { key: "price", label: "가격순" },
  { key: "rating", label: "별점순" },
];

export default function SearchResults() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("틴트");
  const [sortKey, setSortKey] = useState<SortKey>("trust");

  const sortedProducts = useMemo(() => {
    const list = [...PRODUCTS];
    if (sortKey === "trust") list.sort((a, b) => b.trust.score - a.trust.score);
    else if (sortKey === "price") list.sort((a, b) => a.priceValue - b.priceValue);
    else list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [sortKey]);

  return (
    <div className="bg-surface-bright min-h-screen flex flex-col pb-20">
      <header className="bg-surface-container-lowest sticky top-0 z-40 shadow-sm">
        <div className="flex items-center px-container-margin py-stack-md w-full gap-3">
          <button className="text-text-primary active:opacity-70" onClick={() => navigate(-1)}>
            <Icon name="arrow_back_ios" className="text-2xl" />
          </button>
          <div className="flex-1 relative">
            <input
              className="w-full h-10 pl-4 pr-10 border-2 border-text-primary rounded-full text-body-lg-medium text-text-primary focus:outline-none"
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
        </div>

        <div className="px-container-margin pb-3 overflow-x-auto scrollbar-hide flex items-center gap-2">
          <button className="flex items-center justify-center min-w-[36px] h-[36px] rounded-full border border-border-gray bg-surface-container-lowest text-text-primary shrink-0">
            <Icon name="tune" className="text-xl" />
          </button>
          {SORT_CHIPS.map((chip) => (
            <button
              key={chip.key}
              onClick={() => setSortKey(chip.key)}
              className={`flex items-center h-[36px] px-3 rounded-full shrink-0 gap-1.5 ${
                sortKey === chip.key
                  ? "border-2 border-primary-container bg-primary-fixed-dim text-rocket-navy font-body-md-bold shadow-sm"
                  : "border border-border-gray bg-surface-container-lowest text-text-primary text-body-md"
              }`}
            >
              {chip.key === "trust" && (
                <Icon name="verified" filled className="text-[16px] text-delivery-green" />
              )}
              {chip.label}
            </button>
          ))}
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
      </header>

      <main className="flex-1">
        {sortedProducts.map((p) => (
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
              {p.favorite && (
                <span className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center shadow-sm">
                  <Icon name="favorite_border" className="text-text-secondary text-[16px]" />
                </span>
              )}
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
                <span className={`border rounded px-1 text-[10px] font-bold ${TRUST_STYLE[p.trust.tone]}`}>
                  안심 평점 {p.trust.score.toFixed(1)} / 5.0
                </span>
              </div>
            </div>
          </button>
        ))}
      </main>

      <BottomNavBar />
    </div>
  );
}
