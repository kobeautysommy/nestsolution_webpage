import { Phone, Mail } from 'lucide-react';

export function ContactInfo() {
  return (
    <section className="py-16 md:py-20 bg-[#111111] text-white">
      <div className="container mx-auto px-6">
        <h2
          className="mb-10"
          style={{
            fontFamily: "'Carter One', cursive",
            fontSize: 'clamp(2rem, 6vw, 3rem)',
          }}
        >
          Brand Introduction
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Left: Photo placeholder */}
          <div
            className="rounded-2xl flex items-center justify-center"
            style={{ backgroundColor: '#9CA3AF', minHeight: '260px' }}
          >
            <p
              className="text-white text-2xl text-center"
              style={{ fontFamily: "'Do Hyeon', sans-serif" }}
            >
              단체사진<br />추가예정
            </p>
          </div>

          {/* Right: Contact Info */}
          <div className="flex flex-col gap-6">
            <p
              className="text-white text-2xl font-bold"
              style={{ fontFamily: "'Black Han Sans', sans-serif" }}
            >
              Nest Solution
            </p>
            <p
              className="text-gray-300"
              style={{
                fontFamily: "'Do Hyeon', sans-serif",
                fontSize: 'clamp(1rem, 3vw, 1.4rem)',
              }}
            >
              비즈니스 성장을 위한 전문적인 온오프라인 마케팅을<br className="hidden sm:inline" />
              지속 가능한 경영, 결과로 증명합니다
            </p>

            {/* Phone */}
            <div className="flex items-start gap-4">
              <div className="mt-1 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <p
                  className="font-bold text-lg mb-1"
                  style={{ fontFamily: "'Carter One', cursive" }}
                >
                  Phone Number
                </p>
                <p
                  className="text-gray-300 text-base"
                  style={{ fontFamily: "'Do Hyeon', sans-serif" }}
                >
                  82+ 10-3129-8248
                </p>
                <p
                  className="text-gray-300 text-base"
                  style={{ fontFamily: "'Do Hyeon', sans-serif" }}
                >
                  82+ 10-9470-8248
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="mt-1 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-white" />
              </div>
              <div>
                <p
                  className="font-bold text-lg mb-1"
                  style={{ fontFamily: "'Carter One', cursive" }}
                >
                  Email Address
                </p>
                <p
                  className="text-gray-300 text-base"
                  style={{ fontFamily: "'Do Hyeon', sans-serif" }}
                >
                  nestsadvice@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}