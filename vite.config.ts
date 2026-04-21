import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

export default defineConfig({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  build: {
    // Core Web Vitals: 청크 크기 제한 경고 기준 (500KB)
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        // 페이지별 코드 스플리팅으로 초기 로딩 속도 향상 (LCP 개선)
        manualChunks: {
          // React 런타임 별도 청크
          'vendor-react': ['react', 'react-dom'],
          // 라우터 별도 청크
          'vendor-router': ['react-router'],
          // UI 라이브러리 별도 청크
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-tabs',
            '@radix-ui/react-accordion',
            '@radix-ui/react-select',
          ],
          // 차트 별도 청크
          'vendor-charts': ['recharts'],
        },
      },
    },
    // CSS 코드 스플리팅
    cssCodeSplit: true,
    // 소스맵 비활성화 (프로덕션 빌드 크기 최소화)
    sourcemap: false,
    // 빌드 최적화: target 설정으로 모던 브라우저 최적화
    target: 'es2020',
    // 자산 인라인 임계값 (4KB 이하 자산 인라인으로 HTTP 요청 감소)
    assetsInlineLimit: 4096,
    // minify 최적화
    minify: 'esbuild',
  },
})
