import React from 'react';

declare global {
  export type AnyRef<T extends HTMLElement> =
    | React.RefObject<T>
    | ((_ref: T) => void);
}
