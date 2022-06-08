import { Schema } from '@nrwl/node/src/generators/application/schema';

export interface CloudflarePagesProjectSchema extends Schema {
    zone_id?: string;
    account_id?: string;
    route?: string;
    workers_dev?: boolean;
}
