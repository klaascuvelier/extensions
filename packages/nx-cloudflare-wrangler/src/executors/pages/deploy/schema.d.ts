export interface PagesDeployExecutorSchema {
    dist?: string;
    projectName?: string;
    branch?: string;
    commitHash?: string;
    commitMessage?: string;
    commitDirty?: boolean;
}
