import React, { useRef } from 'react';
import styled from 'styled-components';
import { useSoftHyphenation } from '..';

const StyledSpan = styled.span`
  overflow: hidden;
`;

interface SoftHyphenatedTextProps {
  value: string;
}

export const SoftHyphenatedText: React.ComponentType<SoftHyphenatedTextProps> = (props) => {
  const ref = useRef<HTMLSpanElement>(null);
  useSoftHyphenation(ref, props.value);
  return <StyledSpan ref={ref} />;
};
