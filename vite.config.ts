import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true, // describeやtestなどのテスト関数をグローバルにする
    setupFiles: './src/test/setup.ts', // テスト実行前にsetup.tsを読み込む(toBeInTheDocument() が使えるようになる。)
  },
})
