const core = require("@actions/core");
const github = require("@actions/github");
const fsPromises = require("fs/promises");
const fetch = require("node-fetch");
const mapConfigs = require("./map-configs.json");

async function readFile(path) {
  try {
    const file = await fsPromises.readFile(path, "utf8");
    return file;
  } catch (error) {
    throw `ERROR reading file ${path} with encoding utf8: ${error}`;
  }
}

(async () => {
  try {
    // envTag (dev, test or prod) is used to find corresponding map-config file
    const envTag = process.env.ENVIRONMENT_TAG;
    console.log(`Udating files in **${envTag}** environment`);

    const addedFiles = (process.env.ADDED_FILES ?? "").split(",") ?? [];
    const modifiedFiles = (process.env.MODIFIED_FILES ?? "").split(",") ?? [];

    const changedFiles = [...addedFiles, ...modifiedFiles];

    console.log("Files changed:");
    console.log(changedFiles);

    for (let i = 0; i < mapConfigs.length; i++) {
      const mapConfig = mapConfigs[i];

      const mapConfigFile = mapConfig[envTag];
      const mapConfigId = mapConfig.id;

      // Has a map-config file changed for the currentMapConfig?
      if (changedFiles.includes(mapConfigFile)) {
        const devJson = (await readFile(mapConfigFile)).toString();
        console.log(
          `Updating \`${mapConfigId}\` from path \`${mapConfigFile}\` (in ${process.env.MAGDA_FQDN})`
        );
        await fetch(
          `https://${process.env.MAGDA_FQDN}/api/v0/registry-auth/records/${mapConfigId}`,
          {
            headers: {
              "X-Magda-API-Key-Id": process.env.MAGDA_API_ID,
              "X-Magda-API-Key": process.env.MAGDA_API_KEY,
              "Content-Type": "application/json",
            },
            body: devJson,
            method: "PUT",
          }
        );
        console.log(`SUCCESSFULLY updated \`${mapConfigId}\``);
      }
    }
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
})();
