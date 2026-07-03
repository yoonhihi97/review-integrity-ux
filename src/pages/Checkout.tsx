import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";

export default function Checkout() {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [payMethod, setPayMethod] = useState<"lump" | "installment">("lump");

  return (
    <div className="bg-[#EAEBED] text-text-primary antialiased min-h-screen relative">
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none filter blur-[2px] overflow-hidden">
        <header className="bg-surface sticky top-0 z-50 border-b border-border-gray flex justify-between items-center w-full px-4 h-14">
          <Icon name="arrow_back" className="text-on-surface-variant" />
          <h1 className="text-[18px] font-bold text-primary">Coupang</h1>
          <Icon name="search" className="text-on-surface-variant" />
        </header>
        <main className="flex-grow px-4 py-6 space-y-6">
          <section className="space-y-2">
            <h2 className="text-[20px] font-bold text-on-surface">판매자 안심 리포트</h2>
            <p className="text-[13px] text-on-surface-variant">Verified Seller Trust Metrics</p>
          </section>
          <section className="bg-white rounded-xl border border-border-gray p-6 flex flex-col items-center justify-center space-y-3 shadow-sm">
            <div className="bg-[#F1EEFB] text-[#5B3DF5] text-[12px] font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <Icon name="verified" filled />
              Verified Seller
            </div>
            <div className="text-center">
              <span className="text-[22px] font-extrabold text-on-surface block">Excellent (상)</span>
            </div>
          </section>
        </main>
      </div>

      <div className="fixed inset-0 bg-black/50 z-40" onClick={() => navigate(-1)} />

      <div className="fixed inset-x-0 bottom-0 z-50 flex flex-col justify-end max-w-[1200px] mx-auto h-[90vh]">
        <div className="bg-surface-container-low rounded-t-2xl shadow-2xl flex flex-col h-full overflow-hidden slide-up">
          <div className="bg-surface-container-lowest sticky top-0 z-20 rounded-t-2xl">
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-12 h-1.5 bg-surface-variant rounded-full" />
            </div>
            <div className="flex justify-between items-center px-4 py-2 border-b border-border-gray">
              <h1 className="text-headline-sm-mobile text-text-primary">주문/결제</h1>
              <button aria-label="닫기" className="text-text-primary p-1" onClick={() => navigate(-1)}>
                <Icon name="close" />
              </button>
            </div>
          </div>

          <div className="overflow-y-auto flex-1 pb-32">
            <div className="bg-surface-container-lowest mx-2 mt-4 rounded-xl shadow-sm overflow-hidden pb-4">
              <div className="p-4 border-b border-border-gray/50">
                <h3 className="text-[15px] leading-tight text-text-primary mb-3 font-body-md-bold">
                  [FRIN] 한 장이면 충분한 프린 스파이시 키친타월 (고평량 207매 더마테스트 인증), 1개, 828매
                </h3>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-1 mb-1">
                      <span className="text-body-lg-bold text-[18px]">18,900원</span>
                      <span className="text-[12px] font-bold text-discount-orange italic flex items-center">
                        <Icon name="rocket_launch" className="text-[14px] mr-[2px]" />
                        판매자로켓
                      </span>
                      <span className="text-[10px] text-delivery-green border border-delivery-green rounded px-1 ml-1 font-bold">
                        내일
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="text-[16px] text-tertiary-container font-body-lg-bold">
                        17,950<span className="text-[14px] font-medium">원</span>
                      </span>
                      <span className="text-[12px] text-tertiary-container">총 결제 금액</span>
                    </div>
                  </div>
                  <div className="flex items-center border border-border-gray rounded-md w-24 h-9">
                    <button
                      className="w-8 h-full flex items-center justify-center text-text-secondary"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    >
                      <Icon name="remove" className="text-[20px]" />
                    </button>
                    <span className="flex-1 text-center text-body-md-bold text-text-primary">{quantity}</span>
                    <button
                      className="w-8 h-full flex items-center justify-center text-text-secondary"
                      onClick={() => setQuantity((q) => q + 1)}
                    >
                      <Icon name="add" className="text-[20px]" />
                    </button>
                  </div>
                </div>
                <div className="mt-2 text-[13px] text-text-secondary">즉시할인 950원 적용됨</div>
                <div className="mt-1 flex items-center">
                  <span className="inline-flex items-center border border-border-gray rounded-full px-2 py-[2px] text-[12px] text-text-primary">
                    <span className="w-4 h-4 bg-rating-gold rounded-full text-white flex items-center justify-center text-[10px] font-bold mr-1">
                      C
                    </span>
                    718원 적립
                  </span>
                </div>
                <div className="mt-3 text-[14px] font-medium text-text-primary">무료배송</div>
              </div>

              <div className="p-4 border-b border-border-gray/50 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="w-5 h-5 bg-text-primary rounded-full text-white flex items-center justify-center text-[12px] font-bold mr-2">
                    C
                  </span>
                  <span className="text-body-md-bold text-[15px] mr-2">쿠팡캐시</span>
                  <button className="border border-border-gray bg-surface-container-lowest text-text-secondary text-[12px] px-2 py-1 rounded">
                    전액사용
                  </button>
                </div>
                <div className="text-right">
                  <div className="border border-border-gray rounded px-3 py-2 w-28 text-right text-body-md text-text-primary">
                    0 원
                  </div>
                  <div className="text-[12px] text-text-secondary mt-1">잔여: 17,518원</div>
                </div>
              </div>

              <div className="p-4 border-b border-border-gray/50 relative">
                <button className="absolute top-4 right-4 border border-primary text-primary text-[12px] px-3 py-1 rounded bg-surface-container-lowest">
                  변경
                </button>
                <div className="flex items-start">
                  <Icon name="location_on" filled className="text-[20px] text-text-primary mr-2 mt-[2px]" />
                  <div>
                    <div className="text-body-md-bold text-[16px] mb-1">김진홍</div>
                    <div className="text-[14px] text-text-secondary mb-2 line-clamp-1">
                      대구광역시 동구 신암동 1852 동대구 해모로 스퀘...
                    </div>
                    <div className="text-[15px] text-delivery-green font-medium">내일(금) 7/3 도착</div>
                  </div>
                </div>
              </div>

              <div className="p-4 relative">
                <button className="absolute top-4 right-4 border border-primary text-primary text-[12px] px-3 py-1 rounded bg-surface-container-lowest">
                  변경
                </button>
                <div className="flex items-start mb-4">
                  <Icon name="account_balance_wallet" className="text-[20px] text-text-primary mr-2 mt-[2px]" />
                  <div>
                    <div className="text-body-md-bold text-[16px] mb-1">신용/체크카드</div>
                    <div className="text-[14px] text-text-secondary">와우 카드(KB) / 669*, 일시불</div>
                  </div>
                </div>
                <div className="pl-7 space-y-4 mt-2">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      className="radio-primary"
                      checked={payMethod === "lump"}
                      onChange={() => setPayMethod("lump")}
                    />
                    <span className={`text-[15px] ${payMethod === "lump" ? "font-bold text-text-primary" : "text-text-primary"}`}>
                      일시불
                    </span>
                  </label>
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      className="radio-primary"
                      checked={payMethod === "installment"}
                      onChange={() => setPayMethod("installment")}
                    />
                    <span className="text-[15px] text-text-primary">3개월 무이자 월 5,983원</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="px-4 mt-4 text-[12px] text-text-secondary/80 leading-relaxed">
              <p className="mb-3">
                오픈마켓 상품의 경우, 쿠팡(주)는 통신판매중개자로서 상품정보 및 거래에 대한 책임을 지지 않습니다.
              </p>
              <p>
                주문 내용을 확인하였으며, <span className="underline">구매조건, 결제대행 서비스</span> 및 개인정보 제 3자
                제공 <span className="underline">(쿠팡(주)</span> 및 <span className="underline">쿠팡풀필먼트서비스(유) 포함)</span>. 및
                결제에 동의합니다.
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full bg-surface-container-low p-4 z-40 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] border-t border-border-gray/30">
            <button
              onClick={() => navigate("/order-complete")}
              className="w-full bg-primary rounded-lg h-14 relative flex items-center overflow-hidden"
            >
              <div className="absolute left-0 top-0 h-full w-14 bg-blue-600 flex items-center justify-center z-10 border-r border-white/20">
                <Icon name="double_arrow" className="text-white text-[24px]" />
              </div>
              <div className="w-full text-center text-white text-body-lg-bold text-[18px]">밀어서 결제하기</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
