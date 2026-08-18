import React from 'react';

type SvgProps = React.SVGProps<SVGSVGElement> & {
  width?: number | string;
  height?: number | string;
  children?: React.ReactNode;
};

type CircleProps = React.SVGProps<SVGCircleElement> & {
  cx?: number | string;
  cy?: number | string;
  r?: number | string;
  stroke?: string;
  strokeWidth?: number | string;
  fill?: string;
  strokeDasharray?: string;
  strokeDashoffset?: number | string;
  strokeLinecap?: 'butt' | 'round' | 'square';
  rotation?: number | string;
  origin?: string;
};

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

export function Svg({ width, height, children, ...rest }: SvgProps) {
  return React.createElement(
    'svg',
    {
      width,
      height,
      viewBox: width != null && height != null ? `0 0 ${width} ${height}` : undefined,
      ...rest,
    },
    children,
  );
}

export function Circle({
  rotation,
  origin,
  strokeWidth,
  ...rest
}: CircleProps) {
  const style =
    rotation != null
      ? {
          transform: `rotate(${rotation}deg)`,
          transformOrigin: origin ?? 'center',
        }
      : undefined;

  return React.createElement('circle', {
    strokeWidth,
    style,
    ...rest,
  });
}

export default Svg;
