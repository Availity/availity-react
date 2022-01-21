import React, { Ref, useEffect, useRef } from 'react';

interface Props {
  indeterminate: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const useCombinedRefs = (
  ...refs: Array<React.Ref<HTMLInputElement> | React.MutableRefObject<null>>
): React.MutableRefObject<HTMLInputElement | null> => {
  const targetRef = useRef(null);

  useEffect(() => {
    for (const ref of refs) {
      if (!ref) return;

      if (typeof ref === 'function') {
        ref(targetRef.current);
      }
    }
  }, [refs]);

  return targetRef;
};

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }: Props, ref: Ref<HTMLInputElement | null>) => {
    const defaultRef = useRef(null);
    const combinedRef = useCombinedRefs(ref, defaultRef);

    useEffect(() => {
      if (combinedRef.current) {
        combinedRef.current.indeterminate = indeterminate;
      }
    }, [combinedRef, indeterminate]);

    return (
      <>
        <label className="custom-control custom-checkbox">
          <input type="checkbox" ref={combinedRef} {...rest} className="custom-control-input" />
          <span className="custom-control-label" />
        </label>
      </>
    );
  }
);

export default IndeterminateCheckbox;
