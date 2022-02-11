# <%= name %>

This Deno project was created with `@k11r/nx-deno-deploy`



## Commands

### Serve

Run any Deno project locally.

#### Prerequisites

- Make sure Deno is installed

#### Permissions

The permissions to be passed to the Deno CLI can be specified in the NX project configuration.
More information on permissions is available in [the manual](https://deno.land/manual@main/runtime/permission_apis).




#### Examples

`nx run <my-project>:serve`

### Test

Test application using `deno test`.
More information is available in [the manual](https://deno.land/manual/testing).


#### Prerequisites

- Make sure Deno is installed

#### Examples

`nx run <my-project>:test`

### Deploy

Deploy the configured project to Deno Deploy.

Projects will not be build before deploying, by pointing to the entrypath `deployctl` will deploy necessary files directly from the source folder.

#### Prerequisites
- Make sure you have [deployctl](https://github.com/denoland/deployctl) installed
- Make sure you provide a token in the configuration or have `DENO_DEPLOY_TOKEN` set in your environment
- Make sure you created the project you are about to deploy 

#### Examples

**Deploy** project using NX-config

`nx run <my-project>:deploy`

**Deploy project as prod**

`nx run <my-project>:deploy --isProd`
