# NxAdditions

This project was generated using [Nx](https://nx.dev).

## Available packages

| Package                                                     | Description                                    |
|-------------------------------------------------------------|------------------------------------------------|
| [nx-deno-deploy](./packages/nx-deno-deploy/README.md)       | Deploy projects to Deno deploy                 |
| [nx-netlify-deploy](./packages/nx-netlify-deploy/README.md) | Deployer and generator for Netlify pages       |
| [nx-rsync-deployer](./packages/nx-rsync-deployer/README.md) | Deployer to upload app artifacts using _rsync_ |

## Contribution

### Generate a new package
Run `nx g @nrwl/node:lib my-lib --publishable --importPath=@k11r/my-lib` to generate a library.

### Publish package
`npm publish -access public`
