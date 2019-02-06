type ResourceType = {
    postGet?: Function;
    getResult?: string | Function;
};

export interface AvResourceSelectProps {
    requestConfig?: object;
    resource: ResourceType;
    getResult?: string | Function;
    delay?: number;
    label?: Node;
    customerId?: string;
    parameters?: object;
    itemsPerPage?: number;
    onPageChange?: Function;
    isDisabled?: boolean;
    requiredParams?: Array<any>;
    watchParams?: Array<any>;
}

declare const AvResourceSelect: React.ComponentType<AvResourceSelectProps>;

export default AvResourceSelect;