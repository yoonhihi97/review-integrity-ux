import { useNavigate } from "react-router-dom";
import Icon from "../components/Icon";
import StarRating from "../components/StarRating";
import BottomNavBar from "../components/BottomNavBar";

interface WritableReview {
  id: string;
  dDay: number;
  title: string;
  img: string;
}

const WRITABLE_REVIEWS: WritableReview[] = [
  {
    id: "tooc-lip-tint",
    dDay: 5,
    title: "투크 윗아웃 미러 립 틴트, 02 겟 러브, 1개",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTxxwRs_sHEiBbLVLmemlmofiX5f98SSQfhnJ68QkicKWZgR_L4zzXw21hTE0YUbrc-EhPR1jTgDB6kDzGRmxK2XadfDiR4vOixq85W3XJNejNA3j39wSf3jaDm8IzSk9Nr4y8AokA_x9kEmkRwncB4byPKWzyD2ShVjllVBIvZ0KHhcdc_1QuVtwAOUI34V3U_GywznTWugwocCcT5x3FCBSh8kQtYUtqfyO_7gnHxJuHrD4Sj3Dx",
  },
  {
    id: "peripera-tint",
    dDay: 1,
    title: "페리페라 잉크 더 벨벳 틴트, 01 굿브릭, 1개",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcoT9JpvMjRGhqvrU3oC3uXLu8vdc8pSXbJCMD4N8_VI9xu6RSj7q40gusF626Wt8pT3iUwVHAJjOp3IEP-djvo3-0OtV3uWJAfRG8le1M86sHc_asSrE8cXp1dVupWJPtEyCOz2oGmfE_DdX5zW7VDkIN3dZQD-nF9s3Zy2bcjd5dNbzGcxehR3orkZRVP0l62NeNEgzwlt7itBAWPMN1KVdyc1VaYPAyW3G42a25t3GiWJsnvnmy",
  },
  {
    id: "romand-tint",
    dDay: 3,
    title: "롬앤 쥬시 래스팅 틴트 베어 쥬시 시리즈, 25 베어 그레이프, 1개",
    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBTxxwRs_sHEiBbLVLmemlmofiX5f98SSQfhnJ68QkicKWZgR_L4zzXw21hTE0YUbrc-EhPR1jTgDB6kDzGRmxK2XadfDiR4vOixq85W3XJNejNA3j39wSf3jaDm8IzSk9Nr4y8AokA_x9kEmkRwncB4byPKWzyD2ShVjllVBIvZ0KHhcdc_1QuVtwAOUI34V3U_GywznTWugwocCcT5x3FCBSh8kQtYUtqfyO_7gnHxJuHrD4Sj3Dx",
  },
];

export default function MyPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface-bright min-h-screen pb-24">
      <section className="bg-surface-container-low px-container-margin pt-stack-lg pb-section-gap">
        <div className="flex items-center justify-between mb-stack-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-surface-container-highest" />
            <span className="text-headline-sm text-text-primary">이*지</span>
          </div>
          <button className="text-text-primary" aria-label="설정">
            <Icon name="settings" className="text-2xl" />
          </button>
        </div>

        <div className="bg-surface-container-lowest rounded-lg border border-border-gray overflow-hidden">
          <button className="w-full flex items-center justify-between px-4 py-3 border-b border-border-gray">
            <div className="flex items-center gap-2">
              <span className="text-rocket-navy font-black italic">WOW!</span>
              <span className="text-body-md text-text-secondary">혜택 이용중</span>
            </div>
            <div className="flex items-center gap-1 text-body-md-bold text-text-primary">
              총 147,030원 절약했어요!
              <Icon name="chevron_right" className="text-text-secondary" />
            </div>
          </button>
          <div className="flex divide-x divide-border-gray">
            <div className="flex-1 flex items-center justify-between px-4 py-3">
              <span className="text-body-md text-text-secondary">쿠팡 캐시</span>
              <span className="text-body-md-bold text-text-primary">0원</span>
            </div>
            <div className="flex-1 flex items-center justify-between px-4 py-3">
              <span className="text-body-md text-text-secondary">쿠페이 머니</span>
              <span className="text-body-md-bold text-text-primary">0원</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-surface-container-lowest py-section-gap border-b border-border-gray">
        <div className="flex items-center justify-between px-container-margin mb-stack-md">
          <h2 className="text-headline-sm-mobile text-text-primary">작성 가능한 리뷰</h2>
          <button className="flex items-center text-body-md text-primary">
            전체 보기 <Icon name="chevron_right" className="text-sm" />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto scrollbar-hide px-container-margin">
          {WRITABLE_REVIEWS.map((r) => (
            <button
              key={r.id}
              onClick={() => navigate("/review/write")}
              className="w-[152px] shrink-0 border border-border-gray rounded-lg p-3 text-left"
            >
              <span className="inline-block bg-primary-container text-white text-[11px] font-bold px-2 py-1 rounded mb-2">
                D-{r.dDay} 작성 마감
              </span>
              <div className="w-full aspect-square rounded-lg overflow-hidden bg-surface-container-low mb-2">
                <img src={r.img} alt={r.title} className="w-full h-full object-cover" />
              </div>
              <StarRating rating={0} size={16} />
            </button>
          ))}
        </div>
      </section>

      <section className="bg-surface-container-lowest py-section-gap text-center">
        <div className="flex items-center justify-center gap-4 text-body-md text-text-secondary">
          <button>고객센터</button>
          <span className="text-outline-variant">|</span>
          <button>로그아웃</button>
        </div>
      </section>

      <BottomNavBar />
    </div>
  );
}
