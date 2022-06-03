export interface DeployExecutorSchema {
    siteId: string;
    outputPath: string;
    skipBuild?: boolean;
    prod?: boolean;
}
