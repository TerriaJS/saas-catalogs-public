const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log(process.env.CHANGED_FILES);

  const changedFiles = JSON.parse(process.env.CHANGED_FILES);

  console.log(changedFiles);

  // core.setOutput("test", JSON.stringify(changedFiles));
} catch (error) {
  core.setFailed(error.message);
}
