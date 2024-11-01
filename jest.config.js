module.exports = {
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // For TypeScript files
    '^.+\\.[jt]sx?$': 'babel-jest', // For JavaScript/JSX files
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios)', // Transpile axios and any other ES6 modules you may encounter
  ],
};
