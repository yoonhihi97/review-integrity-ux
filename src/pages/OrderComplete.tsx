import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";

const PREVIOUS_ITEMS = [
  {
    id: "shoe-rack",
    alt: "원목 신발장",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCbsgRf-tGdWC8LJ7av4NhSZBsPSm-Nd1z6tJN1loYauYcg5qdQ_Ft9zbrA6kObBs-CiT5XiaT2aZh1PgwUmaA_4vILEm2VuieqgafLcA8F_LV7FR-Qm5IoSH-G6DC6NpEay5azyUfo_21YfEq042_vHVjQ_Pr_yTeptjV5abhmk7BSYy-k2Y8Ktytf1TXKOyatAE_FvsKDRlw2IEhIMumYEiFTOcN3sCAY2vo487jHhe1k2nO7dyT7",
    contain: false,
  },
  {
    id: "blue-pens",
    alt: "파란색 펜",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYl5jDTShZxhwn8HzFOchHLFv1o_v_GRKwltecHRr0SMA-x8zz_zbKo7DzZFHExtr-UlOuuorUF4nsi-6O-r2fl4_U4A-pT2e-MBFgGGcVcRUp15gWVjOcrydmnij2O2uWtWbjEETSFoOabQppLy55sxquCZp_ePtfX5IDcHheMTk1agJcszJ0PI2lDZfkyB8ZZsQoUUr_fDgB5jPvDriWOx06EFZVYZP9f2EYXzecK7H6FBYhMtzp",
    contain: true,
  },
];

export default function OrderComplete() {
  const navigate = useNavigate();

  return (
    <div className="text-gray-900 pb-10 bg-[#f0f0f0] min-h-screen">
      <header className="bg-white sticky top-0 z-50 border-b border-gray-200">
        <div className="flex items-center justify-between h-14 px-4">
          <div className="w-8" />
          <h1 className="text-lg font-bold">주문 완료</h1>
          <button aria-label="Close" className="p-2" onClick={() => navigate("/")}>
            <Icon name="close" className="text-gray-500" />
          </button>
        </div>
      </header>

      <main className="max-w-md mx-auto">
        <section className="px-4 py-5 bg-[#f0f0f0]">
          <p className="text-lg text-gray-700">
            원터치 결제 <span className="font-bold text-black">주문이 완료</span>되었습니다!
          </p>
        </section>

        <section className="mx-3 mb-3 bg-white rounded shadow-sm border-l-4 border-[#008A00] overflow-hidden">
          <div className="p-4 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-1 mb-1">
                <span className="text-blue-600 font-bold italic text-sm">🚀 로켓</span>
                <span className="bg-green-100 text-green-700 text-xs font-bold px-1 rounded border border-green-300">
                  새벽
                </span>
                <span className="text-green-700 font-bold ml-1">내일(금) 새벽 도착 (상품 1개)</span>
              </div>
              <p className="text-green-700 text-xs">판매자 : 쿠팡</p>
            </div>
            <Icon name="expand_more" className="text-gray-400" />
          </div>
        </section>

        <section className="mx-3 mb-3 bg-white rounded shadow-sm">
          <div className="p-4 space-y-3">
            <div className="flex">
              <span className="w-20 text-gray-500 text-sm">받는사람</span>
              <span className="text-sm font-medium">홍*동 / 010-****-1234</span>
            </div>
            <div className="flex items-start">
              <span className="w-20 text-gray-500 text-sm mt-0.5">받는주소</span>
              <div className="flex-1 text-sm text-gray-700 pr-2">
                서울특별시 강동구 고덕로 429 팍스애비뉴 4~5층 (청년취업사관학교 강동 캠퍼스)
              </div>
              <button className="text-blue-500 text-sm whitespace-nowrap flex items-center">
                변경하기 <Icon name="chevron_right" className="text-base" />
              </button>
            </div>
            <hr className="border-gray-100 my-2" />
            <div className="flex items-center justify-between pt-2">
              <span className="font-bold text-[15px]">총 결제금액</span>
              <div className="text-right">
                <span className="text-gray-400 text-xs mr-2">쿠팡와우카드(KB국민) / 일시불</span>
                <span className="text-xl font-bold text-[#e52528]">
                  20,670 <span className="text-base font-bold">원</span>
                </span>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 py-3 text-center">
            <button className="text-blue-500 text-sm font-medium flex items-center justify-center w-full">
              자세히 보기 <Icon name="expand_more" className="text-base ml-1" />
            </button>
          </div>
        </section>

        <section className="mx-3 mb-3 bg-white rounded shadow-sm p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="font-bold">쿠팡캐시 적립예정</span>
              <Icon name="help" className="text-gray-400 text-base ml-1" />
            </div>
            <div className="font-bold flex items-center">
              826 원 <Icon name="chevron_right" className="text-base ml-0.5 text-gray-400" />
            </div>
          </div>
          <div className="text-xs text-gray-500 space-y-1">
            <div>
              와우 카드 혜택 <span className="border border-gray-300 rounded px-1 ml-1 text-gray-600">최대 4%</span>
            </div>
            <div>ㄴ 와우 카드로 총 24,930 원 적립예정</div>
          </div>
        </section>

        <section className="mx-3 mb-6 bg-white rounded shadow-sm p-6 flex flex-col items-center justify-center h-32">
          <p className="font-bold mb-3 text-[15px]">구매 경험이 만족스러웠나요?</p>
          <div className="flex space-x-2 text-gray-200">
            {[1, 2, 3, 4, 5].map((i) => (
              <button key={i}>
                <Icon name="star" filled className="text-[32px]" />
              </button>
            ))}
          </div>
        </section>

        <section className="bg-white pt-6 pb-8">
          <h2 className="px-4 text-lg font-bold mb-4">이전에 구매한 상품은 어떠셨나요?</h2>
          <div className="flex overflow-x-auto scrollbar-hide px-4 space-x-3 pb-2">
            {PREVIOUS_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate("/review/write")}
                className="flex-none w-[200px] border border-gray-200 rounded-lg p-3 text-center bg-white shadow-sm"
              >
                <p className="font-medium text-sm mb-3">별점을 남겨보세요</p>
                <div className={`h-32 bg-gray-100 flex items-center justify-center rounded ${item.contain ? "p-2" : ""}`}>
                  <img
                    alt={item.alt}
                    className={`h-full ${item.contain ? "object-contain" : "object-cover"}`}
                    src={item.img}
                  />
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
