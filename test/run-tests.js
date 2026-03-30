const assert = require("node:assert/strict");

const { buildUserReport, formatUserReport, createApiClient } = require("../src/index");

const tests = [
  {
    name: "construit un rapport avec utilisateurs valides et invalides",
    run() {
      const report = buildUserReport([
        {
          name: "Alice",
          email: "ALICE@example.com",
          role: "Admin",
          createdAt: "2026-03-30"
        },
        {
          name: "Bob",
          email: "bob@example.com",
          role: "editor",
          createdAt: "2026-03-28"
        },
        {
          name: "",
          email: "adresse-invalide",
          role: "guest",
          createdAt: "date-invalide"
        }
      ]);

      assert.equal(report.totalReceived, 3);
      assert.equal(report.validUsers, 2);
      assert.equal(report.invalidUsers, 1);
      assert.deepEqual(report.roleSummary, [
        { role: "admin", count: 1 },
        { role: "editor", count: 1 }
      ]);
    }
  },
  {
    name: "retourne aucun role valide quand toutes les donnees sont invalides",
    run() {
      const report = buildUserReport([
        {
          name: "",
          email: "bad",
          role: "guest",
          createdAt: "bad-date"
        }
      ]);

      assert.equal(report.validUsers, 0);
      assert.equal(report.invalidUsers, 1);
      assert.deepEqual(report.roleSummary, []);
    }
  },
  {
    name: "formate le rapport pour affichage",
    run() {
      const output = formatUserReport({
        generatedAt: "2026-03-30 14:00:00",
        totalReceived: 4,
        validUsers: 3,
        invalidUsers: 1,
        roleSummary: [
          { role: "admin", count: 2 },
          { role: "editor", count: 1 }
        ]
      });

      assert.equal(
        output,
        "rapport genere le 2026-03-30 14:00:00 | utilisateurs recus: 4 | utilisateurs valides: 3 | utilisateurs invalides: 1 | repartition: admin:2, editor:1"
      );
    }
  },
  {
    name: "cree un client axios avec la bonne configuration",
    run() {
      const client = createApiClient("https://api.example.com");

      assert.equal(client.defaults.baseURL, "https://api.example.com");
      assert.equal(client.defaults.timeout, 5000);
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
