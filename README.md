# NxAdditions

A set of very poorly documented and maintained plugins for NX workspaces.

## Available packages

| Package                                                      | Description                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------------- |
| [nx-cloudflare-wrangler](./packages/nx-cloudflare-wrangler/) | Generator and executors for Cloudflare wrangler (workers and pages) |
| [nx-deno-deploy](./packages/nx-deno-deploy/)                 | Deploy projects to Deno deploy                                      |
| [nx-netlify-deploy](./packages/nx-netlify-deploy/)           | Deployer and generator for Netlify pages                            |
| [nx-rsync-deployer](./packages/nx-rsync-deployer/)           | Deployer to upload app artifacts using _rsync_                      |
| [nx-sst](./packages/nx-sst/)                                 | Generator and executors for Serverless Stack projects               |

## Contribution

### Generate a new package

Run `nx g @nx/node:lib my-lib --publishable --importPath=@k11r/my-lib` to generate a library.
