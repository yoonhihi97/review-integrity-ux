import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import StarRating from '../components/StarRating';

const RATING_DISTRIBUTION = [
  { star: 5, pct: 71 },
  { star: 4, pct: 18 },
  { star: 3, pct: 7 },
  { star: 2, pct: 2 },
  { star: 1, pct: 2 },
];

const MENTION_TAGS = [
  { label: '발색력', count: 24 },
  { label: '발림성', count: 15 },
  { label: '사용감', count: 13 },
  { label: '지속력', count: 11 },
  { label: '활용도', count: 11 },
];

const MEDIA_THUMBS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAh2tTC4CVDzzUMU9u-DoT6d3keLSnNavuIK_ZWaD5PVmaooyAHqfrJScZKGzl_5RiunzKt4YBqc62MZ30zHhRroh1jqcO2N_ML6GasPQlFI49FioGUjYFaWkxn7yr9zGgn_bg6MyIZyeC8RVs_w4kbTIJIddisxy8EywertC94ad313-5MLyKYZ3uaJC7wWoRsAvvoPER21qYUTCDztjCJEGvLr_zjRdEjLNN6SsdDJqAbGQYn8rb1',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBl7vMH3ANkw9gpqwq5bdm48KV9nJObqg5RtnYQng0CALvks8xTyK_F82Rtje2dtNidF8foCVvM9V9STajONMf4uzZjDwIziB8bWtSDzGtlEeREtisQRpL_yzV2A5n6MytaiWiXb5MFt2zSYsEONe0nCiVVGle1PWTKSDGFe46LcC3SZ2fA30G5OhIzJSF42h8os01UUry8w4pDB3xJZirTpOssOeiYrhr6XeKMBrGDU23rhLEus_N4',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCYrT590fWGPIh766MPgJPUaD40uv4DlsjZ_n1XqotlyX7epCE12G-J31jIYwmw1BIldJ9XAV3gauDx_0P9j6C9AKuFZie5XOpqnfrBVVp1YjXKuf4ieCDVvTgW6RXkN3BsQ1eisqQIOlr1FDp6NcIYYt3tK2iybd9VvorNKfdUv88nonfGwx4baLzsvTDhZM_jXMi1LJfShdezi5CaHJefKfFsmkHSPt70uQmoYthCFviMxcT_dGFR',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBQ6WcjXEgdYChwZEzbFpSsAxaG7GkRg8pF1_3qbxmEliAIqR45u7Hgb1p32aCipGFUpURhFSyxsGmC2w89J-KFYMjR5hKY18mNOMNjGVlCS6amXOP5v70Rb-wHQ3LnQo9LAuavgjc0o_Qq4rWMetVl0SosIaLlVQk-94c_rX-8J-YncfqSknBLChYcXGziRxGg5879QcpF4KINUiuvAT97NrWILzUXZ0p3V6bH2vagWqA0R4_lzXdp',
];

const RATING_FILTER_ROWS = [
  { key: 'all', label: '모든 별점 보기', count: 656 },
  { key: '5', label: '5점 이상', count: 420, stars: 5 },
  { key: '4', label: '4점 이상', count: 150, stars: 4 },
  { key: '3', label: '3점 이상', count: 60, stars: 3 },
  { key: '2', label: '2점 이상', count: 16, stars: 2 },
  { key: '1', label: '1점 이상', count: 10, stars: 1 },
];

const PERIODS = ['최근 1개월', '3개월', '6개월', '1년', '전체'];
const PERIOD_DAYS: Record<string, number | null> = {
  전체: null,
  '최근 1개월': 30,
  '3개월': 90,
  '6개월': 180,
  '1년': 365,
};
const OPTIONS = ['전체 옵션', '01 베어 애프리콧 (124)', '02 겟 러브 (320)'];

const CURRENT_SELLER_NAME = '주식회사 뉴뷰티';

function daysAgo(n: number): Date {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function formatDate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}.${m}.${day}`;
}

interface Review {
  id: string;
  author: string;
  rating: number;
  date: Date;
  sellerName: string;
  isCurrentSeller: boolean;
  optionKey: '01' | '02';
  hasMedia: boolean;
  mediaIdx: number[];
  title: string;
  body: string;
}

const REVIEWS: Review[] = [
  {
    id: 'r1',
    author: '스라소닝',
    rating: 5,
    date: daysAgo(3),
    sellerName: CURRENT_SELLER_NAME,
    isCurrentSeller: true,
    optionKey: '02',
    hasMedia: true,
    mediaIdx: [0, 1, 2],
    title: '맑고 생기 있는 컬러',
    body: '평소 자연스럽고 맑게 발색되는 틴트를 좋아해서 겟 러브를 구매했습니다. 입술에 얇고 가볍게 밀착되면서 여러 번 덧발라도 답답한 느낌이 적었고, 생기 있는 컬러 덕분에 데일리 메이크업에 손이 자주 갔습니다.',
  },
  {
    id: 'r2',
    author: '민트초코라떼',
    rating: 4,
    date: daysAgo(20),
    sellerName: '굿퀄리티샵',
    isCurrentSeller: false,
    optionKey: '01',
    hasMedia: false,
    mediaIdx: [],
    title: '발림성이 좋아요',
    body: '베어 애프리콧 컬러가 생각보다 자연스러워서 만족스러웠습니다. 다만 지속력은 다른 제품보다 살짝 아쉬운 편이라 중간에 한 번 덧발라야 했어요.',
  },
  {
    id: 'r3',
    author: '새벽별',
    rating: 5,
    date: daysAgo(45),
    sellerName: CURRENT_SELLER_NAME,
    isCurrentSeller: true,
    optionKey: '02',
    hasMedia: true,
    mediaIdx: [1, 2],
    title: '재구매 의사 100%',
    body: '겟 러브 컬러는 얼굴에 자연스럽게 생기를 더해주는 톤이라 데일리 메이크업과 잘 어울렸습니다. 한 번 바르면 은은하게 발색되고, 여러 번 덧바르면 조금 더 선명한 컬러를 연출할 수 있었어요.',
  },
  {
    id: 'r4',
    author: '코스모스언니',
    rating: 3,
    date: daysAgo(75),
    sellerName: '데일리뷰티',
    isCurrentSeller: false,
    optionKey: '01',
    hasMedia: false,
    mediaIdx: [],
    title: '무난한 발색이에요',
    body: '특별히 튀지 않는 무난한 색감이라 회사에서 사용하기 좋았습니다. 다만 포장 상태가 조금 아쉬웠어요.',
  },
  {
    id: 'r5',
    author: '하늘하늘구름',
    rating: 4,
    date: daysAgo(150),
    sellerName: CURRENT_SELLER_NAME,
    isCurrentSeller: true,
    optionKey: '02',
    hasMedia: true,
    mediaIdx: [0],
    title: '지속력 괜찮아요',
    body: '식사 후에도 색이 크게 빠지지 않아서 만족스러웠습니다. 향도 은은해서 부담스럽지 않았어요.',
  },
  {
    id: 'r6',
    author: '딸기라떼우유',
    rating: 2,
    date: daysAgo(280),
    sellerName: '굿퀄리티샵',
    isCurrentSeller: false,
    optionKey: '01',
    hasMedia: false,
    mediaIdx: [],
    title: '생각보다 건조해요',
    body: '발림성은 나쁘지 않은데 시간이 지나면 입술이 건조해지는 느낌이 있었습니다. 각질이 있는 날엔 더 도드라져서 아쉬웠어요.',
  },
  {
    id: 'r7',
    author: '초코민트향기',
    rating: 5,
    date: daysAgo(400),
    sellerName: CURRENT_SELLER_NAME,
    isCurrentSeller: true,
    optionKey: '02',
    hasMedia: false,
    mediaIdx: [],
    title: '인생틴트 등극',
    body: '여러 틴트를 써봤지만 발색력과 지속력 밸런스가 가장 좋았습니다. 재구매해서 계속 쓰고 있어요.',
  },
  {
    id: 'r8',
    author: '봄날의곰돌이',
    rating: 1,
    date: daysAgo(500),
    sellerName: '데일리뷰티',
    isCurrentSeller: false,
    optionKey: '01',
    hasMedia: true,
    mediaIdx: [2, 3],
    title: '포장이 아쉬웠어요',
    body: '제품 자체는 무난했지만 배송 중 포장이 눌려서 도착했습니다. 판매자 응대도 다소 늦은 편이었어요.',
  },
];

const TOTAL_REVIEW_COUNT = REVIEWS.length;
const CURRENT_SELLER_REVIEW_COUNT = REVIEWS.filter(
  (r) => r.isCurrentSeller,
).length;

function optionKeyFromLabel(label: string): '01' | '02' | null {
  if (label.startsWith('01')) return '01';
  if (label.startsWith('02')) return '02';
  return null;
}

interface AppliedFilters {
  rating: string;
  period: string;
  option: string;
}

function FilterPanel({
  onClose,
  onApply,
  initial,
}: {
  onClose: () => void;
  onApply: (filters: AppliedFilters) => void;
  initial: AppliedFilters;
}) {
  const [ratingFilter, setRatingFilter] = useState(initial.rating);
  const [period, setPeriod] = useState(initial.period);
  const [option, setOption] = useState(initial.option);

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/40"
      onClick={onClose}
    >
      <div
        className="w-[85%] sm:w-[400px] h-full bg-white flex flex-col slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary text-white flex items-center justify-between px-4 py-3 shrink-0 h-[50px]">
          <div className="flex items-center space-x-1">
            <Icon name="filter_alt" className="text-[20px]" />
            <h2 className="font-bold text-[16px]">스마트필터</h2>
          </div>
          <button
            aria-label="Close Filter"
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-white"
            onClick={onClose}
          >
            <Icon name="close" className="text-[20px]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overflow-x-hidden pb-[70px] bg-white">
          <div className="border-b border-[#EEEEEE]">
            <div className="px-4 py-3 flex justify-between items-center bg-white">
              <h3 className="font-bold text-[15px] text-text-primary">별점</h3>
              <button
                className="text-text-secondary text-[13px]"
                onClick={() => setRatingFilter('all')}
              >
                초기화
              </button>
            </div>
            <ul className="flex flex-col">
              {RATING_FILTER_ROWS.map((row) => (
                <li
                  key={row.key}
                  onClick={() => setRatingFilter(row.key)}
                  className={`px-4 py-3 flex justify-between items-center cursor-pointer border-t border-[#EEEEEE] ${
                    ratingFilter === row.key ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  {row.key === 'all' ? (
                    <span className="font-bold text-[14px] text-primary">
                      {row.label}
                    </span>
                  ) : (
                    <>
                      <span className="text-[14px] text-text-primary w-16 whitespace-nowrap">
                        {row.label}
                      </span>
                      <div className="flex flex-1 items-center space-x-0.5">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Icon
                            key={i}
                            name="star"
                            filled
                            className={`text-[20px] ${i <= (row.stars ?? 0) ? 'text-rating-gold' : 'text-surface-container-highest'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  <span
                    className={`text-[14px] ${row.key === 'all' ? 'font-bold text-primary' : 'text-text-secondary'}`}
                  >
                    {row.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-b border-[#EEEEEE] py-4 px-4">
            <h3 className="font-bold text-[15px] text-text-primary mb-3">
              기간
            </h3>
            <div className="flex flex-wrap gap-2">
              {PERIODS.map((p) => (
                <button
                  key={p}
                  onClick={() => setPeriod(p)}
                  className={`px-4 py-1.5 rounded-full border text-[13px] whitespace-nowrap ${
                    period === p
                      ? 'border-primary text-primary bg-white'
                      : 'border-border-gray text-text-primary bg-white'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="py-4 px-4 border-b border-[#EEEEEE]">
            <div className="flex items-center space-x-1 mb-3">
              <h3 className="font-bold text-[15px] text-primary">
                옵션별 보기
              </h3>
              <Icon
                name="smart_toy"
                className="text-[16px] text-white bg-primary rounded-full p-0.5"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {OPTIONS.map((o) => (
                <button
                  key={o}
                  onClick={() => setOption(o)}
                  className={`px-4 py-1.5 rounded-full border text-[13px] whitespace-nowrap ${
                    option === o
                      ? 'border-primary text-primary bg-white'
                      : 'border-border-gray text-text-primary bg-white'
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-border-gray p-3">
          <button
            onClick={() => {
              onApply({ rating: ratingFilter, period, option });
              onClose();
            }}
            className="w-full h-12 bg-primary text-white text-body-lg-bold rounded-lg flex items-center justify-center"
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ReviewExplore() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [sellerOnly, setSellerOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'best' | 'latest'>('best');
  const [mediaOnly, setMediaOnly] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>({
    rating: 'all',
    period: '전체',
    option: '전체 옵션',
  });

  const visibleReviews = useMemo(() => {
    const optionKey = optionKeyFromLabel(appliedFilters.option);
    const periodDays = PERIOD_DAYS[appliedFilters.period];
    const now = Date.now();

    const filtered = REVIEWS.filter((r) => {
      if (sellerOnly && !r.isCurrentSeller) return false;
      if (mediaOnly && !r.hasMedia) return false;
      if (appliedFilters.rating !== 'all') {
        const threshold = Number(appliedFilters.rating);
        if (r.rating < threshold) return false;
      }
      if (optionKey && r.optionKey !== optionKey) return false;
      if (periodDays !== null) {
        const ageDays = (now - r.date.getTime()) / 86_400_000;
        if (ageDays > periodDays) return false;
      }
      return true;
    });

    filtered.sort((a, b) => {
      if (sortBy === 'latest') return b.date.getTime() - a.date.getTime();
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.date.getTime() - a.date.getTime();
    });

    return filtered;
  }, [sellerOnly, mediaOnly, sortBy, appliedFilters]);

  return (
    <div className="bg-surface text-on-surface antialiased pb-24">
      <header className="bg-surface-container-lowest sticky top-0 z-50 w-full flex items-center px-container-margin py-3 border-b border-outline-variant">
        <button onClick={() => navigate(-1)} className="text-text-primary mr-2">
          <Icon name="arrow_back_ios" />
        </button>
        <h1 className="text-headline-sm-mobile text-text-primary">상품 리뷰</h1>
      </header>

      <div className="bg-surface-container-lowest sticky top-[57px] z-40 w-full border-b border-border-gray">
        <div className="flex justify-between items-center px-container-margin py-3">
          <span className="text-body-md-bold text-text-primary">
            현재 판매자 리뷰만 보기
          </span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={sellerOnly}
              onChange={(e) => setSellerOnly(e.target.checked)}
            />
            <div className="w-11 h-6 bg-outline-variant peer-checked:bg-primary rounded-full transition-colors" />
            <div className="absolute left-[2px] top-[2px] bg-white border border-gray-300 rounded-full h-5 w-5 transition-transform peer-checked:translate-x-full" />
          </label>
        </div>
        {!sellerOnly && (
          <div className="bg-rating-gold/15 text-text-primary text-sm px-container-margin py-3 flex items-start gap-2 border-t border-b-2 border-rating-gold">
            <Icon name="warning" filled className="text-rating-gold shrink-0 text-xl" />
            <p className="leading-snug">
              <span className="font-bold">다른 판매자의 리뷰도 함께 보고 있어요.</span> 판매자별로 배송·포장·품질이
              다를 수 있으니 구매 전 꼭 확인하세요.
            </p>
          </div>
        )}
      </div>

      <main className="max-w-3xl mx-auto">
        <section className="bg-surface-container-lowest px-container-margin py-stack-lg mb-stack-md border-b border-border-gray">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <StarRating rating={4.6} size={20} className="mr-2" />
              <span className="text-headline-sm text-text-primary text-xl">
                4.6
              </span>
            </div>
            <button className="text-primary text-body-md flex items-center hover:opacity-70 transition-opacity">
              자세히보기 <Icon name="expand_more" className="text-sm" />
            </button>
          </div>
          <div className="text-body-md mb-4 font-body-md-bold text-primary">
            {sellerOnly
              ? `현재 판매자 리뷰 ${CURRENT_SELLER_REVIEW_COUNT}개 (전체 ${TOTAL_REVIEW_COUNT}개 중)`
              : `전체 판매자 리뷰 ${TOTAL_REVIEW_COUNT}개`}
          </div>

          <div className="mb-5 space-y-1">
            {RATING_DISTRIBUTION.map((r) => (
              <div key={r.star} className="flex items-center text-xs">
                <span className="w-6 text-text-secondary font-medium">
                  {r.star}점
                </span>
                <div className="flex-1 bg-surface-container h-1.5 rounded-full mx-2 overflow-hidden">
                  <div
                    className="bg-rating-gold h-full rounded-full"
                    style={{ width: `${r.pct}%` }}
                  />
                </div>
                <span className="w-8 text-right text-text-secondary">
                  {r.pct}%
                </span>
              </div>
            ))}
          </div>

          <div className="bg-surface-container rounded-lg p-2 mb-4 flex items-center justify-center text-sm font-medium text-text-primary">
            <Icon name="sentiment_satisfied" className="mr-1 text-base" />
            500명 이상 만족했어요
          </div>

          <div className="flex gap-1 overflow-x-auto snap-x pb-2 mb-4 scrollbar-hide">
            {MEDIA_THUMBS.map((src, i) => (
              <div
                key={src}
                className="w-20 h-20 shrink-0 snap-center relative bg-gray-200"
              >
                <img
                  className="w-full h-full object-cover"
                  src={src}
                  alt="리뷰 미디어"
                />
                {i === 0 && (
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-label-xs">
                    <Icon name="play_arrow" filled className="mb-1" />
                    00:12
                  </div>
                )}
              </div>
            ))}
            <div className="w-20 h-20 shrink-0 snap-center bg-surface-variant flex flex-col items-center justify-center text-text-secondary cursor-pointer hover:bg-surface-dim transition-colors">
              <Icon name="chevron_right" />
              <span className="text-label-xs mt-1">199</span>
            </div>
          </div>

          <div className="space-y-4 text-body-md text-text-primary">
            {[
              { label: '향 만족도', value: '아주만족해요', pct: '59%' },
              { label: '발색 정도', value: '예상했던 색감이에요', pct: '67%' },
              { label: '도포감', value: '적당해요', pct: '81%' },
            ].map((s) => (
              <div key={s.label} className="flex justify-between items-end">
                <div>
                  <div className="text-xs text-text-secondary mb-1">
                    {s.label}
                  </div>
                  <div className="font-bold">{s.value}</div>
                </div>
                <div className="text-xl font-light">{s.pct}</div>
              </div>
            ))}
          </div>
          <div className="text-right mt-2">
            <button className="text-primary text-label-sm flex items-center justify-end w-full hover:opacity-70 transition-opacity">
              자세히보기 <Icon name="expand_more" className="text-sm" />
            </button>
          </div>
        </section>

        <section className="bg-ai-purple px-container-margin py-stack-lg mb-stack-md">
          <div className="flex items-center gap-1 mb-3">
            <Icon name="auto_awesome" className="text-primary text-lg" />
            <h2 className="text-body-md-bold text-text-primary">
              고객들은 이렇게 리뷰했어요
            </h2>
            <span className="bg-white border border-primary text-primary text-[10px] font-bold px-1 rounded ml-1">
              BETA
            </span>
          </div>
          <p className="text-body-md text-text-primary leading-relaxed mb-4">
            고객들은 이 제품의 사용감, 발색력, 발림성에 만족했습니다. 처음에는
            촉촉하게 발리지만 가볍고 보송하게 마무리되는 제형에 만족하는 의견이
            많았습니다. 한 번의 터치만으로도 선명하게 발색되어 얼굴을 화사하게
            만들어준다는 점을 장점으로 꼽았습니다. 많은 고객이 얇고 가볍게
            스며들 듯 부드럽게 발리는 발림성에 만족했습니다. 일부 고객은
            지속력이 아쉽다고 언급했으나, 대부분의 고객은 유지력이 좋은 편이라고
            평가했습니다.
          </p>
          <div className="flex items-center justify-between text-text-secondary text-label-sm">
            <div className="flex items-center">
              <span className="font-bold mr-1">Coupang AI</span>가 요약했어요{' '}
              <Icon name="info" className="text-sm ml-1 cursor-pointer" />
            </div>
            <div className="flex gap-3">
              <button className="hover:text-primary transition-colors">
                <Icon name="thumb_up" className="text-lg" />
              </button>
              <button className="hover:text-primary transition-colors">
                <Icon name="thumb_down" className="text-lg" />
              </button>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-body-md-bold text-text-primary mb-3">
              고객들이 자주 언급했어요
            </h3>
            <div className="flex flex-wrap gap-2">
              {MENTION_TAGS.map((t) => (
                <button
                  key={t.label}
                  className="bg-white border border-border-gray rounded-full px-3 py-1.5 flex items-center text-sm text-text-primary hover:bg-surface-variant transition-colors"
                >
                  <Icon
                    name="check"
                    className="text-delivery-green mr-1 text-sm"
                  />{' '}
                  {t.label} ({t.count})
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest px-container-margin py-3 flex items-center justify-between border-b border-border-gray top-[164px] z-30">
          <div className="flex items-center text-sm">
            <button
              onClick={() => setSortBy('best')}
              className={
                sortBy === 'best'
                  ? 'font-bold text-text-primary'
                  : 'text-text-secondary hover:text-text-primary transition-colors'
              }
            >
              베스트순
            </button>
            <span className="mx-2 text-outline-variant">|</span>
            <button
              onClick={() => setSortBy('latest')}
              className={
                sortBy === 'latest'
                  ? 'font-bold text-text-primary'
                  : 'text-text-secondary hover:text-text-primary transition-colors'
              }
            >
              최신순
            </button>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center text-sm text-text-primary cursor-pointer">
              <input
                type="checkbox"
                checked={mediaOnly}
                onChange={(e) => setMediaOnly(e.target.checked)}
                className="h-4 w-4 text-primary border-outline-variant rounded mr-2"
              />
              사진/동영상
            </label>
            <button
              onClick={() => setFilterOpen(true)}
              className="bg-primary text-white rounded-full px-3 py-1.5 flex items-center text-sm font-medium hover:bg-surface-tint transition-colors"
            >
              <Icon name="filter_alt" className="text-sm mr-1" /> 필터
            </button>
          </div>
        </section>

        <section className="bg-surface-container-lowest">
          {visibleReviews.length === 0 && (
            <div className="p-container-margin py-16 text-center text-text-secondary text-body-md">
              조건에 맞는 리뷰가 없습니다.
            </div>
          )}
          {visibleReviews.map((review) => (
            <article
              key={review.id}
              className="p-container-margin border-b border-border-gray"
            >
              <div className="flex items-start mb-3">
                <div className="w-10 h-10 rounded-full bg-outline-variant flex items-center justify-center text-white mr-3 shrink-0">
                  <Icon name="person" />
                </div>
                <div>
                  <div className="text-body-md-bold text-text-primary">
                    {review.author}
                  </div>
                  <div className="flex items-center text-xs text-text-secondary mt-0.5">
                    <StarRating
                      rating={review.rating}
                      size={14}
                      className="mr-1 scale-75 origin-left"
                    />
                    {formatDate(review.date)}
                  </div>
                  {!sellerOnly && (
                    <div className="mt-1 inline-block bg-surface-variant border border-border-gray text-on-surface-variant text-xs px-2 py-0.5 rounded">
                      판매자: {review.sellerName}
                    </div>
                  )}
                </div>
              </div>
              <button
                className="text-primary text-sm font-medium mb-3 hover:underline"
                onClick={() => navigate(`/product/${id ?? 'tooc-lip-tint'}`)}
              >
                투크 윗아웃 미러 립 틴트,{' '}
                {review.optionKey === '01' ? '01 베어 애프리콧' : '02 겟 러브'},
                1개
              </button>

              {review.hasMedia && (
                <div className="flex gap-1 overflow-x-auto snap-x pb-2 mb-3 scrollbar-hide">
                  {review.mediaIdx.map((idx, i) => (
                    <div
                      key={idx}
                      className="w-24 h-24 shrink-0 snap-center relative bg-gray-200"
                    >
                      <img
                        className="w-full h-full object-cover"
                        src={MEDIA_THUMBS[idx]}
                        alt="리뷰 사진"
                      />
                      {i === 0 && (
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-label-xs">
                          <Icon
                            name="play_arrow"
                            filled
                            className="mb-1 text-lg"
                          />
                          00:02
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="text-body-md text-text-primary leading-relaxed space-y-3">
                <p className="font-bold">{review.title}</p>
                <p>{review.body}</p>
              </div>
            </article>
          ))}
        </section>
      </main>

      <div className="fixed bottom-0 left-0 w-full bg-surface-container-lowest border-t border-border-gray p-3 flex gap-2 z-50">
        <button className="flex-1 border border-primary text-primary text-body-lg-bold py-3 rounded hover:bg-surface-variant transition-colors">
          장바구니 담기
        </button>
        <button
          className="flex-1 bg-primary text-white text-body-lg-bold py-3 rounded hover:bg-surface-tint transition-colors"
          onClick={() => navigate('/checkout')}
        >
          바로구매
        </button>
      </div>

      {filterOpen && (
        <FilterPanel
          onClose={() => setFilterOpen(false)}
          onApply={setAppliedFilters}
          initial={appliedFilters}
        />
      )}
    </div>
  );
}
