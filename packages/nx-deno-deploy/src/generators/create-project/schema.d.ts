import { Schema } from '@nrwl/node/src/generators/application/schema';

export interface CreateDenoProjectSchema extends Schema {
    denoProject?: string;
}
