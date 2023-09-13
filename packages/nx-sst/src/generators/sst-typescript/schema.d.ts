import { Schema } from '@nx/node/src/generators/application/schema';

export interface CreateSstProjectSchema extends Schema {
    profile?: string;
    stage?: string;
    region?: string;
    roleArn?: string;
}
