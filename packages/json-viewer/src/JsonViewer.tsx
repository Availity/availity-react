import * as React from 'react';
import classnames from 'classnames';

export interface JsonViewerProps {
  /** Data to be rendered, can be most valid javascript objects, some uncommon types may not be fully supported - like cyclical objects, proxies, symbols as keys. */
  data: Record<string, unknown>;
  /** Optional props passed to classnames to style various parts of the rendered tree. */
  listClassNames?: string | string[];
  /** Defaults to false, if true will open all details elements. */
  expandAll?: boolean;
  /** The name of the key  */
  keyClassNames?: string | string[];
  /** The name of the summary */
  summaryClassNames?: string | string[];
  /** One of the bootstrap color classes - see https://getbootstrap.com/docs/4.0/utilities/colors/#background-color for options. Defaults to light. */
  backgroundColor?: string;
}

type Detailable = Omit<JsonViewerProps, 'listClassNames'>;

function isPrimitive(value: unknown): value is string | number | boolean {
  return ['string', 'number', 'boolean'].includes(typeof value);
}
function isObject(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === 'object';
}

function getDetails({ data, expandAll, keyClassNames, summaryClassNames }: Detailable): (JSX.Element | null)[] {
  return Object.entries(data).map((entry) => {
    const [key, value] = entry;
    if (isPrimitive(value)) {
      return (
        <li key={key} className="pt-1">
          <span className={classnames('text-bold', keyClassNames)}>{`${key}:`}</span>
          <span> {value.toString()}</span>
        </li>
      );
    }
    if (isObject(value)) {
      return (
        <li key={key} className="pt-1">
          <details open={expandAll}>
            <summary className={classnames('text-bold', summaryClassNames)}>
              {`${key}: ${
                Array.isArray(value) ? `[ ] ${value.length} items` : `{ } ${Object.keys(value).length} keys`
              }`}
            </summary>
            <ul className="pl-4 list-unstyled">{getDetails({ data: value, expandAll, keyClassNames })}</ul>
          </details>
        </li>
      );
    }
    return null;
  });
}

function JsonViewer({
  data,
  expandAll = false,
  listClassNames,
  keyClassNames,
  summaryClassNames,
  backgroundColor = 'light',
}: JsonViewerProps): JSX.Element {
  const details = getDetails({ data, expandAll, keyClassNames, summaryClassNames });
  return (
    <ul data-testid="topLevelUl" className={classnames(`p-2 list-unstyled bg-${backgroundColor}`, listClassNames)}>
      {details}
    </ul>
  );
}

export default JsonViewer;
