import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        globals: true,         // ← включить describe/it без импорта
        environment: 'jsdom',  // ← нужно для компонентов React
    },
})