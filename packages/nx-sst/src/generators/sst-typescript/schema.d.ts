import { Schema } from '@nrwl/node/src/generators/application/schema';

export interface CreateSstProjectSchema extends Schema {
    awsProfile?: string;
    awsRegion?: string;
}
