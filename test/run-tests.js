const assert = require("node:assert/strict");

const { buildStatusMessage } = require("../src/index");

const tests = [
  {
    name: "retourne un message positif quand tout est valide",
    run() {
      assert.equal(
        buildStatusMessage("Projet CI", true, true),
        "Projet CI : tests OK / dependances OK"
      );
    }
  },
  {
    name: "signale des dependances a risque",
    run() {
      assert.equal(
        buildStatusMessage("Projet CI", true, false),
        "Projet CI : tests OK / dependances a risque"
      );
    }
  },
  {
    name: "signale des tests en echec",
    run() {
      assert.equal(
        buildStatusMessage("Projet CI", false, true),
        "Projet CI : tests failed / dependances OK"
      );
    }
  }
];

let passed = 0;

for (const test of tests) {
  try {
    test.run();
    passed += 1;
    console.log(`OK - ${test.name}`);
  } catch (error) {
    console.error(`ECHEC - ${test.name}`);
    console.error(error.message);
    process.exitCode = 1;
  }
}

console.log(`${passed}/${tests.length} tests valides`);
