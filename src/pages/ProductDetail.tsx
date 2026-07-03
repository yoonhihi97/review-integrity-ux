import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon";
import StarRating from "../components/StarRating";

interface SellerOffer {
  id: string;
  name: string;
  badge?: string;
  price: string;
  priceValue: number;
  shipping: string;
  shippingTone: "free" | "paid";
  satisfaction: string;
  satisfactionValue: number;
  trustScore: string;
  trustValue: number;
  trustTone: "best" | "good" | "warn";
  current?: boolean;
}

const OFFERS: SellerOffer[] = [
  {
    id: "coupang",
    name: "쿠팡(주)",
    badge: "쿠팡 추천",
    price: "13,920원",
    priceValue: 13920,
    shipping: "+ 무료 배송",
    shippingTone: "free",
    satisfaction: "99.8%",
    satisfactionValue: 99.8,
    trustScore: "4.9 / 5.0",
    trustValue: 4.9,
    trustTone: "best",
    current: true,
  },
  {
    id: "beauty-space",
    name: "뷰티스페이스",
    price: "13,500원",
    priceValue: 13500,
    shipping: "+ 배송비 3,000원",
    shippingTone: "paid",
    satisfaction: "86.8%",
    satisfactionValue: 86.8,
    trustScore: "4.3 / 5.0",
    trustValue: 4.3,
    trustTone: "good",
  },
  {
    id: "discount-mart",
    name: "할인마트",
    price: "12,900원",
    priceValue: 12900,
    shipping: "+ 배송비 2,500원",
    shippingTone: "paid",
    satisfaction: "20.8%",
    satisfactionValue: 20.8,
    trustScore: "1.0 / 5.0",
    trustValue: 1.0,
    trustTone: "warn",
  },
];

const PRODUCT_SPECS = [
  { label: "브랜드", value: "투크" },
  { label: "용량", value: "1ml당 2,784원" },
  { label: "무게", value: "25g" },
  { label: "제조사", value: "CJ대한통운" },
];

const REVIEW_MEDIA_THUMBS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAh2tTC4CVDzzUMU9u-DoT6d3keLSnNavuIK_ZWaD5PVmaooyAHqfrJScZKGzl_5RiunzKt4YBqc62MZ30zHhRroh1jqcO2N_ML6GasPQlFI49FioGUjYFaWkxn7yr9zGgn_bg6MyIZyeC8RVs_w4kbTIJIddisxy8EywertC94ad313-5MLyKYZ3uaJC7wWoRsAvvoPER21qYUTCDztjCJEGvLr_zjRdEjLNN6SsdDJqAbGQYn8rb1",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBl7vMH3ANkw9gpqwq5bdm48KV9nJObqg5RtnYQng0CALvks8xTyK_F82Rtje2dtNidF8foCVvM9V9STajONMf4uzZjDwIziB8bWtSDzGtlEeREtisQRpL_yzV2A5n6MytaiWiXb5MFt2zSYsEONe0nCiVVGle1PWTKSDGFe46LcC3SZ2fA30G5OhIzJSF42h8os01UUry8w4pDB3xJZirTpOssOeiYrhr6XeKMBrGDU23rhLEus_N4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCYrT590fWGPIh766MPgJPUaD40uv4DlsjZ_n1XqotlyX7epCE12G-J31jIYwmw1BIldJ9XAV3gauDx_0P9j6C9AKuFZie5XOpqnfrBVVp1YjXKuf4ieCDVvTgW6RXkN3BsQ1eisqQIOlr1FDp6NcIYYt3tK2iybd9VvorNKfdUv88nonfGwx4baLzsvTDhZM_jXMi1LJfShdezi5CaHJefKfFsmkHSPt70uQmoYthCFviMxcT_dGFR",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBQ6WcjXEgdYChwZEzbFpSsAxaG7GkRg8pF1_3qbxmEliAIqR45u7Hgb1p32aCipGFUpURhFSyxsGmC2w89J-KFYMjR5hKY18mNOMNjGVlCS6amXOP5v70Rb-wHQ3LnQo9LAuavgjc0o_Qq4rWMetVl0SosIaLlVQk-94c_rX-8J-YncfqSknBLChYcXGziRxGg5879QcpF4KINUiuvAT97NrWILzUXZ0p3V6bH2vagWqA0R4_lzXdp",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAh2tTC4CVDzzUMU9u-DoT6d3keLSnNavuIK_ZWaD5PVmaooyAHqfrJScZKGzl_5RiunzKt4YBqc62MZ30zHhRroh1jqcO2N_ML6GasPQlFI49FioGUjYFaWkxn7yr9zGgn_bg6MyIZyeC8RVs_w4kbTIJIddisxy8EywertC94ad313-5MLyKYZ3uaJC7wWoRsAvvoPER21qYUTCDztjCJEGvLr_zjRdEjLNN6SsdDJqAbGQYn8rb1",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuBl7vMH3ANkw9gpqwq5bdm48KV9nJObqg5RtnYQng0CALvks8xTyK_F82Rtje2dtNidF8foCVvM9V9STajONMf4uzZjDwIziB8bWtSDzGtlEeREtisQRpL_yzV2A5n6MytaiWiXb5MFt2zSYsEONe0nCiVVGle1PWTKSDGFe46LcC3SZ2fA30G5OhIzJSF42h8os01UUry8w4pDB3xJZirTpOssOeiYrhr6XeKMBrGDU23rhLEus_N4",
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCYrT590fWGPIh766MPgJPUaD40uv4DlsjZ_n1XqotlyX7epCE12G-J31jIYwmw1BIldJ9XAV3gauDx_0P9j6C9AKuFZie5XOpqnfrBVVp1YjXKuf4ieCDVvTgW6RXkN3BsQ1eisqQIOlr1FDp6NcIYYt3tK2iybd9VvorNKfdUv88nonfGwx4baLzsvTDhZM_jXMi1LJfShdezi5CaHJefKfFsmkHSPt70uQmoYthCFviMxcT_dGFR",
];

const REVIEW_STATS_PREVIEW = [
  { label: "향 만족도", value: "아주만족해요", pct: "59%" },
  { label: "발색 정도", value: "예상했던 색감이에요", pct: "67%" },
];

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [sellerSort, setSellerSort] = useState<"rating" | "price" | "trust">("rating");

  const sortedOffers = useMemo(() => {
    const list = [...OFFERS];
    if (sellerSort === "price") list.sort((a, b) => a.priceValue - b.priceValue);
    else if (sellerSort === "trust") list.sort((a, b) => b.trustValue - a.trustValue);
    else list.sort((a, b) => b.satisfactionValue - a.satisfactionValue);
    return list;
  }, [sellerSort]);

  return (
    <div className="w-full max-w-[600px] mx-auto bg-surface-container-lowest min-h-screen pb-[120px] shadow-sm relative">
      <header className="bg-surface-container-lowest border-b border-outline-variant flex items-center px-container-margin py-stack-md w-full sticky top-0 z-10">
        <button className="text-text-primary active:opacity-70" onClick={() => navigate(-1)}>
          <Icon name="arrow_back_ios" />
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
              {sortedOffers.map((offer) => (
                <div
                  key={offer.id}
                  className={`rounded-lg border p-3 relative shadow-sm flex items-center justify-between gap-2 ${
                    offer.current ? "border-2 border-primary-container" : "border-border-gray"
                  } ${offer.trustTone === "warn" ? "opacity-80" : ""}`}
                >
                  {offer.badge && (
                    <div
                      className={`absolute -top-3 left-3 text-[10px] font-bold px-2 py-1 rounded-sm ${
                        offer.current ? "bg-primary text-white" : "bg-surface-container-high text-text-secondary"
                      }`}
                    >
                      {offer.badge}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-text-primary text-[15px] font-bold truncate">{offer.price}</div>
                    <div className={`text-[11px] mt-0.5 truncate ${offer.shippingTone === "free" ? "text-delivery-green" : "text-text-secondary"}`}>
                      {offer.shipping}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 text-center">
                    <div className="text-[12px] font-bold truncate">{offer.name}</div>
                    <button
                      className="text-text-secondary underline mt-0.5 text-[10px]"
                      onClick={() => navigate(`/seller/${offer.id}`)}
                    >
                      자세히 보기
                    </button>
                  </div>
                  <div className="flex-1 flex flex-col items-end gap-1.5 min-w-0">
                    <div className="text-right border-l border-outline-variant pl-2 text-[9px] leading-tight">
                      <div className="text-text-secondary whitespace-nowrap">
                        고객만족도 : <span className="text-text-primary">{offer.satisfaction}</span>
                      </div>
                      <div className="text-text-secondary whitespace-nowrap">
                        안심 평점 :{" "}
                        <span className={offer.trustTone === "warn" ? "text-error" : "text-text-primary"}>
                          {offer.trustScore}
                        </span>
                      </div>
                    </div>
                    {offer.current ? (
                      <div className="border border-outline-variant rounded-lg px-2 py-1 flex items-center justify-center gap-1 text-text-secondary text-[10px] whitespace-nowrap min-w-[68px] h-[26px]">
                        <Icon name="check" className="text-[13px]" /> 현재 적용중
                      </div>
                    ) : (
                      <button
                        onClick={() => navigate(`/product/${offer.id}`)}
                        className="border-b border-text-primary text-text-primary font-bold text-[10px] py-1 flex items-center justify-center min-w-[68px] h-[26px] whitespace-nowrap"
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

      <div className="h-2 bg-surface-container-low w-full border-t border-b border-border-gray" />

      <section className="py-4 px-container-margin">
        <h3 className="text-body-lg-bold text-text-primary mb-2">상품정보</h3>
        <div className="rounded-lg border border-border-gray overflow-hidden">
          {PRODUCT_SPECS.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex px-4 py-2.5 ${i > 0 ? "border-t border-border-gray" : ""}`}
            >
              <span className="w-24 shrink-0 text-body-md text-text-secondary">{spec.label}</span>
              <span className="text-body-md text-text-primary">{spec.value}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="h-2 bg-surface-container-low w-full border-t border-b border-border-gray" />

      <section className="py-4">
        <h3 className="text-body-lg-bold text-text-primary mb-2 px-container-margin">상세정보</h3>
        <img
          src="https://thumbnail.coupangcdn.com/thumbnails/remote/q89/image/retail/images/2025/08/04/15/8/3fd8f7e8-eb04-43df-afd3-b778edb1415b.jpg"
          alt="상품 상세 이미지"
          className="w-full h-auto"
        />
      </section>

      <div className="h-2 bg-surface-container-low w-full border-t border-b border-border-gray" />

      <section className="py-4 px-container-margin">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-body-lg-bold text-text-primary">상품 리뷰</h3>
          <button
            className="flex items-center text-primary text-body-md"
            onClick={() => navigate(`/product/${id ?? "tooc-lip-tint"}/reviews`)}
          >
            전체보기 <Icon name="chevron_right" className="text-sm" />
          </button>
        </div>

        <p className="text-body-md-bold text-text-primary mb-2">사진/동영상</p>
        <div className="grid grid-cols-4 gap-1 mb-5">
          {REVIEW_MEDIA_THUMBS.slice(0, 7).map((src, i) => (
            <div key={i} className="aspect-square relative bg-surface-container-low rounded overflow-hidden">
              <img className="w-full h-full object-cover" src={src} alt="리뷰 미디어" />
              {i === 0 && (
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-label-xs">
                  <Icon name="play_arrow" filled className="mb-0.5" />
                  0:12
                </div>
              )}
            </div>
          ))}
          <button
            className="aspect-square bg-primary-container/90 rounded flex flex-col items-center justify-center text-white"
            onClick={() => navigate(`/product/${id ?? "tooc-lip-tint"}/reviews`)}
          >
            <span className="text-body-lg-bold">199</span>
            <span className="text-label-xs">더보기</span>
          </button>
        </div>

        <div className="space-y-2 mb-5">
          {REVIEW_STATS_PREVIEW.map((s) => (
            <div key={s.label} className="flex items-center justify-between">
              <span className="text-body-md text-text-secondary">{s.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-body-md-bold text-primary">"{s.value}"</span>
                <span className="text-body-md-bold text-text-primary">{s.pct}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-border-gray rounded-lg p-4">
          <div className="flex items-center gap-1.5 mb-1">
            <StarRating rating={5} size={16} />
            <span className="text-body-md-bold text-text-primary">스**닝</span>
            <span className="text-label-xs text-text-secondary ml-auto">2026.07.01</span>
          </div>
          <p className="text-label-xs text-text-secondary mb-3">판매자: 주식회사 뉴뷰티</p>
          <p className="text-body-md text-text-primary leading-relaxed mb-3">
            한줄 요약: 맑고 생기 있는 컬러로 데일리 메이크업에 잘 어울리는 투크 틴트 겟 러브
          </p>
          <p className="text-body-md text-text-secondary leading-relaxed mb-3 line-clamp-4">
            평소 자연스럽고 맑게 발색되는 틴트를 좋아해서 투크 틴트 겟 러브를 구매했습니다. 입술에 얇고 가볍게
            밀착되면서 여러 번 덧발라도 답답한 느낌이 적었고, 생기 있는 컬러 덕분에 데일리 메이크업에 손이 자주
            갔습니다.
          </p>
          <button
            className="text-primary text-label-sm mb-3"
            onClick={() => navigate(`/product/${id ?? "tooc-lip-tint"}/reviews`)}
          >
            더보기
          </button>
          <div className="flex items-center justify-between text-label-xs text-text-secondary">
            <button className="flex items-center gap-1">
              <Icon name="thumb_up" className="text-sm" /> 17명에게 도움이 됐어요
            </button>
            <button>신고하기</button>
          </div>
        </div>

        <button
          className="w-full mt-4 h-12 border border-primary text-primary text-body-lg-bold rounded-lg flex items-center justify-center"
          onClick={() => navigate(`/product/${id ?? "tooc-lip-tint"}/reviews`)}
        >
          리뷰 전체보기
        </button>
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
