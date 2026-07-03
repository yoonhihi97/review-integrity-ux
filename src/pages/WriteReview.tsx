import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";

export default function WriteReview() {
  const navigate = useNavigate();
  const [productRating, setProductRating] = useState(5);
  const [taste, setTaste] = useState("good");
  const [productText, setProductText] = useState("");
  const [sellerSatisfied, setSellerSatisfied] = useState<"up" | "down">("up");
  const [sellerText, setSellerText] = useState("");

  const submit = () => {
    navigate(-1);
  };

  return (
    <div className="text-text-primary pb-[80px] bg-white min-h-screen">
      <header className="flex justify-between items-center w-full px-container-margin h-14 bg-surface-container-lowest sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button aria-label="뒤로가기" className="flex items-center justify-center p-1" onClick={() => navigate(-1)}>
            <Icon name="arrow_back_ios" className="text-text-primary text-[24px]" />
          </button>
          <h1 className="text-headline-sm-mobile text-text-primary">리뷰 작성하기</h1>
        </div>
      </header>

      <main className="px-container-margin pt-stack-lg pb-section-gap">
        <section className="mb-[32px]">
          <div className="flex items-center gap-2 mb-stack-lg">
            <div className="w-8 h-8 rounded-full bg-rating-gold flex items-center justify-center text-white">
              <Icon name="inventory_2" filled className="text-[20px]" />
            </div>
            <h2 className="text-headline-sm-mobile text-text-primary">상품 품질 평가</h2>
          </div>
          <div className="flex gap-3 mb-section-gap">
            <img
              alt="헤이오트 카카오프렌즈 현미누룽지 오트밀"
              className="w-20 h-20 object-cover rounded-lg bg-surface-container-low"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTfyJboZd-qta_wOpLXcmKM5--KGhYHOiilaDw7U-Mb1f5cFt6sW6UiwFr82aE6jnDWwVHioFJAIzs7Kk86DWVqUZbDVMm_sNAEyhHPeELHCPWDhTzNvPa6CmekwKkpGb_m2rdbU4TRHosZWlZdF71CQdIVmkV0DcC0bjjPz1sW3oNBSrfbAxZI7y4K5rXMuXcopaoXTwTL5iDfuC0G7Gr1SMG7KKzGcXinvuTGE45gTcZDttZtrXI"
            />
            <p className="text-body-md-bold text-text-primary flex-1">
              헤이오트 카카오프렌즈 현미누룽지 오트밀 20p, 640g, 4개
            </p>
          </div>
          <div className="mb-section-gap">
            <p className="text-body-lg-bold mb-stack-sm">이 상품의 품질에 대해 얼마나 만족하시나요?</p>
            <div className="flex gap-1 mb-stack-lg text-rating-gold">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} onClick={() => setProductRating(i)}>
                  <Icon name="star" filled={i <= productRating} className="text-[40px]" />
                </button>
              ))}
            </div>
            <p className="text-body-md">이 상품을 상세히 평가해주세요.</p>
          </div>
          <div className="mb-section-gap">
            <p className="text-body-lg-bold mb-stack-lg">직접 드셔보니 맛은 어땠나요?</p>
            <div className="flex flex-col gap-4">
              {[
                { value: "good", label: "맛있어요" },
                { value: "normal", label: "보통이예요" },
                { value: "bad", label: "생각보다 별로예요" },
              ].map((opt) => (
                <label key={opt.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="taste"
                    className="radio-primary"
                    checked={taste === opt.value}
                    onChange={() => setTaste(opt.value)}
                  />
                  <span className="text-body-md ml-1">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="border border-border-gray rounded-lg overflow-hidden">
            <textarea
              className="w-full h-24 p-3 text-body-md text-text-secondary border-none resize-none focus:ring-0 placeholder:text-outline-variant"
              placeholder="다른 고객님에게 도움이 되도록 상품에 대한 솔직한 평가를 남겨주세요. (상품 품질과 관계 없는 배송, 포장, 질문 응대, 상품 가격 등은 판매자 서비스 평가에 남겨주세요.)"
              value={productText}
              onChange={(e) => setProductText(e.target.value)}
            />
            <div className="border-t border-border-gray p-3 flex justify-center">
              <button className="flex items-center gap-1 text-primary-container text-body-md-bold">
                <Icon name="add_a_photo" className="text-[20px]" /> 첨부하기
              </button>
            </div>
          </div>
        </section>

        <section className="mb-[32px]">
          <div className="flex items-center gap-2 mb-stack-lg">
            <div className="w-8 h-8 rounded-full bg-[#5E4DE4] flex items-center justify-center text-white">
              <Icon name="person" filled className="text-[20px]" />
            </div>
            <h2 className="text-headline-sm-mobile text-text-primary">판매자 서비스 평가</h2>
          </div>
          <div className="flex items-center gap-2 mb-stack-md text-text-secondary">
            <Icon name="storefront" filled className="text-[20px]" />
            <span className="text-body-lg-bold text-text-primary">젤리뽀</span>
          </div>
          <p className="text-body-lg-bold mb-stack-lg leading-snug">
            배송, 포장, 질문 응대, 상품 가격 등 판매자에 대한 만족도는 어떠셨나요?
          </p>
          <div className="flex gap-4 mb-stack-lg">
            <button
              onClick={() => setSellerSatisfied("down")}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
                sellerSatisfied === "down" ? "bg-primary border-primary text-white" : "bg-white border-border-gray text-text-primary"
              }`}
            >
              <Icon name="thumb_down" className="text-[28px]" />
            </button>
            <button
              onClick={() => setSellerSatisfied("up")}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
                sellerSatisfied === "up" ? "bg-primary border-primary text-white" : "bg-white border-border-gray text-text-primary"
              }`}
            >
              <Icon name="thumb_up" className="text-[28px]" />
            </button>
          </div>
          <p className="text-body-md-bold mb-stack-md">
            {sellerSatisfied === "up" ? "만족하셨던 점을 작성해주세요!" : "아쉬웠던 점을 작성해주세요!"}
          </p>
          <div className="border border-border-gray rounded-lg overflow-hidden mb-section-gap">
            <textarea
              className="w-full h-24 p-3 text-body-md text-text-secondary border-none resize-none focus:ring-0 placeholder:text-outline-variant"
              placeholder={"판매자의 어떤 점이 마음에 드셨나요?\n(상품 품질이 아닌 배송, 포장, 질문 응대, 상품 가격 등 판매자에 대한 만족도를 평가해주세요.)"}
              value={sellerText}
              onChange={(e) => setSellerText(e.target.value)}
            />
            <div className="border-t border-border-gray p-3 flex justify-center">
              <button className="flex items-center gap-1 text-primary-container text-body-md-bold">
                <Icon name="add_a_photo" className="text-[20px]" /> 첨부하기
              </button>
            </div>
          </div>
        </section>

        <div className="bg-ai-purple rounded-lg p-3 flex items-start gap-2 mb-stack-lg">
          <Icon name="info" className="text-rocket-navy text-[20px] mt-0.5" />
          <p className="text-body-md text-text-primary leading-tight">
            상품 품질 평가와 판매자 서비스 평가는 별도로 집계되어 아이템위너 평점 혼용 문제를 방지합니다.
          </p>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest p-container-margin border-t border-border-gray pb-safe">
        <button
          onClick={submit}
          className="w-full h-12 bg-primary-container text-white text-body-lg-bold rounded-lg flex items-center justify-center"
        >
          리뷰 작성 완료
        </button>
      </div>
    </div>
  );
}
