export interface Appeal {
    executor: string;
    theme: string;
    themeGroup: string;
    tags: string[];
    body: string;
    mark: "NEW" | "OLD";
}
