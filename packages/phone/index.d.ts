export { default as Phone, PhoneProps } from './src/Phone';
export { default as validatePhone } from './src/validatePhone';

declare module 'yup' {
  import { AnyObject, Maybe } from 'yup/lib/types';
  import BaseSchema from 'yup/lib/schema';

  interface StringSchema<
    TType extends Maybe<string> = string | undefined,
    TContext extends AnyObject = AnyObject,
    TOut extends TType = TType
  > extends BaseSchema<TType, TContext, TOut> {
    validatePhone(message?: string, strict?: boolean, country?: string): StringSchema<TType, TContext>;
  }
}
