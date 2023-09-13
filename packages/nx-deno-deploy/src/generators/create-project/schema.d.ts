import { Schema } from '@nx/node/src/generators/application/schema';

export interface CreateDenoProjectSchema extends Schema {
    denoProject?: string;
}
