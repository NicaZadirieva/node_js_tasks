import type { Config } from '@jest/types';

// hint: для запуска unit-test
const config: Config.InitialOptions = {
    verbose: true, // чтобы был детальный output
    preset: 'ts-jest',
    rootDir: './tests',
    testRegex: '.e2e.spec.ts$'
}

export default config;