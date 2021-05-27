const core = require("@actions/core");
const github = require("@actions/github");

const mapConfigs = [
  { id: "map-config-de-australia", dev: "de-australia/map-config/dev.json" },
];

try {
  const addedFiles = (process.env.ADDED_FILES ?? "").split(",") ?? [];
  const changedFiles = (process.env.CHANGED_FILES ?? "").split(",") ?? [];

  console.log(addedFiles);
  console.log(changedFiles);

  console.log(github.context);

  // mapConfigs.forEach((map) => {});

  // X-Magda-API-Key-Id & X-Magda-API-Key headers

  // core.setOutput("test", JSON.stringify(changedFiles));
} catch (error) {
  core.setFailed(error.message);
}
