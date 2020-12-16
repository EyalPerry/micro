require("dotenv/config");

// eslint-disable-next-line jest/no-jasmine-globals
jasmine.getEnv().addReporter({
   specStarted: function (result) {
      globalThis.TEST_NAME = result.fullName;
   },
});
