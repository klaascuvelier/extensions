import { Schema } from '@nx/node/src/generators/application/schema';

export interface CloudflarePagesProjectSchema extends Schema {
    name: string;
    projectName?: string;
}
