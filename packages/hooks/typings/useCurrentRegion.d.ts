export type CurrentRegionType = {
    code: string;
    value: string;
};

declare function useCurrentRegion(): [CurrentRegionType, boolean, object];

export default useCurrentRegion;
