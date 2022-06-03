# nx-deno-deploy

Requires [Deno](https://deno.com/deploy) and [deno-ctl](https://github.com/denoland/deployctl)

## Executors

### Serve

Serves the project using `deno run`.

All flags can be provided in the project configuration.s

### Test

Test the project using `deno test`

### Deploy

Deploy the project to Deno Deploy using `deployctl deploy`.

Optionally `--isProd=true` can be specified to indicate this is a production deploy. An authentication token can be provided suing `--token=`

## Generators

## add-targets

Adds the `serve`, `test` and `deploy` targets to an existing project.

Requires the `appName` and a `mainFile` path (relative to the source root). Optionally the `denoProject` param can be used to specify the name of your project on Deno (if it would not match the NX project name).

```
npx nx g @k11r/nx-deno-deploy:add-targets <app-name> --mainFile=main.ts
```

## create-project

Creates a new project (in the app folder) with the Deno specifics `serve`, `test` and `deploy` targets.

Only `appName` is required. Optionally the `denoProject` param can be used to specify the name of your project on Deno (if it would not match the NX project name).

```
npx nx g @k11r/nx-deno-deploy:create-project <app-name>
```
