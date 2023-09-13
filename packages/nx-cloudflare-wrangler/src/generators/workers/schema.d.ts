import { Schema } from '@nx/node/src/generators/application/schema';

export interface CloudflareWorkerProjectSchema extends Schema {
    zone_id?: string;
    account_id?: string;
    route?: string;
    workers_dev?: boolean;
}
