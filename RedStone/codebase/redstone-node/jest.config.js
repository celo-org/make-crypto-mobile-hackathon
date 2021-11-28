module.exports = {
  "roots": [
    "<rootDir>/"
  ],
  "testMatch": [
    "**/test/**/?(*.)+(spec).+(ts)"
  ],
  "transform": {
    "^.+\\.(ts)$": "ts-jest"
  },
  "testEnvironment": "node",
  testRunner: "jest-circus/runner"
}
