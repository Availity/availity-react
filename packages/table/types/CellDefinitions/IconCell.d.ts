export interface IconConfig<T> {
  name: string;
  title: string | ((value: T) => string);
}

declare function IconCell<T>(iconConfig: IconConfig<T>): string;

export default IconCell;
