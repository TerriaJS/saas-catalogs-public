const core = require("@actions/core");
const github = require("@actions/github");

try {
  console.log(process.env.CHANGED_FILES);

  core.setOutput("test", process.env.CHANGED_FILES);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
