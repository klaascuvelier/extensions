# Extensions

This repo contains a list of packages (additions, utilities, extensions, ...) for software I personally use including [NX](https://nx.dev/), [Raycast](https://www.raycast.com/) and [Alfred](https://www.alfredapp.com/workflows/).

## NX Additions

A set of very poorly documented and maintained plugins for NX workspaces.

## Available packages

| Package                                                      | Description                                                           |
| ------------------------------------------------------------ | --------------------------------------------------------------------- |
| [nx-cloudflare-wrangler](./packages/nx-cloudflare-wrangler/) | Generator and executors for Cloudflare wrangler (workers and pages).  |
| [nx-netlify-deploy](./packages/nx-netlify-deploy/)           | Deployer and generator for Netlify pages.                             |
| [nx-rsync-deployer](./packages/nx-rsync-deployer/)           | Deployer to upload app artifacts using `rsync`.                       |
| [nx-sst](./packages/nx-sst/)                                 | Generator and executors for Serverless Stack projects. **DEPRECATED** |
| [nx-deno-deploy](./packages/nx-deno-deploy/)                 | Deploy projects to Deno deploy. **REMOVED**                           |

## Contribution

### Generate a new package

Run `nx g @nx/node:lib my-lib --publishable --importPath=@k11r/my-lib` to generate a library.
