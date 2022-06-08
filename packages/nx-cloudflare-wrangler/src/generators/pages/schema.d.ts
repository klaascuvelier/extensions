import { Schema } from '@nrwl/node/src/generators/application/schema';

export interface CloudflarePagesProjectSchema extends Schema {
    name: string;
    projectName?: string;
}
