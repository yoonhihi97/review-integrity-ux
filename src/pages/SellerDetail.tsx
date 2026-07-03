import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import StarRating from "../components/StarRating";
import BottomNavBar from "../components/BottomNavBar";

const REVIEWS = [
  { name: "김*빈", date: "2026.06.30", rating: 5, label: "만족해요", tags: ["합리적인 가격", "빠른 배송"], negative: false },
  { name: "이*민", date: "2026.06.02", rating: 2, label: "불만족해요", tags: ["상품이 잘못왔어요"], negative: true },
  { name: "박*준", date: "2026.05.28", rating: 5, label: "만족해요", tags: ["친절한 상담"], negative: false },
];

const TABS = ["홈", "전체 상품", "판매자 후기"];

export default function SellerDetail() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("판매자 후기");
  const [sortBy, setSortBy] = useState("최신순");

  return (
    <div className="bg-background text-text-primary pb-24">
      <header className="bg-surface sticky top-0 z-50 flex items-center w-full px-margin-mobile h-14 border-b border-border-gray">
        <button className="text-text-primary mr-2" onClick={() => navigate(-1)}>
          <Icon name="arrow_back_ios" />
        </button>
        <h1 className="text-headline-sm-mobile text-text-primary">판매자 정보 상세</h1>
      </header>

      <main className="max-w-[1200px] mx-auto md:px-margin-mobile md:py-section-gap">
        <section className="bg-surface-container-lowest p-container-margin md:rounded-lg md:border md:border-border-gray mb-2">
          <div className="flex items-center mb-stack-sm">
            <h2 className="text-headline-sm-mobile mr-2">주식회사 진지상회</h2>
            <Icon name="info" className="text-outline text-[16px]" />
          </div>
          <p className="text-body-md text-text-secondary mb-stack-md">주식회사 진지상회의 판매자샵입니다.</p>
          <div className="flex items-center text-body-md text-text-secondary mb-stack-lg">
            <span className="mr-1">만족도:</span>
            <Icon name="thumb_up" className="text-[16px] mr-1" />
            <span className="font-body-md-bold text-text-primary mr-1">92%</span>
            <span className="text-primary mr-1">(50)</span>
            <Icon name="info" className="text-outline text-[14px]" />
          </div>
          <div className="flex gap-gutter">
            <button className="flex-1 flex justify-center items-center py-2 border border-border-gray rounded text-body-md font-body-md-bold hover:bg-surface-container-low transition">
              <Icon name="favorite_border" className="text-[18px] mr-1" /> 판매자샵 찜하기
            </button>
            <button className="px-3 py-2 border border-border-gray rounded hover:bg-surface-container-low transition">
              <Icon name="share" className="text-[18px]" />
            </button>
          </div>
        </section>

        <nav className="bg-surface-container-lowest border-b border-border-gray flex w-full sticky top-14 z-40">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 text-center py-3 ${
                activeTab === tab
                  ? "text-body-lg-bold text-text-primary border-b-2 border-text-primary"
                  : "text-body-lg-medium text-text-secondary border-b-2 border-transparent"
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        <section className="bg-surface-container-lowest pt-section-gap pb-container-margin md:rounded-b-lg">
          <div className="px-container-margin mb-section-gap">
            <div className="bg-surface-container-low p-container-margin rounded-lg border border-border-gray">
              <div className="flex items-center mb-stack-sm">
                <Icon name="verified_user" filled className="text-delivery-green mr-2 text-[24px]" />
                <h3 className="text-body-lg-bold text-delivery-green">안심평가</h3>
                <span className="ml-auto text-headline-sm">
                  4.8<span className="text-body-md text-text-secondary">/5.0</span>
                </span>
              </div>
              <p className="text-label-sm text-outline mt-1 text-right">9,999+ 구매건 분석</p>
            </div>
          </div>

          <div className="w-full h-[8px] bg-surface-container" />

          <div className="p-container-margin">
            <h3 className="text-headline-sm-mobile mb-stack-md">구매 고객의 상점리뷰 (9,999+건)</h3>
            <div className="flex flex-col gap-2 mb-stack-lg">
              <div className="flex items-start">
                <span className="text-body-md text-text-secondary w-24 shrink-0 mt-1">이런점이 좋아요</span>
                <div className="flex flex-wrap gap-2">
                  {["합리적인 가격 (900)", "빠른 배송 (956)", "고객응대가 훌륭해요 (801)"].map((t) => (
                    <span key={t} className="inline-flex items-center px-3 py-1.5 rounded-full bg-surface-container-low border border-border-gray text-body-md text-text-primary">
                      <Icon name="check" className="text-primary text-[14px] mr-1 font-bold" /> {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-start mt-2">
                <span className="text-body-md text-text-secondary w-24 shrink-0 mt-1">이런점이 아쉬워요</span>
                <div className="flex flex-wrap gap-2">
                  {["불량품이 많아요 (750)", "원하는 제품이 아니었어요 (89)"].map((t) => (
                    <span key={t} className="inline-flex items-center px-3 py-1.5 rounded-full bg-surface-container-low border border-border-gray text-body-md text-error">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-3 border-t border-b border-border-gray mb-stack-lg">
              <button
                className="flex items-center cursor-pointer text-body-md-bold text-text-primary"
                onClick={() => setSortBy(sortBy === "최신순" ? "추천순" : "최신순")}
              >
                {sortBy} <Icon name="expand_more" className="text-[16px] ml-1" />
              </button>
              <div className="flex items-center cursor-pointer text-text-secondary">
                <Icon name="tune" className="text-[18px]" />
              </div>
            </div>

            <div className="space-y-section-gap">
              {REVIEWS.map((r) => (
                <div key={r.name + r.date} className="border-b border-surface-container pb-section-gap">
                  <div className="flex items-center justify-between mb-stack-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-outline">
                        <Icon name="person" className="text-[20px]" />
                      </div>
                      <span className="text-body-md-bold">{r.name}</span>
                    </div>
                    <span className="text-label-sm text-outline">{r.date}</span>
                  </div>
                  <div className="flex items-center mb-stack-md">
                    <StarRating rating={r.rating} size={16} />
                    <span className="ml-2 text-body-md-bold text-text-primary">{r.label}</span>
                  </div>
                  <div className="flex gap-2">
                    {r.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-label-sm rounded border ${
                          r.negative
                            ? "bg-error-container text-on-error-container border-error-container"
                            : "bg-surface-container-low text-text-secondary border-border-gray"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <BottomNavBar />
    </div>
  );
}
