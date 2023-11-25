export interface Appeal {
    _id: string;
    executor: string;
    theme: string;
    themeGroup: string;
    tags: string[];
    body: string;
    mark: "NEW" | "OLD";
}
