import React from 'react';

/** Minimal SvgXml shim for Storybook (react-native-web). */
export function SvgXml({
  xml,
  width,
  height,
}: {
  xml: string;
  width?: number | string;
  height?: number | string;
}) {
  return React.createElement('div', {
    style: { width, height, display: 'inline-flex', lineHeight: 0 },
    dangerouslySetInnerHTML: { __html: xml },
  });
}

export default { SvgXml };
