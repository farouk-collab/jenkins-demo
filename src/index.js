function buildStatusMessage(projectName, testsPassed, dependenciesSafe) {
  const testLabel = testsPassed ? "tests OK" : "tests failed";
  const dependencyLabel = dependenciesSafe
    ? "dependances OK"
    : "dependances a risque";

  return `${projectName} : ${testLabel} / ${dependencyLabel}`;
}

module.exports = {
  buildStatusMessage
};

if (require.main === module) {
  console.log(buildStatusMessage("Demo Jenkins", true, true));
}
