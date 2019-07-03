type ResourceType = {
    postGet?: Function;
    getResult?: string | Function;
};

export interface AvResourceSelectProps {
    requestConfig?: object;
    resource: ResourceType;
    getResult?: string | Function;
    hasMore?: boolean | Function;
    delay?: number;
    debounceTimeout?: number;
    label?: React.ReactType;
    customerId?: string;
    parameters?: object;
    itemsPerPage?: number;
    onPageChange?: Function;
    isDisabled?: boolean;
    requiredParams?: Array<any>;
    watchParams?: Array<any>;
    cacheUniq?: any;
    additional?: object;
}

declare const AvResourceSelect: React.ComponentType<AvResourceSelectProps>;

export default AvResourceSelect;
