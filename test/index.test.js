const test = require("node:test");
const assert = require("node:assert/strict");

const { buildStatusMessage } = require("../src/index");

test("retourne un message positif quand tout est valide", () => {
  assert.equal(
    buildStatusMessage("Projet CI", true, true),
    "Projet CI : tests OK / dependances OK"
  );
});

test("signale des dependances a risque", () => {
  assert.equal(
    buildStatusMessage("Projet CI", true, false),
    "Projet CI : tests OK / dependances a risque"
  );
});

test("signale des tests en echec", () => {
  assert.equal(
    buildStatusMessage("Projet CI", false, true),
    "Projet CI : tests failed / dependances OK"
  );
});
