import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';

const SCENT_OPTIONS = [
  { value: 'good', label: '좋아요' },
  { value: 'normal', label: '보통이예요' },
  { value: 'bad', label: '생각보다 별로예요' },
];

const COLOR_OPTIONS = [
  { value: 'bright', label: '예상보다 밝아요' },
  { value: 'asExpected', label: '예상했던 색감이에요' },
  { value: 'dark', label: '예상보다 어두워요' },
];

const COVERAGE_OPTIONS = [
  { value: 'much', label: '도포량이 많아요' },
  { value: 'just', label: '도포량이 적당해요' },
  { value: 'little', label: '도포량이 적어요' },
];

const POSITIVE_KEYWORDS = [
  '빠른 배송',
  '꼼꼼한 포장',
  '넉넉한 유통기한',
  '정확한 상품 설명',
  '높은 가성비',
  '그 외',
];
const NEGATIVE_KEYWORDS = [
  '배송 지연',
  '부실한 포장',
  '불친절한 응대',
  '설명과 다른 상품',
  '아쉬운 가성비',
  '그 외',
];

export default function WriteReview() {
  const navigate = useNavigate();
  const [productRating, setProductRating] = useState(0);
  const [scent, setScent] = useState('good');
  const [colorTone, setColorTone] = useState('asExpected');
  const [coverage, setCoverage] = useState('just');
  const [productText, setProductText] = useState('');
  const [sellerSatisfied, setSellerSatisfied] = useState<'up' | 'down' | null>(null);
  const [keyword, setKeyword] = useState<string | null>(null);
  const [sellerText, setSellerText] = useState('');

  const keywordOptions =
    sellerSatisfied === 'up'
      ? POSITIVE_KEYWORDS
      : sellerSatisfied === 'down'
        ? NEGATIVE_KEYWORDS
        : [];

  const submit = () => {
    navigate(-1);
  };

  return (
    <div className="text-text-primary pb-[80px] bg-white min-h-screen">
      <header className="flex justify-between items-center w-full px-container-margin h-14 bg-surface-container-lowest sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <button
            aria-label="뒤로가기"
            className="flex items-center justify-center p-1"
            onClick={() => navigate(-1)}
          >
            <Icon
              name="arrow_back_ios"
              className="text-text-primary text-[24px]"
            />
          </button>
          <h1 className="text-headline-sm-mobile text-text-primary">
            리뷰 작성하기
          </h1>
        </div>
      </header>

      <main className="px-container-margin pt-stack-lg pb-section-gap">
        <section className="mb-[32px]">
          <div className="flex items-center gap-2 mb-stack-lg">
            <div className="w-8 h-8 rounded-full bg-rating-gold flex items-center justify-center text-white">
              <Icon name="inventory_2" filled className="text-[20px]" />
            </div>
            <h2 className="text-headline-sm-mobile text-text-primary">
              상품 품질 평가
            </h2>
          </div>
          <div className="flex gap-3 mb-section-gap">
            <img
              alt="투크 윗아웃 미러 립 틴트"
              className="w-20 h-20 object-cover rounded-lg bg-surface-container-low"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBTxxwRs_sHEiBbLVLmemlmofiX5f98SSQfhnJ68QkicKWZgR_L4zzXw21hTE0YUbrc-EhPR1jTgDB6kDzGRmxK2XadfDiR4vOixq85W3XJNejNA3j39wSf3jaDm8IzSk9Nr4y8AokA_x9kEmkRwncB4byPKWzyD2ShVjllVBIvZ0KHhcdc_1QuVtwAOUI34V3U_GywznTWugwocCcT5x3FCBSh8kQtYUtqfyO_7gnHxJuHrD4Sj3Dx"
            />
            <p className="text-body-md-bold text-text-primary flex-1">
              투크 윗아웃 미러 립 틴트, 02 겟 러브, 1개
            </p>
          </div>
          <div className="mb-section-gap">
            <p className="text-body-lg-bold mb-stack-sm">
              이 상품의 품질에 대해 얼마나 만족하시나요?
            </p>
            <div className="flex gap-1 mb-stack-lg text-rating-gold">
              {[1, 2, 3, 4, 5].map((i) => (
                <button key={i} onClick={() => setProductRating(i)}>
                  <Icon
                    name="star"
                    filled={i <= productRating}
                    className="text-[40px]"
                  />
                </button>
              ))}
            </div>
            <p className="text-body-md">이 상품을 상세히 평가해주세요.</p>
          </div>
          <div className="mb-section-gap">
            <p className="text-body-lg-bold mb-stack-lg">
              제품의 향은 어떠셨나요?
            </p>
            <div className="flex flex-col gap-4">
              {SCENT_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="scent"
                    className="radio-primary"
                    checked={scent === opt.value}
                    onChange={() => setScent(opt.value)}
                  />
                  <span className="text-body-md ml-1">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-section-gap">
            <p className="text-body-lg-bold mb-stack-lg">
              제품의 발색은 어떠셨나요?
            </p>
            <div className="flex flex-col gap-4">
              {COLOR_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="colorTone"
                    className="radio-primary"
                    checked={colorTone === opt.value}
                    onChange={() => setColorTone(opt.value)}
                  />
                  <span className="text-body-md ml-1">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-section-gap">
            <p className="text-body-lg-bold mb-stack-lg">
              제품의 도포감은 어떠셨나요?
            </p>
            <div className="flex flex-col gap-4">
              {COVERAGE_OPTIONS.map((opt) => (
                <label
                  key={opt.value}
                  className="flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="coverage"
                    className="radio-primary"
                    checked={coverage === opt.value}
                    onChange={() => setCoverage(opt.value)}
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
            <h2 className="text-headline-sm-mobile text-text-primary">
              판매자 서비스 평가
            </h2>
          </div>
          <div className="flex items-center gap-2 mb-stack-md text-text-secondary">
            <Icon name="storefront" filled className="text-[20px]" />
            <span className="text-body-lg-bold text-text-primary">젤리뽀</span>
          </div>
          <p className="text-body-lg-bold mb-stack-lg leading-snug">
            배송, 포장, 질문 응대, 상품 가격 등 판매자에 대한 만족도는
            어떠셨나요?
          </p>
          <div className="flex gap-4 mb-stack-lg">
            <button
              onClick={() => {
                setSellerSatisfied('down');
                setKeyword(null);
              }}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
                sellerSatisfied === 'down'
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-border-gray text-text-primary'
              }`}
            >
              <Icon name="thumb_down" className="text-[28px]" />
            </button>
            <button
              onClick={() => {
                setSellerSatisfied('up');
                setKeyword(null);
              }}
              className={`w-14 h-14 rounded-full border flex items-center justify-center transition-all ${
                sellerSatisfied === 'up'
                  ? 'bg-primary border-primary text-white'
                  : 'bg-white border-border-gray text-text-primary'
              }`}
            >
              <Icon name="thumb_up" className="text-[28px]" />
            </button>
          </div>
          {sellerSatisfied && (
            <>
              <p className="text-body-md-bold mb-stack-md">
                {sellerSatisfied === 'up'
                  ? '만족하셨던 점을 알려주세요!'
                  : '아쉬웠던 점을 알려주세요!'}
              </p>
              <p className="text-body-md-bold mb-stack-sm text-text-secondary">
                키워드 선택
              </p>
              <div className="grid grid-cols-3 gap-2 mb-section-gap">
                {keywordOptions.map((k) => (
                  <button
                    key={k}
                    onClick={() => setKeyword(k)}
                    className={`px-2 py-2 rounded-full border text-label-sm text-center transition-colors ${
                      keyword === k
                        ? 'bg-primary border-primary text-white'
                        : 'bg-white border-border-gray text-text-primary'
                    }`}
                  >
                    {k}
                  </button>
                ))}
              </div>
            </>
          )}
          <p className="text-body-md-bold mb-stack-sm text-text-secondary">
            더 자세한 리뷰
          </p>
          <div className="border border-border-gray rounded-lg overflow-hidden mb-section-gap">
            <textarea
              className="w-full h-24 p-3 text-body-md text-text-secondary border-none resize-none focus:ring-0 placeholder:text-outline-variant"
              placeholder={
                '판매자의 어떤 점이 마음에 드셨나요?\n(상품 품질이 아닌 배송, 포장, 질문 응대, 상품 가격 등 판매자에 대한 만족도를 평가해주세요.)'
              }
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
            상품 품질 평가와 판매자 서비스 평가는 별도로 집계되어 아이템위너
            평점 혼용 문제를 방지합니다.
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
