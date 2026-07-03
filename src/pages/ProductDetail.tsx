import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import StarRating from "../components/StarRating";

interface SellerOffer {
  id: string;
  name: string;
  badge: string;
  price: string;
  shipping: string;
  shippingTone: "free" | "paid";
  satisfaction: string;
  trustScore: string;
  trustTone: "best" | "good" | "warn";
  current?: boolean;
}

const OFFERS: SellerOffer[] = [
  {
    id: "coupang",
    name: "쿠팡(주)",
    badge: "쿠팡 추천",
    price: "13,920원",
    shipping: "+ 무료 배송",
    shippingTone: "free",
    satisfaction: "99.8%",
    trustScore: "4.9 / 5.0",
    trustTone: "best",
    current: true,
  },
  {
    id: "beauty-space",
    name: "뷰티스페이스",
    badge: "새상품",
    price: "13,500원",
    shipping: "+ 배송비 3,000원",
    shippingTone: "paid",
    satisfaction: "85.0%",
    trustScore: "4.7 / 5.0",
    trustTone: "good",
  },
  {
    id: "discount-mart",
    name: "할인마트",
    badge: "새상품",
    price: "12,900원",
    shipping: "+ 배송비 2,500원",
    shippingTone: "paid",
    satisfaction: "62.4%",
    trustScore: "주의",
    trustTone: "warn",
  },
];

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [sellerSort, setSellerSort] = useState<"rating" | "price" | "trust">("rating");

  return (
    <div className="w-full max-w-[600px] mx-auto bg-surface-container-lowest min-h-screen pb-[120px] shadow-sm relative">
      <header className="bg-surface-container-lowest border-b border-outline-variant flex justify-between items-center px-container-margin py-stack-md w-full sticky top-0 z-10">
        <button className="text-primary active:opacity-70" onClick={() => navigate(-1)}>
          <Icon name="arrow_back" />
        </button>
        <h1 className="text-headline-sm-mobile text-primary italic font-black">Coupang</h1>
        <button className="text-on-surface-variant active:opacity-70">
          <Icon name="notifications" />
        </button>
      </header>

      <section className="bg-surface-container-lowest border-b border-surface-container-high pb-4">
        <div className="w-full aspect-square bg-surface-container-low relative flex justify-center items-center">
          <img
            alt="투크 윗아웃 미러 립 틴트"
            className="w-4/5 h-4/5 object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTxxwRs_sHEiBbLVLmemlmofiX5f98SSQfhnJ68QkicKWZgR_L4zzXw21hTE0YUbrc-EhPR1jTgDB6kDzGRmxK2XadfDiR4vOixq85W3XJNejNA3j39wSf3jaDm8IzSk9Nr4y8AokA_x9kEmkRwncB4byPKWzyD2ShVjllVBIvZ0KHhcdc_1QuVtwAOUI34V3U_GywznTWugwocCcT5x3FCBSh8kQtYUtqfyO_7gnHxJuHrD4Sj3Dx"
          />
          <button className="absolute bottom-4 right-4 bg-white/80 backdrop-blur rounded-full p-2 shadow-sm border border-border-gray">
            <Icon name="share" className="text-text-primary text-[20px]" />
          </button>
        </div>
        <div className="px-container-margin pt-4">
          <div className="flex justify-between items-start">
            <h2 className="text-body-lg-medium text-text-primary line-clamp-2">
              투크 윗아웃 미러 립 틴트, 02 겟 러브, 1개 {id ? `(#${id})` : ""}
            </h2>
            <button className="text-text-secondary ml-2">
              <Icon name="favorite_border" className="text-[24px]" />
            </button>
          </div>
          <button
            className="flex items-center gap-1 mt-1 text-sm text-text-secondary"
            onClick={() => navigate(`/product/${id ?? "tooc-lip-tint"}/reviews`)}
          >
            <StarRating rating={4.5} size={14} />
            <span>(656)</span>
          </button>
          <div className="mt-4 flex items-end gap-2">
            <span className="text-display-price text-text-primary">13,920원</span>
          </div>
        </div>
      </section>

      <div className="h-2 bg-surface-container-low w-full border-t border-b border-border-gray" />

      <section className="py-4">
        <button
          className="w-full px-container-margin flex justify-between items-center py-4"
          onClick={() => setAccordionOpen((v) => !v)}
        >
          <div className="flex items-center gap-2">
            <h3 className="text-body-lg-bold text-text-primary">다른 판매자 보기 (3)</h3>
            <span className="text-label-sm text-text-secondary flex items-center">
              안심 평점 안내 <Icon name="info" className="text-[16px] ml-1" />
            </span>
          </div>
          <Icon name="expand_more" className={`text-text-secondary transition-transform ${accordionOpen ? "rotate-180" : ""}`} />
        </button>

        {accordionOpen && (
          <div>
            <div className="px-container-margin mb-4 border-b border-outline-variant flex gap-4">
              {[
                { key: "rating", label: "종합 평점 순" },
                { key: "price", label: "가격순" },
                { key: "trust", label: "안심 평점 순" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSellerSort(tab.key as typeof sellerSort)}
                  className={`pb-2 text-label-sm ${
                    sellerSort === tab.key
                      ? "border-b-2 border-primary-container text-primary font-body-md-bold"
                      : "text-text-secondary font-body-md"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex flex-col px-container-margin gap-stack-lg">
              {OFFERS.map((offer) => (
                <div
                  key={offer.id}
                  className={`rounded-lg border p-4 relative shadow-sm flex items-center justify-between gap-4 ${
                    offer.current ? "border-2 border-primary-container" : "border-border-gray"
                  } ${offer.trustTone === "warn" ? "opacity-80" : ""}`}
                >
                  <div
                    className={`absolute -top-3 left-4 font-label-xs px-2 py-1 rounded-sm ${
                      offer.current ? "bg-primary text-white" : "bg-surface-container-high text-text-secondary"
                    }`}
                  >
                    {offer.badge}
                  </div>
                  <div className="flex-1">
                    <div className="text-text-primary text-[20px] font-body-lg-bold">{offer.price}</div>
                    <div className={`font-label-sm mt-1 ${offer.shippingTone === "free" ? "text-delivery-green" : "text-text-secondary"}`}>
                      {offer.shipping}
                    </div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="font-body-md-bold text-label-sm">{offer.name}</div>
                    <button
                      className="text-text-secondary underline mt-1 text-label-xs"
                      onClick={() => navigate(`/seller/${offer.id}`)}
                    >
                      자세히 보기
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col items-end gap-2">
                    <div className="text-right border-l border-outline-variant pl-2 text-[10px]">
                      <div className="text-label-xs text-text-secondary">
                        고객만족도 : <span className="text-text-primary">{offer.satisfaction}</span>
                      </div>
                      <div className="text-label-xs text-text-secondary">
                        안심 평점 :{" "}
                        <span className={offer.trustTone === "warn" ? "text-error" : "text-text-primary"}>
                          {offer.trustScore}
                        </span>
                      </div>
                    </div>
                    {offer.current ? (
                      <div className="border border-outline-variant rounded-lg px-3 py-1 flex items-center justify-center gap-1 text-text-secondary font-label-sm whitespace-nowrap min-w-[80px] h-[32px]">
                        <Icon name="check" className="text-[16px]" /> 현재 적용중
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate(`/product/${offer.id}`)}
                        className="border-b border-text-primary text-text-primary font-body-md-bold text-label-sm py-1 flex items-center justify-center min-w-[80px] h-[32px]"
                      >
                        이 상품 보기
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <div className="fixed bottom-0 left-0 w-full md:w-[600px] md:left-1/2 md:-translate-x-1/2 bg-surface-container-lowest border-t border-border-gray p-4 flex gap-2 z-50">
        <button className="flex-1 bg-surface-container text-text-primary text-body-lg-bold py-3 rounded-lg border border-border-gray flex justify-center items-center gap-1">
          장바구니 담기
        </button>
        <button
          className="flex-1 bg-primary-container text-white text-body-lg-bold py-3 rounded-lg flex justify-center items-center"
          onClick={() => navigate("/checkout")}
        >
          바로구매
        </button>
      </div>
    </div>
  );
}
