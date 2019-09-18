type ResourceType = {
    postGet?: Function;
    post?: Function;
    getResult?: string | Function;
};

type GraphQLConfigType = {
  type?: string;
  query?: string;
};

export interface AvResourceSelectProps {
    requestConfig?: object;
    resource: ResourceType;
    getResult?: string | Function;
    hasMore?: boolean | Function;
    delay?: number;
    debounceTimeout?: number;
    label?: string | React.ReactType;
    customerId?: string;
    parameters?: object;
    itemsPerPage?: number;
    onPageChange?: Function;
    isDisabled?: boolean;
    requiredParams?: Array<any>;
    watchParams?: Array<any>;
    cacheUniq?: any;
    additional?: object;
    graphqlConfig?: GraphQLConfigType;
    minCharsToSearch?: number;
}

declare const AvResourceSelect: React.ComponentType<AvResourceSelectProps>;

export default AvResourceSelect;
