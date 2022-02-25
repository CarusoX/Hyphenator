import React, { useLayoutEffect } from 'react';
import { useOnElementResize } from './useOnElementResize';

const getElementHeight = <T extends HTMLElement>(ref: React.RefObject<T>) => {
  if (!ref.current) return 0;
  const { height } = ref.current.getBoundingClientRect();
  return height;
};

// Check we don't overflow container
const checkStringFitsOnBox = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  str: string,
) => {
  if (!ref.current) return false;
  ref.current.innerText = str;
  const overflows = ref.current.scrollWidth > ref.current.clientWidth;
  return !overflows;
};

// Check we don't overflow container + we don't have an extra line
const checkStringFitsOnLine = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  str: string,
) => {
  if (!ref.current) return false;
  const currentHeight = getElementHeight(ref);
  ref.current.innerText = str;
  const nextHeight = getElementHeight(ref);
  return currentHeight === nextHeight && checkStringFitsOnBox(ref, str);
};

const hyphenate = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  str: string,
) => {
  const element = ref.current;
  if (!element) return;

  const chars = str.split('');

  let newHyphenatedContent = '';

  for (let index = 0; index < chars.length; index = index + 0) {
    element.innerText = newHyphenatedContent;
    const char = chars[index];
    // We try to add the character with a hyphen before it
    const fits = checkStringFitsOnLine(ref, `${newHyphenatedContent}-${char}`);
    if (index === 0 || fits) {
      // If first character, or character fits with hyphen
      newHyphenatedContent += char;
    } else if (char.match(/\s/)) {
      // If we have a space character, we don't need to do anything
      newHyphenatedContent += char;
    } else {
      const fitsOnBox = checkStringFitsOnBox(
        ref,
        `${newHyphenatedContent}${char}`,
      );
      const fitsOnBoxWithHyphen = checkStringFitsOnBox(
        ref,
        `${newHyphenatedContent}${char}-`,
      );
      if (fitsOnBox && fitsOnBoxWithHyphen) {
        newHyphenatedContent += char;
      } else {
        // Add soft hyphen since we don't want it to be copy-pastable
        newHyphenatedContent += `\u00AD${char}`;
      }
    }
    index = index + 1;
  }

  element.innerText = newHyphenatedContent;
};

export const useSoftHyphenation = <T extends HTMLElement>(
  ref: React.RefObject<T>,
  innerText: string,
) => {
  useLayoutEffect(() => {
    hyphenate(ref, innerText);
  }, [innerText]);

  useOnElementResize(ref, () => hyphenate(ref, innerText));
};
