module.exports = {
  verbose: true,
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['vue', 'js', 'ts', 'json'],
  transform: {
    '^.+\\.vue$': '@vue/vue3-jest',
    '^.+\\.(ts|js)$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.test.json'
      }
    ]
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vuetify$': '<rootDir>/node_modules/vuetify/dist/vuetify.js',
    '^vuetify/components$': '<rootDir>/node_modules/vuetify/dist/vuetify.js',
    '^vuetify/directives$': '<rootDir>/node_modules/vuetify/dist/vuetify.js'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)$',
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(vuetify|@vue)/)'
  ],
  setupFiles: ['<rootDir>/jest.setup.ts']
}
