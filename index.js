const core = require("@actions/core");
const github = require("@actions/github");

try {
  const addedFiles = (process.env.ADDED_FILES ?? "").split(",") ?? [];
  const changedFiles = (process.env.CHANGED_FILES ?? "").split(",") ?? [];

  console.log(addedFiles);
  console.log(changedFiles);

  // core.setOutput("test", JSON.stringify(changedFiles));
} catch (error) {
  core.setFailed(error.message);
}
