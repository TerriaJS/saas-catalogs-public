# GitHub Actions

## `publish-(dev | test | prod)`

These workflows will run on commits to `main` branch.

There are three pieces:

- The `map-configs.json` file [./map-configs.json](https://github.com/TerriaJS/saas-catalogs-public/blob/main/map-configs.json)
- The workflow: [.github/workflows/publish-dev.yml](https://github.com/TerriaJS/saas-catalogs-public/blob/main/.github/workflows/publish-dev.yml)
- The TypeScript file: [./publish-map-configs.ts](https://github.com/TerriaJS/saas-catalogs-public/blob/main/publish-map-configs.ts)

### The `map-configs.json` file

This defines mapping between Magda record ID, map-config files and other JSON files for each map - for example:

```json
[
  {
    "id": "map-config-de-africa",
    "description": "DE Africa",
    "dev": "de-africa/map-config/dev.json",
    "test": "de-africa/map-config/test.json",
    "prod": "de-africa/map-config/prod.json",
    "files": [
      {
        "description": "Main catalog file",
        "dev": "de-africa/dev.json",
        "test": "de-africa/test.json",
        "prod": "de-africa/prod.json"
      }
    ]
  }
]
```

In `dev` will publish `de-australia/map-config/dev.json` to record ID `map-config-de-australia`.

### Workflow

1. Uses `jitterbit/get-changed-files@v1` action to create a list of files which have changed in the current commit
2. Checks out this repo
3. `yarn install` for JS script
4. Runs JS script - `node publish-map-configs.js` + and adds env vars from secrets

#### Workflow env vars

Different values for dev, test or prod environments

- `ENVIRONMENT_TAG`: `dev`, `test` or `prod` (this is used to get file-paths from `map-configs.json`)
- `MAGDA_FQDN`: Github secret `DEV_MAGDA_FQDN`, `TEST_MAGDA_FQDN` or `PROD_MAGDA_FQDN`
- `MAGDA_API_ID`: Github secret `DEV_MAGDA_API_ID`, `TEST_MAGDA_API_ID` or `PROD_MAGDA_API_ID`
- `MAGDA_API_KEY`: Github secret `DEV_MAGDA_API_KEY`, `TEST_MAGDA_API_KEY` or `PROD_MAGDA_API_KEY`

**Note** Magda API key/id is for `terriamaps@gmail.com` Google account

### JavaScript file

1. Looks at which files have changed in a commit to `main` branch
2. Matches them with map-config from `map-configs.json`
3. Publish records to Magda

## `sync-(dev | test | prod)`

Same as `publish-(dev | test | prod)` - but will publish **all** files instead of only files which have changed.

This workflow must be triggered manually.

## `pr-check-map-configs`

This workflow will check map-config files in a similar way to `publish-(dev | test | prod)` - but it will automatically approve a PR if it **only** touches dev map-config files (i.e. it **doesn't** touch test of prod).
