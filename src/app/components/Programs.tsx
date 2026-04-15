import { Zap, Target, TrendingUp, Award } from 'lucide-react';

export function Programs() {
  const programs = [
    {
      icon: Zap,
      title: '개원 준비',
      items: [
        '입지 선정부터 인테리어, 의료장비까지 원스톱 서비스 제공',
        '개원 후 경영 및 병원 서비스 제공',
      ],
    },
    {
      icon: Target,
      title: '경영 서비스',
      items: [
        '전략적 수익 모델 시뮬레이션 제공',
        '지속 가능한 인력 운영 시스템 구축',
        '통합 마케팅 운영',
      ],
    },
    {
      icon: TrendingUp,
      title: '행정 서비스',
      items: [
        '표준화된 운영 매뉴얼 제공',
        '실시간 원격 지원 서비스',
        '실무 지원팀 운영',
        '진료 데이터 시스템 무료 제공',
      ],
    },
    {
      icon: Award,
      title: '후속 서비스',
      items: [
        '행정 서비스 모든 전환',
        '상호 협의에 따라 계약 지속 가능',
      ],
    },
  ];

  return (
    <section id="programs" className="py-16 md:py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <h2
          className="font-bold mb-6"
          style={{
            fontFamily: "'Carter One', cursive",
            fontSize: 'clamp(2rem, 6vw, 3rem)',
          }}
        >
          Program
        </h2>
        <p
          className="text-gray-400 mb-2"
          style={{
            fontFamily: "'Do Hyeon', sans-serif",
            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
          }}
        >
          개원 단계에서의 선택이
        </p>
        <p
          className="text-gray-400 mb-12 md:mb-16"
          style={{
            fontFamily: "'Do Hyeon', sans-serif",
            fontSize: 'clamp(1rem, 3vw, 1.4rem)',
          }}
        >
          <span className="font-bold">'잘 되는 병원'</span>의 조건을 만듭니다.
        </p>

        <div className="relative bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 rounded-lg overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 md:divide-x divide-zinc-600">
            {programs.map((program, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center text-center min-h-[200px] md:min-h-[300px] px-5 py-8${
                  index < 2 ? ' sm:border-b sm:border-zinc-600' : ''
                }${index % 2 === 0 ? ' sm:border-r sm:border-zinc-600' : ''}`}
              >
                <h3
                  className="font-bold mb-4 pb-3 border-b-2 border-gray-400 w-full text-center"
                  style={{
                    fontFamily: "'Do Hyeon', sans-serif",
                    fontSize: 'clamp(1rem, 3vw, 1.4rem)',
                  }}
                >
                  {program.title}
                </h3>
                <ul className="space-y-3 mt-2 w-full flex flex-col items-center">
                  {program.items.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-white leading-relaxed flex items-start justify-center w-full max-w-[90%]"
                      style={{
                        fontFamily: "'Do Hyeon', sans-serif",
                        fontSize: 'clamp(0.82rem, 2vw, 0.95rem)',
                      }}
                    >
                      <span className="mr-2 shrink-0">•</span>
                      <span className="text-left">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}