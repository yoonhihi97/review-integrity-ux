import Icon from "./Icon";

const TIERS = [
  { label: "안심 최우수", range: "4.5 ~ 5.0", tone: "text-delivery-green" },
  { label: "안심 우수", range: "3.5 ~ 4.4", tone: "text-rating-gold" },
  { label: "안심 주의", range: "3.4 이하", tone: "text-error" },
];

export default function TrustInfoSheet({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-end bg-black/40" onClick={onClose}>
      <div
        className="w-full bg-white rounded-t-2xl p-5 pb-6 slide-up max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center pb-3">
          <div className="w-12 h-1.5 bg-surface-variant rounded-full" />
        </div>
        <div className="flex items-center gap-1.5 mb-3">
          <Icon name="verified_user" filled className="text-delivery-green text-[22px]" />
          <h2 className="text-headline-sm-mobile text-text-primary">안심 평점이란?</h2>
        </div>
        <p className="text-body-md text-text-secondary leading-relaxed mb-4">
          실제 구매자들의 배송, 포장 상태, 문의 응대, 정품 여부 등 거래 경험을 바탕으로 산출되는 판매자
          신뢰 지표예요. 5.0점 만점으로, 점수가 높을수록 안심하고 거래할 수 있는 판매자라는 뜻이에요.
        </p>
        <div className="rounded-lg border border-border-gray overflow-hidden mb-4">
          {TIERS.map((t, i) => (
            <div
              key={t.label}
              className={`flex items-center justify-between px-4 py-2.5 ${i > 0 ? "border-t border-border-gray" : ""}`}
            >
              <span className={`text-body-md-bold ${t.tone}`}>{t.label}</span>
              <span className="text-body-md text-text-secondary">{t.range}</span>
            </div>
          ))}
        </div>
        <div className="bg-surface-container-low rounded-lg p-3 mb-5">
          <p className="text-body-md-bold text-text-primary mb-1">쿠팡 추천과는 어떻게 다른가요?</p>
          <p className="text-body-md text-text-secondary leading-relaxed">
            "쿠팡 추천"은 가격, 배송 조건 등을 종합적으로 고려해 쿠팡이 골라주는 옵션이에요. "안심 평점"은
            그 판매자와 실제로 거래한 구매자들의 신뢰도 데이터예요. 두 지표는 서로 다른 기준이라 함께
            참고하면 더 좋은 선택을 할 수 있어요.
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-full h-12 bg-primary text-white text-body-lg-bold rounded-lg flex items-center justify-center"
        >
          확인했어요
        </button>
      </div>
    </div>
  );
}
