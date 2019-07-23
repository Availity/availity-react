type CurrentRegionType = {
    code: string;
    value: string;
};

declare function useCurrrentRegion(): [CurrentRegionType | undefined, boolean];

export default useCurrrentRegion;
