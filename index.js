const core = require("@actions/core");
const github = require("@actions/github");

try {
  const addedFiles = process.env.ADDED_FILES?.join(",") ?? [];
  const changedFiles = process.env.CHANGED_FILES?.join(",") ?? [];

  console.log(addedFiles);
  console.log(changedFiles);

  // core.setOutput("test", JSON.stringify(changedFiles));
} catch (error) {
  core.setFailed(error.message);
}
