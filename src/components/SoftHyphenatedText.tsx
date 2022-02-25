import React, { useRef } from 'react';
import styled from 'styled-components';
import { useMergeRefs, useSoftHyphenation } from '..';

const StyledSpan = styled.span`
  overflow: hidden;
  display: inline-block;
`;

interface SoftHyphenatedTextProps {
  value: string;
  innerRef: AnyRef<HTMLSpanElement>;
}

export const SoftHyphenatedText: React.ComponentType<
  SoftHyphenatedTextProps
> = ({ value, innerRef, ...rest }) => {
  const internalRef = useRef<HTMLSpanElement>(null);
  const spanRef = useMergeRefs(internalRef, innerRef);

  useSoftHyphenation(internalRef, value);

  return <StyledSpan ref={spanRef} {...rest} />;
};
