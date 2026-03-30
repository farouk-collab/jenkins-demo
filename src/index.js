const axios = require("axios");
const dayjs = require("dayjs");
const { groupBy, orderBy } = require("lodash");
const isEmail = require("validator/lib/isEmail");

function buildUserReport(users) {
  const normalizedUsers = users.map((user) => ({
    name: String(user.name || "").trim(),
    email: String(user.email || "").trim().toLowerCase(),
    role: String(user.role || "guest").trim().toLowerCase(),
    createdAt: String(user.createdAt || "")
  }));

  const validUsers = normalizedUsers.filter((user) => {
    return user.name.length > 0 && isEmail(user.email) && dayjs(user.createdAt).isValid();
  });

  const groupedUsers = groupBy(validUsers, "role");
  const roleSummary = orderBy(
    Object.entries(groupedUsers).map(([role, members]) => ({
      role,
      count: members.length
    })),
    ["count", "role"],
    ["desc", "asc"]
  );

  return {
    generatedAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
    totalReceived: users.length,
    validUsers: validUsers.length,
    invalidUsers: users.length - validUsers.length,
    roleSummary
  };
}

function formatUserReport(report) {
  const roles =
    report.roleSummary.length === 0
      ? "aucun role valide"
      : report.roleSummary.map((entry) => `${entry.role}:${entry.count}`).join(", ");

  return [
    `rapport genere le ${report.generatedAt}`,
    `utilisateurs recus: ${report.totalReceived}`,
    `utilisateurs valides: ${report.validUsers}`,
    `utilisateurs invalides: ${report.invalidUsers}`,
    `repartition: ${roles}`
  ].join(" | ");
}

function createApiClient(baseURL) {
  return axios.create({
    baseURL,
    timeout: 5000
  });
}

module.exports = {
  buildUserReport,
  formatUserReport,
  createApiClient
};

if (require.main === module) {
  const sampleUsers = [
    {
      name: "Alice",
      email: "alice@example.com",
      role: "admin",
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
      createdAt: "not-a-date"
    }
  ];

  console.log(formatUserReport(buildUserReport(sampleUsers)));
}
