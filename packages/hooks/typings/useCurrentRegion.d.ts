type CurrentRegionType = {
    code: string;
    value: string;
};

declare function useCurrentRegion(): [CurrentRegionType | undefined, boolean];

export default useCurrentRegion;
