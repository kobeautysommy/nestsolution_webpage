import exampleImage from 'figma:asset/4e4b0b211954adb752c7f14689f3a5c716f53933.png';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function Hero() {
  return (
    <section
      id="home"
      className="relative bg-black text-white flex items-center justify-center overflow-hidden"
      style={{ minHeight: '50vh' }}
    >
      <div className="absolute inset-0 opacity-40">
        <ImageWithFallback
          src={exampleImage}
          alt="Workspace"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-10 text-center px-6 py-20 md:py-0">
        <h1
          className="font-bold mb-4 tracking-tight"
          style={{
            fontFamily: "'Black Han Sans', sans-serif",
            fontSize: 'clamp(3rem, 10vw, 6rem)',
          }}
        >
          NEST<br />SOLUTION
        </h1>
        <div className="flex flex-col items-center mt-6">
          <div className="w-px h-6 bg-white opacity-50"></div>
          <p
            className="mt-4 tracking-wider opacity-80"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: 'clamp(0.85rem, 2.5vw, 1rem)',
            }}
          >
            병•의원 경영의 새로운 기준<br />
            운영의 효율에서 미래의 가치까지, 결과로 증명합니다
          </p>
        </div>
      </div>
    </section>
  );
}
