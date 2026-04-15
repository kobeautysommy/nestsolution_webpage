export function BrandMarketing() {
  const onlineItems = [
    { title: 'SNS 마케팅', desc: '타겟 맞춤형 콘텐츠 전략으로\n브랜드 노출 및 신뢰도 향상 유도' },
    { title: '검색 엔진 마케팅', desc: '키워드별 전환 중점 구조 설계로\n효율적인 유입 실현' },
    { title: '차별화 포인트', desc: '병원만의 핵심 강점을\n브랜딩 요소로 시각화하여\n경쟁력 확보' },
    { title: '성과 측정', desc: '핵심 KPI 분석으로 마케팅 효과 측정 및 지속적 전략 개선' },
  ];

  const offlineItems = [
    { title: '옥외광고', desc: '이동 동선과 시야를 고려한 광고 배치로\n지역 노출 및 방문 전환율 돌파\n인지도 상승 유도' },
    { title: '원내 디자인', desc: '내원 환자 대상 정보 노출 통한\n추가 상담 및 프로그램 이용 유도' },
    { title: '홍보물 패키지', desc: '핵심 홍보물을 통한\n병원 인지도 강화 및 방문 유도\n브랜드 접점 확대' },
  ];

  return (
    <section id="brand-marketing" className="py-16 md:py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <h2
          className="font-bold mb-14 md:mb-20"
          style={{
            fontFamily: "'Carter One', cursive",
            fontSize: 'clamp(2rem, 6vw, 3rem)',
          }}
        >
          Brand marketing
        </h2>

        {/* Online Marketing */}
        <div className="mb-14 md:mb-20">
          <h3
            className="font-bold mb-6 md:mb-8 text-[#9daf99]"
            style={{
              fontFamily: "'Carter One', cursive",
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
            }}
          >
            Online marketing
          </h3>

          <div className="relative bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-600 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x-0 md:divide-x md:divide-y-0 divide-zinc-600">
              {onlineItems.map((item, i) => (
                <div
                  key={item.title}
                  className={`p-6 md:p-8 flex flex-col items-center text-center min-h-[160px] md:min-h-[220px]${
                    i < 2 ? ' sm:border-b sm:border-zinc-600' : ''
                  }${i % 2 === 0 ? ' sm:border-r sm:border-zinc-600' : ''}`}
                >
                  <h4
                    className="font-bold mb-4 pb-3 border-b-2 border-gray-400 w-full text-center"
                    style={{
                      fontFamily: "'Do Hyeon', sans-serif",
                      fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-white leading-relaxed mt-2 whitespace-pre-line"
                    style={{
                      fontFamily: "'Do Hyeon', sans-serif",
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Offline Marketing */}
        <div className="mb-8 md:mb-12">
          <h3
            className="font-bold mb-6 md:mb-8 text-[#5d76a4]"
            style={{
              fontFamily: "'Carter One', cursive",
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
            }}
          >
            Offline marketing
          </h3>

          <div className="relative bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-600 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-zinc-600">
              {offlineItems.map((item) => (
                <div
                  key={item.title}
                  className="p-6 md:p-8 flex flex-col items-center text-center min-h-[160px] md:min-h-[220px]"
                >
                  <h4
                    className="font-bold mb-4 pb-3 border-b-2 border-gray-400 w-full text-center"
                    style={{
                      fontFamily: "'Do Hyeon', sans-serif",
                      fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                    }}
                  >
                    {item.title}
                  </h4>
                  <p
                    className="text-white leading-relaxed mt-2 whitespace-pre-line"
                    style={{
                      fontFamily: "'Do Hyeon', sans-serif",
                      fontSize: 'clamp(0.85rem, 2vw, 0.95rem)',
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
