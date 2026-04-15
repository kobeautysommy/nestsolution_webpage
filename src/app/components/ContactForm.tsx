import { useState, useRef } from 'react';
import { toast } from 'sonner';

export function ContactForm() {
  const [loaded, setLoaded] = useState(false);
  const loadCountRef = useRef(0);

  const handleIframeLoad = () => {
    loadCountRef.current += 1;

    if (loadCountRef.current === 1) {
      // 첫 번째 로드: 폼 렌더링 완료
      setLoaded(true);
    } else {
      // 두 번째 이후 로드: 폼 제출 완료 (Google Forms 응답 페이지로 전환)
      toast.success('문의가 접수되었습니다! 빠른 시일 내에 연락드리겠습니다.', {
        duration: 5000,
        style: {
          fontFamily: "'Do Hyeon', sans-serif",
          fontSize: '1rem',
        },
      });
    }
  };

  return (
    <section id="contact" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <h2
          className="font-bold mb-4"
          style={{
            fontFamily: "'Carter One', cursive",
            fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
          }}
        >
          Contact us
        </h2>
        <p
          className="text-gray-600 mb-10 md:mb-12"
          style={{ fontFamily: "'Do Hyeon', sans-serif" }}
        >
          프로젝트 문의나 궁금하신 점이 있으시면 언제든지 연락주세요.
        </p>

        <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden relative">
          {/* Loading spinner */}
          {!loaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-12 h-12">
                  {/* Outer ring */}
                  <div className="absolute inset-0 rounded-full border-4 border-gray-100" />
                  {/* Spinning arc */}
                  <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-black animate-spin" />
                </div>
                <p
                  className="text-gray-500 text-sm"
                  style={{ fontFamily: "'Do Hyeon', sans-serif" }}
                >
                  폼을 불러오는 중…
                </p>
              </div>
            </div>
          )}

          <iframe
            src="https://docs.google.com/forms/d/e/1FAIpQLSdV4rX3p-Y6VUrtpggTY2iJcuWI39jLmuoQi4VGRXQoe_JIsA/viewform?embedded=true"
            width="100%"
            height="860"
            frameBorder="0"
            marginHeight={0}
            marginWidth={0}
            title="NEST 문의 폼"
            onLoad={handleIframeLoad}
            className="block"
            style={{ minHeight: '600px' }}
          >
            로딩 중…
          </iframe>
        </div>
      </div>
    </section>
  );
}
