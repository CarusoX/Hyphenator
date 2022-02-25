type useMergeRefsT = <T extends HTMLElement>(
  ...refs: (AnyRef<T> | null | false)[]
) => AnyRef<T>;

export const useMergeRefs: useMergeRefsT =
  (...refs) =>
  (_ref) => {
    refs.forEach((reference) => {
      if (reference) {
        if (typeof reference === 'function') {
          reference(_ref);
        } else {
          // @ts-ignore
          reference.current = _ref;
        }
      }
    });
  };
